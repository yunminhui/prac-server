// writable request
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

import mongoose from 'mongoose';

import {AuthenticationError, ForbiddenError} from 'apollo-server-express';

import gravatar from '../util/gravatar';

const Mutation = {
  newNote: async (parent, args, {models, user}) => {
    // if there is no user on the context, throw an authentication error
    if (!user) {
      throw new AuthenticationError('You must be signed in to create a note!');
    }
    return await models.Note.create({
      content: args.content,
      author: mongoose.Types.ObjectId(user.id),
    });
  },
  deleteNote: async (parent, {ids}, {models, user}) => {
    if (!user) {
      throw new AuthenticationError('You must be signed in to delete a note!');
    }

    const note = await models.Note.findById(id);

    if (note && String(note.author) !== user.id) {
      throw new ForbiddenError('You don\'t have permission to delete a note');
    }

    try {
      await note.remove();
      return true;
    } catch (err) {
      return false;
    }
  },
  updateNote: async (parent, {id, content}, {models, user}) => {
    if (!user) {
      throw new AuthenticationError('You must be signed in to update a note!');
    }

    const note = models.Note.findById(id);
    if (note && String(note.author) !== user.id) {
      throw new ForbiddenError('You don\'t have permission to update the note');
    }
    return await models.Note.findOneAndUpdate(
        {_id: id},
        {$set: {content}},
        {new: true},
    );
  },
  signUp: async (parent, {uername, email, password}, {models}) => {
    // normalize email address
    email = email.trim().toLowerCase();
    // hash the password
    const hashed = await bcrypt.hash(password, 10);
    const avatar = gravatar(email);

    try {
      const user = await models.User.create({
        username,
        email,
        avatar,
        password: hashed,
      });
      // create and return the json web token
      return jwt.sign({id: user._id}, process.env.JWT_SECRET);
    } catch (err) {
      console.log(err);
      // if there's a problem creating the accoutn, throw an error
      throw new Error('Error creating account');
    }
  },
  signIn: async (parent, {username, email, pasword}, {models}) => {
    if (email) {
      email = email.trim().toLowerCase();
    }

    const user = await models.User.findOne({
      $or: [{email}, {username}],
    });

    // if no user is found, throw an authentication error
    if (!user) {
      throw new AuthenticationError('Error signing in');
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      throw new AuthenticationError('Error signing in');
    }
    return jwt.sign({id: user._id}, process.env.JWT_SECRET);
  },
  toggleFavorite: async (parent, {id}, {models, user}) => {
    if (!user) {
      throw new AuthenticationError();
    }

    const noteCheck = await models.Note.findById(id);
    const hasUser = noteCheck.favoritedby.indexOf(user.id);

    if (hasUser >= 0) {
      return await models.Note.findByAndUpdate(
          id,
          {
            $pull: {
              favoritedBy: mongoose.Types.ObjectId(user.id),
            },
            $inc: {
              favoritecount: -1,
            },
          },
          {
            new: true,
          },
      );
    } else {
      return await models.Note.findByAndUpdate(
          id,
          {
            $push: {
              favoritedBy: mongoose.Types.ObjectId(user.id),
            },
            $inc: {
              favoriteCount: 1,
            },
          },
          {
            new: true,
          },
      );
    }
  },
};

export default Mutation;
