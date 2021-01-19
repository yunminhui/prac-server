"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _apolloServerExpress = require("apollo-server-express");

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  scalar DateTime\n\n  type Note {\n    id: ID!\n    content: String!\n    author: String!\n    createdAt: DateTime!\n    updatedAt: DateTime!\n  }\n\n  type Query {\n    notes: [Note!]!\n    note(id: ID!): Note!\n  }\n\n  type Mutation {\n    newNote(content: String!): Note!\n    updateNote(id: ID!, content: String!): Note!\n    deleteNote(ids: [ID!]): Boolean!\n  }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var typeDefs = (0, _apolloServerExpress.gql)(_templateObject());
var _default = typeDefs;
exports["default"] = _default;