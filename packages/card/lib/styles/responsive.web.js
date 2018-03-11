"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getChildContainer = exports.ImageContainer = exports.CardContainer = undefined;

var _reactNative = require("react-native");

var _responsiveStyles = require("@times-components/responsive-styles/lib/responsive-styles");

var _responsiveStyles2 = _interopRequireDefault(_responsiveStyles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CardContainer = exports.CardContainer = (0, _responsiveStyles2.default)(_reactNative.View, {
  base: function base() {
    return "\n    flex-direction: column;\n  ";
  },
  mediumUp: function mediumUp() {
    return "\n    flex-direction: row;\n  ";
  }
});
CardContainer.displayName = "CardContainer";

var ImageContainer = exports.ImageContainer = (0, _responsiveStyles2.default)(_reactNative.View, {
  base: function base() {
    return "\n    flex: 1;\n    margin-bottom: 10px;\n  ";
  },
  mediumUp: function mediumUp() {
    return "\n    flex: 2;\n    margin-bottom: 0;\n    padding-right: 15px;\n  ";
  }
});
ImageContainer.displayName = "ImageContainer";

var getChildContainer = exports.getChildContainer = function getChildContainer(_ref) {
  var tabletChildRatio = _ref.tabletChildRatio;

  var ChildContainer = (0, _responsiveStyles2.default)(_reactNative.View, {
    base: function base() {
      return "\n    flex: 1;\n  ";
    },
    mediumUp: function mediumUp() {
      return "\n    flex: " + tabletChildRatio + ";\n    flex-basis: 0 !important;\n  ";
    }
  });
  ChildContainer.displayName = "ChildContainer";
  return ChildContainer;
};