"use strict";

require("@babel/polyfill");

var _express = _interopRequireDefault(require("express"));

var _apolloServerExpress = require("apollo-server-express");

var _dotenv = _interopRequireDefault(require("dotenv"));

var _db = require("./db");

var _index = _interopRequireDefault(require("./models/index"));

var _schema = _interopRequireDefault(require("./schema"));

var _index2 = _interopRequireDefault(require("./resolvers/index"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// const express = require('express');
// const {ApolloServer, gql} = require('apollo-server-express');
_dotenv["default"].config();

var app = (0, _express["default"])();
var port = process.env.PORT || 4000;
var DB_HOST = process.env.DB_HOST;
(0, _db.connect)(DB_HOST);
var server = new _apolloServerExpress.ApolloServer({
  typeDefs: _schema["default"],
  resolvers: _index2["default"],
  context: function context() {
    return {
      models: _index["default"]
    };
  }
});
server.applyMiddleware({
  app: app,
  path: '/api'
}); // app.get('/', (req, res) => res.send('Hello World'));

app.listen({
  port: port
}, function () {
  return console.log("GraphQL Server running at http://localhost:".concat(port).concat(server.graphqlPath));
});