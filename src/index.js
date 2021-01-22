// const express = require('express');
// const {ApolloServer, gql} = require('apollo-server-express');
import '@babel/polyfill';

import express from 'express';
import {ApolloServer} from 'apollo-server-express';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

const DB_HOST = process.env.DB_HOST;
connect(DB_HOST);

import {connect, close} from './db';
import models from './models/index';

import typeDefs from './schema';
import resolvers from './resolvers/index';

const getUser = (token) => {
  if (token) {
    try {
      return jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      throw new Error('Session invalid');
    }
  }
};

// Apollo Server setup
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({req}) => {
    const token = req.headers.authorization;
    const user = getUser(token);
    console.log(user);
    return {models, user};
  },
});

server.applyMiddleware({app, path: '/api'});

// app.get('/', (req, res) => res.send('Hello World'));

app.listen({port}, () =>
  console.log(
      `GraphQL Server running at http://localhost:${port}${server.graphqlPath}`,
  ),
);
