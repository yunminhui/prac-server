"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Note = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var noteSchema = new _mongoose["default"].Schema({
  content: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

var Note = _mongoose["default"].model('Note', noteSchema);

exports.Note = Note;