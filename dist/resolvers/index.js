"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _Query = _interopRequireDefault(require("./Query"));

var _Mutation = _interopRequireDefault(require("./Mutation"));

var _graphqlIsoDate = require("graphql-iso-date");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var resolvers = {
  Query: _Query["default"],
  Mutation: _Mutation["default"],
  DateTime: _graphqlIsoDate.GraphQLDateTime
};
var _default = resolvers;
exports["default"] = _default;