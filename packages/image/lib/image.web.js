"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactNative = require("react-native");

var _placeholder = require("./placeholder");

var _placeholder2 = _interopRequireDefault(_placeholder);

var _imagePropTypes = require("./image-prop-types");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TimesImage = function TimesImage(_ref) {
  var uri = _ref.uri,
      aspectRatio = _ref.aspectRatio,
      style = _ref.style;

  var styles = {
    wrapper: {
      height: 0,
      overflow: "hidden",
      paddingBottom: 100 / aspectRatio + "%",
      display: "table"
    },
    placeholder: {
      position: "absolute",
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      zIndex: 0
    },
    img: { display: "block", width: "100%", zIndex: 1, position: "absolute" }
  };

  var boundedImg = _react2.default.createElement(
    "div",
    { style: styles.wrapper },
    _react2.default.createElement("img", { src: uri, style: styles.img, alt: "" }),
    _react2.default.createElement(_placeholder2.default, { style: styles.placeholder })
  );

  // divs cannot be styled with the output of Stylesheet.create()
  // only react native Views accept those ids
  return style ? _react2.default.createElement(
    _reactNative.View,
    { style: style },
    boundedImg
  ) : boundedImg;
};

TimesImage.defaultProps = _imagePropTypes.defaultProps;

TimesImage.propTypes = _imagePropTypes.propTypes;

exports.default = TimesImage;