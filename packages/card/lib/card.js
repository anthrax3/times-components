"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactNative = require("react-native");

var _image = require("@times-components/image/lib/image");

var _image2 = _interopRequireDefault(_image);

var _styleguide = require("@times-components/styleguide/lib/styleguide");

var _cardProptypes = require("./card-proptypes");

var _cardLoading = require("./card-loading");

var _cardLoading2 = _interopRequireDefault(_cardLoading);

var _shared = require("./styles/shared");

var _shared2 = _interopRequireDefault(_shared);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CardComponent = function CardComponent(_ref) {
  var children = _ref.children,
      image = _ref.image,
      imageRatio = _ref.imageRatio,
      imageSize = _ref.imageSize,
      isLoading = _ref.isLoading,
      showImage = _ref.showImage;

  if (isLoading) {
    return _react2.default.createElement(
      _reactNative.View,
      null,
      _react2.default.createElement(_cardLoading2.default, { aspectRatio: imageRatio, showImage: showImage })
    );
  }

  return _react2.default.createElement(
    _styleguide.Animations.FadeIn,
    null,
    _react2.default.createElement(
      _reactNative.View,
      null,
      showImage && image && image.uri && _react2.default.createElement(
        _reactNative.View,
        { style: _shared2.default.imageContainer },
        _react2.default.createElement(_image2.default, {
          aspectRatio: imageRatio,
          uri: image.uri + "&resize=" + imageSize
        })
      ),
      _react2.default.createElement(
        _reactNative.View,
        null,
        children
      )
    )
  );
};

CardComponent.propTypes = _cardProptypes.cardPropTypes;
CardComponent.defaultProps = _cardProptypes.cardDefaultProps;

exports.default = CardComponent;
