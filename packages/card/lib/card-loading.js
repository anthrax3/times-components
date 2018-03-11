"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactNative = require("react-native");

var _image = require("@times-components/image/lib/image");

var _image2 = _interopRequireDefault(_image);

var _gradient = require("@times-components/gradient/lib/gradient");

var _gradient2 = _interopRequireDefault(_gradient);

var _cardLoadingProptypes = require("./card-loading-proptypes");

var _shared = require("./styles/shared");

var _shared2 = _interopRequireDefault(_shared);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Loading = function Loading(_ref) {
  var aspectRatio = _ref.aspectRatio,
      showImage = _ref.showImage;
  return _react2.default.createElement(
    _reactNative.View,
    null,
    showImage && _react2.default.createElement(
      _reactNative.View,
      { style: _shared2.default.imageContainer },
      _react2.default.createElement(_image2.default, { aspectRatio: aspectRatio })
    ),
    _react2.default.createElement(
      _reactNative.View,
      null,
      _react2.default.createElement(_gradient2.default, { style: [_shared2.default.headerContainer], degrees: 264 }),
      _react2.default.createElement(_gradient2.default, { style: [_shared2.default.textContainer], degrees: 267 }),
      _react2.default.createElement(_gradient2.default, { style: [_shared2.default.textContainer], degrees: 267 }),
      _react2.default.createElement(_gradient2.default, { style: [_shared2.default.textContainer, _shared2.default.lastBar], degrees: 267 })
    )
  );
};

Loading.propTypes = _cardLoadingProptypes.loadingPropTypes;
Loading.defaultProps = _cardLoadingProptypes.loadingDefaultProps;

exports.default = Loading;