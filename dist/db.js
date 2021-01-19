"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.close = exports.connect = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var connect = function connect(DB_HOST) {
  _mongoose["default"].set('useNewUrlParser', true);

  _mongoose["default"].set('useFindAndModify', false);

  _mongoose["default"].set('useCreateIndex', true);

  _mongoose["default"].set('useUnifiedTopology', true); // Connect to the DB


  _mongoose["default"].connect(DB_HOST);

  _mongoose["default"].connection.on('error', function (err) {
    console.log(err);
    console.log('MongoDB connection error, Please make sure MongoDB is running ');
    process.exit();
  });
};

exports.connect = connect;

var close = function close() {
  _mongoose["default"].connection.close();
};

exports.close = close;