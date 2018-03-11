"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactNative = require("react-native");

var _gradient = require("@times-components/gradient/lib/gradient");

var _gradient2 = _interopRequireDefault(_gradient);

var _t = require("./t");

var _t2 = _interopRequireDefault(_t);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ViewPropTypesStyle = _reactNative.ViewPropTypes.style;


var SCALING_FACTOR = 0.27411167512690354;

var styles = _reactNative.StyleSheet.create({
  container: {
    flex: 1
  },
  t: {
    justifyContent: "center",
    alignItems: "center"
  }
});

var Placeholder = function (_React$Component) {
  _inherits(Placeholder, _React$Component);

  function Placeholder(props) {
    _classCallCheck(this, Placeholder);

    var _this = _possibleConstructorReturn(this, (Placeholder.__proto__ || Object.getPrototypeOf(Placeholder)).call(this, props));

    _this.state = {};
    _this.handleLayout = _this.handleLayout.bind(_this);
    return _this;
  }

  _createClass(Placeholder, [{
    key: "handleLayout",
    value: function handleLayout(_ref) {
      var width = _ref.nativeEvent.layout.width;

      this.setState({
        width: width
      });
    }
  }, {
    key: "render",
    value: function render() {
      var style = this.props.style;
      var width = this.state.width;


      var tComponent = width ? _react2.default.createElement(
        _reactNative.View,
        { style: [styles.container, styles.t] },
        _react2.default.createElement(_t2.default, { width: width * SCALING_FACTOR, height: width * SCALING_FACTOR })
      ) : null;

      return _react2.default.createElement(
        _reactNative.View,
        { style: [styles.container, style], onLayout: this.handleLayout },
        _react2.default.createElement(
          _gradient2.default,
          { degrees: 264, style: styles.container },
          tComponent
        )
      );
    }
  }]);

  return Placeholder;
}(_react2.default.Component);

Placeholder.defaultProps = {
  style: null
};

Placeholder.propTypes = {
  style: ViewPropTypesStyle
};

exports.default = Placeholder;