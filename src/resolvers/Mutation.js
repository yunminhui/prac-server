// writable request
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

import {AuthenticationError, ForbiddenError} from 'apollo-server-express';

import gravatar from '../util/gravatar';

const Mutation = {
  newNote: async (parent, args, {models}) => {
    return await models.Note.create({
      content: args.content,
      author: 'INUS',
    });
  },
  deleteNote: async (parent, {ids}, {models}) => {
    try {
      for (let i = 0; i < ids.length; i++) {
        await models.Note.findOneAndRemove({_id: ids[i]});
      }
      return true;
    } catch (err) {
      return false;
    }
  },
  updateNote: async (parent, {id, content}, {models}) => {
    return await models.Note.findOneAndUpdate(
        {_id: id},
        {$set: {content}},
        {new: true},
    );
  },
  signUp: async (parent, {uername, email, password}, {models}) => {
    // normalize email address
    email = email.trin().toLowerCase();
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
};

export default Mutation;
