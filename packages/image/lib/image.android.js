"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactNative = require("react-native");

var _styleNative = require("./style-native");

var _styleNative2 = _interopRequireDefault(_styleNative);

var _imagePropTypes = require("./image-prop-types");

var _placeholder = require("./placeholder");

var _placeholder2 = _interopRequireDefault(_placeholder);

var _addMissingProtocol = require("./add-missing-protocol");

var _addMissingProtocol2 = _interopRequireDefault(_addMissingProtocol);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TimesImage = function (_Component) {
  _inherits(TimesImage, _Component);

  function TimesImage(props) {
    _classCallCheck(this, TimesImage);

    var _this = _possibleConstructorReturn(this, (TimesImage.__proto__ || Object.getPrototypeOf(TimesImage)).call(this, props));

    _this.state = {
      isLoaded: false,
      isHighResolutionLoaded: false
    };

    _this.handleLoad = _this.handleLoad.bind(_this);
    _this.handlePreviewLoad = _this.handlePreviewLoad.bind(_this);
    return _this;
  }

  _createClass(TimesImage, [{
    key: "handleLoad",
    value: function handleLoad() {
      this.setState({
        isLoaded: true,
        isHighResolutionLoaded: true
      });
    }
  }, {
    key: "handlePreviewLoad",
    value: function handlePreviewLoad() {
      this.setState({ isLoaded: true });
    }
  }, {
    key: "render",
    value: function render() {
      var _props = this.props,
          dirtyUri = _props.uri,
          style = _props.style,
          aspectRatio = _props.aspectRatio;
      var isLoaded = this.state.isLoaded;
      // web handles missing protocols just fine, native doesn't. This evens out support.

      var uri = (0, _addMissingProtocol2.default)(dirtyUri);
      var previewUri = this.state.isHighResolutionLoaded ? null : uri + "&preview=true"; // TODO: Implement a separate uri for preview

      var props = {
        style: _styleNative2.default.imageBackground,
        onLoad: this.handleLoad
      };

      if (uri) {
        props.source = { uri: uri };
      }

      var previewProps = _extends({}, props, {
        source: { uri: previewUri },
        onLoad: this.handlePreviewLoad
      });

      return _react2.default.createElement(
        _reactNative.View,
        { aspectRatio: aspectRatio, style: style },
        _react2.default.createElement(
          _reactNative.ImageBackground,
          previewProps,
          _react2.default.createElement(
            _reactNative.ImageBackground,
            props,
            isLoaded ? null : _react2.default.createElement(_placeholder2.default, null)
          )
        )
      );
    }
  }]);

  return TimesImage;
}(_react.Component);

TimesImage.defaultProps = _imagePropTypes.defaultProps;
TimesImage.propTypes = _imagePropTypes.propTypes;

exports.default = TimesImage;