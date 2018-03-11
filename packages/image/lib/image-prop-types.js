"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.propTypes = exports.defaultProps = undefined;

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactNative = require("react-native");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ViewPropTypesStyle = _reactNative.ViewPropTypes.style;
var defaultProps = exports.defaultProps = {
  style: {},
  uri: ""
};

var propTypes = exports.propTypes = {
  uri: _propTypes2.default.string,
  aspectRatio: _propTypes2.default.number.isRequired,
  style: ViewPropTypesStyle
};