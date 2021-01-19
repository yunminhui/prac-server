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

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: () => {
    return {models};
  },
});

server.applyMiddleware({app, path: '/api'});

// app.get('/', (req, res) => res.send('Hello World'));

app.listen({port}, () =>
  console.log(
      `GraphQL Server running at http://localhost:${port}${server.graphqlPath}`,
  ),
);
