"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var Mutation = {
  newNote: function () {
    var _newNote = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(parent, args, _ref) {
      var models;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              models = _ref.models;
              _context.next = 3;
              return models.Note.create({
                content: args.content,
                author: 'INUS'
              });

            case 3:
              return _context.abrupt("return", _context.sent);

            case 4:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    function newNote(_x, _x2, _x3) {
      return _newNote.apply(this, arguments);
    }

    return newNote;
  }(),
  deleteNote: function () {
    var _deleteNote = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(parent, _ref2, _ref3) {
      var ids, models, i;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              ids = _ref2.ids;
              models = _ref3.models;
              _context2.prev = 2;
              i = 0;

            case 4:
              if (!(i < ids.length)) {
                _context2.next = 10;
                break;
              }

              _context2.next = 7;
              return models.Note.findOneAndRemove({
                _id: ids[i]
              });

            case 7:
              i++;
              _context2.next = 4;
              break;

            case 10:
              return _context2.abrupt("return", true);

            case 13:
              _context2.prev = 13;
              _context2.t0 = _context2["catch"](2);
              return _context2.abrupt("return", false);

            case 16:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, null, [[2, 13]]);
    }));

    function deleteNote(_x4, _x5, _x6) {
      return _deleteNote.apply(this, arguments);
    }

    return deleteNote;
  }(),
  updateNote: function () {
    var _updateNote = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(parent, _ref4, _ref5) {
      var id, content, models;
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              id = _ref4.id, content = _ref4.content;
              models = _ref5.models;
              _context3.next = 4;
              return models.Note.findOneAndUpdate({
                _id: id
              }, {
                $set: {
                  content: content
                }
              }, {
                "new": true
              });

            case 4:
              return _context3.abrupt("return", _context3.sent);

            case 5:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    }));

    function updateNote(_x7, _x8, _x9) {
      return _updateNote.apply(this, arguments);
    }

    return updateNote;
  }()
};
var _default = Mutation;
exports["default"] = _default;