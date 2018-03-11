"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactNative = require("react-native");

var _link = require("@times-components/link");

var _link2 = _interopRequireDefault(_link);

var _gestures = require("@times-components/gestures");

var _gestures2 = _interopRequireDefault(_gestures);

var _styleguide = require("@times-components/styleguide/lib/styleguide");

var _svgs = require("svgs");

var _svgs2 = _interopRequireDefault(_svgs);

var _image = require("./image");

var _image2 = _interopRequireDefault(_image);

var _imagePropTypes = require("./image-prop-types");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var style = _reactNative.StyleSheet.create({
  modal: {
    backgroundColor: _styleguide.colours.functional.brandColour,
    width: "100%",
    height: "100%",
    flexDirection: "column"
  },
  imageContainer: {
    flexGrow: 1,
    justifyContent: "center"
  },
  image: {
    width: "100%",
    opacity: 1
  }
});

var ModalImage = function (_Component) {
  _inherits(ModalImage, _Component);

  function ModalImage(props) {
    _classCallCheck(this, ModalImage);

    var _this = _possibleConstructorReturn(this, (ModalImage.__proto__ || Object.getPrototypeOf(ModalImage)).call(this, props));

    _this.state = {
      showModal: props.show || false
    };
    _this.hideModal = _this.hideModal.bind(_this);
    _this.showModal = _this.showModal.bind(_this);
    return _this;
  }

  _createClass(ModalImage, [{
    key: "showModal",
    value: function showModal() {
      this.setState({ showModal: true });
    }
  }, {
    key: "hideModal",
    value: function hideModal() {
      this.setState({ showModal: false });
    }
  }, {
    key: "render",
    value: function render() {
      var closeButton = _react2.default.createElement(
        _svgs2.default,
        { height: "48", viewBox: "0 0 24 24", width: "48" },
        _react2.default.createElement(
          _svgs.G,
          { fill: _styleguide.colours.functional.cancel },
          _react2.default.createElement(_svgs.Path, { d: "M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" }),
          _react2.default.createElement(_svgs.Path, { d: "M0 0h24v24H0z", fill: "none" })
        ),
        "\xA7"
      );

      return _react2.default.createElement(
        _reactNative.View,
        null,
        _react2.default.createElement(
          _reactNative.Modal,
          {
            visible: this.state.showModal,
            onRequestClose: this.hideModal,
            presentationStyle: "fullScreen"
          },
          _react2.default.createElement(
            _reactNative.View,
            { style: style.modal },
            _react2.default.createElement(
              _link2.default,
              { onPress: this.hideModal },
              closeButton
            ),
            _react2.default.createElement(
              _gestures2.default,
              { style: style.imageContainer },
              _react2.default.createElement(_image2.default, _extends({}, this.props, { style: style.image }))
            )
          )
        ),
        _react2.default.createElement(
          _link2.default,
          { onPress: this.showModal },
          _react2.default.createElement(_image2.default, this.props)
        )
      );
    }
  }]);

  return ModalImage;
}(_react.Component);

ModalImage.propTypes = _imagePropTypes.propTypes;
ModalImage.defaultProps = _imagePropTypes.defaultProps;

exports.default = ModalImage;