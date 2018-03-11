"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactNative = require("react-native");

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _image = require("@times-components/image/lib/image");

var _image2 = _interopRequireDefault(_image);

var _styleguide = require("@times-components/styleguide/lib/styleguide");

var _cardProptypes = require("./card-proptypes");

var _cardLoading = require("./card-loading");

var _cardLoading2 = _interopRequireDefault(_cardLoading);

var _responsive = require("./styles/responsive");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CardComponent = function (_Component) {
  _inherits(CardComponent, _Component);

  function CardComponent() {
    _classCallCheck(this, CardComponent);

    return _possibleConstructorReturn(this, (CardComponent.__proto__ || Object.getPrototypeOf(CardComponent)).apply(this, arguments));
  }

  _createClass(CardComponent, [{
    key: "shouldComponentUpdate",
    value: function shouldComponentUpdate(nextProps) {
      var _props = this.props,
          image = _props.image,
          imageSize = _props.imageSize,
          isLoading = _props.isLoading,
          showImage = _props.showImage,
          tabletChildRatio = _props.tabletChildRatio;

      return image && image.uri !== nextProps.image.uri || imageSize !== nextProps.imageSize || isLoading !== nextProps.isLoading || showImage !== nextProps.showImage || tabletChildRatio !== nextProps.tabletChildRatio;
    }
  }, {
    key: "render",
    value: function render() {
      var _props2 = this.props,
          children = _props2.children,
          image = _props2.image,
          imageRatio = _props2.imageRatio,
          imageSize = _props2.imageSize,
          isLoading = _props2.isLoading,
          showImage = _props2.showImage,
          tabletChildRatio = _props2.tabletChildRatio;


      if (isLoading) {
        return _react2.default.createElement(
          _reactNative.View,
          null,
          _react2.default.createElement(_cardLoading2.default, {
            aspectRatio: imageRatio,
            showImage: showImage,
            tabletChildRatio: tabletChildRatio
          })
        );
      }

      var ChildContainer = (0, _responsive.getChildContainer)({ tabletChildRatio: tabletChildRatio });

      return _react2.default.createElement(
        _styleguide.Animations.FadeIn,
        null,
        _react2.default.createElement(
          _responsive.CardContainer,
          null,
          showImage && image && image.uri && _react2.default.createElement(
            _responsive.ImageContainer,
            null,
            _react2.default.createElement(_image2.default, {
              aspectRatio: imageRatio,
              uri: image.uri + "&resize=" + imageSize
            })
          ),
          _react2.default.createElement(
            ChildContainer,
            null,
            children
          )
        )
      );
    }
  }]);

  return CardComponent;
}(_react.Component);

CardComponent.propTypes = _extends({}, _cardProptypes.cardPropTypes, {
  tabletChildRatio: _propTypes2.default.number
});
CardComponent.defaultProps = _extends({}, _cardProptypes.cardDefaultProps, {
  tabletChildRatio: 1
});

exports.default = CardComponent;