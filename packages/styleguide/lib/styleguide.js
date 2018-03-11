"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fonts = exports.Animations = exports.colours = undefined;

var _section = require("./colours/section");

var _section2 = _interopRequireDefault(_section);

var _functional = require("./colours/functional");

var _functional2 = _interopRequireDefault(_functional);

var _animations = require("./animations");

var _animations2 = _interopRequireDefault(_animations);

var _fonts = require("./fonts");

var _fonts2 = _interopRequireDefault(_fonts);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var colours = exports.colours = {
  section: _section2.default,
  functional: _functional2.default
};

var Animations = exports.Animations = {
  FadeIn: _animations2.default
};

var fonts = exports.fonts = _fonts2.default;