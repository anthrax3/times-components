"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactNative = require("react-native");

var _reactNativeLinearGradient = require("react-native-linear-gradient");

var _reactNativeLinearGradient2 = _interopRequireDefault(_reactNativeLinearGradient);

var _styleguide = require("@times-components/styleguide/lib/styleguide");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ViewPropTypesStyle = _reactNative.ViewPropTypes.style;

var styles = _reactNative.StyleSheet.create({
  container: {
    flex: 1
  }
});

function angleToPoints(angle) {
  var segment = Math.floor(angle / Math.PI * 2) + 2;
  var diagonal = (1 / 2 * segment + 1 / 4) * Math.PI;
  var op = Math.cos(Math.abs(diagonal - angle)) * Math.sqrt(2);
  var x = op * Math.cos(angle);
  var y = op * Math.sin(angle);

  return {
    start: {
      x: x < 0 ? 1 : 0,
      y: y < 0 ? 1 : 0
    },
    end: {
      x: x >= 0 ? x : x + 1,
      y: y >= 0 ? y : y + 1
    }
  };
}

var Gradient = function Gradient(_ref) {
  var degrees = _ref.degrees,
      children = _ref.children,
      style = _ref.style;

  var _angleToPoints = angleToPoints((degrees + 90) / 180 * Math.PI),
      start = _angleToPoints.start,
      end = _angleToPoints.end;

  return _react2.default.createElement(
    _reactNative.View,
    { style: style },
    _react2.default.createElement(
      _reactNativeLinearGradient2.default,
      {
        start: start,
        end: end,
        locations: [0.0, 1.0],
        colors: [_styleguide.colours.functional.backgroundSecondary, _styleguide.colours.functional.backgroundTertiary],
        style: [styles.container]
      },
      children
    )
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