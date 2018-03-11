"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactNative = require("react-native");

var _styleguide = require("@times-components/styleguide/lib/styleguide");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ViewPropTypesStyle = _reactNative.ViewPropTypes.style;


var Gradient = function Gradient(_ref) {
  var degrees = _ref.degrees,
      children = _ref.children,
      style = _ref.style;
  return _react2.default.createElement(
    _reactNative.View,
    {
      style: [{
        backgroundImage: "linear-gradient(" + degrees + "deg, " + _styleguide.colours.functional.backgroundSecondary + " 0%, " + _styleguide.colours.functional.backgroundTertiary + " 100%)"
      }, style]
    },
    children
  );
};

Gradient.defaultProps = {
  degrees: 265,
  children: null,
  style: null
};

Gradient.propTypes = {
  degrees: _propTypes2.default.number,
  children: _propTypes2.default.oneOfType([_propTypes2.default.element, _propTypes2.default.arrayOf(_propTypes2.default.element)]),
  style: ViewPropTypesStyle
};

exports.default = Gradient;