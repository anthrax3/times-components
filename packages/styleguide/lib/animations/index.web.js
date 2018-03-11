"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _templateObject = _taggedTemplateLiteral(["\n  from {\n    opacity: 0;\n  }\n\n  to {\n    opacity: 1;\n  }\n"], ["\n  from {\n    opacity: 0;\n  }\n\n  to {\n    opacity: 1;\n  }\n"]);

var _reactNative = require("react-native");

var _responsiveStyles = require("@times-components/responsive-styles/lib/responsive-styles");

var _responsiveStyles2 = _interopRequireDefault(_responsiveStyles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var fadingAnimation = (0, _responsiveStyles.keyframes)(_templateObject);

var FadeIn = (0, _responsiveStyles2.default)(_reactNative.View, {
  base: function base() {
    return "\n    animation: " + fadingAnimation + " 0.3s ease-in-out;\n  ";
  }
});
FadeIn.displayName = "FadeIn";

exports.default = FadeIn;