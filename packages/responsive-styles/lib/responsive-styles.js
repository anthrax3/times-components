"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.config = exports.keyframes = undefined;

var _templateObject = _taggedTemplateLiteral(["\n  ", "\n\n  @media (min-width: 520px) {\n    ", "\n  }\n  @media (min-width: 768px) {\n    ", "\n  }\n  @media (min-width: 1024px) {\n    ", "\n  }\n  @media (min-width: 1320px) {\n    ", "\n  }\n"], ["\n  ", "\n\n  @media (min-width: 520px) {\n    ", "\n  }\n  @media (min-width: 768px) {\n    ", "\n  }\n  @media (min-width: 1024px) {\n    ", "\n  }\n  @media (min-width: 1320px) {\n    ", "\n  }\n"]);

var _styledComponents = require("styled-components");

Object.defineProperty(exports, "keyframes", {
  enumerable: true,
  get: function get() {
    return _styledComponents.keyframes;
  }
});

var _styledComponents2 = _interopRequireDefault(_styledComponents);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var config = exports.config = {
  mediumBpWidth: "84%",
  wideBpWidth: "58%"
};

// Turn off prettier for this as the identified changes break this component
// prettier-ignore
var withResponsiveStyles = function withResponsiveStyles(Component) {
  var styles = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return (0, _styledComponents2.default)(Component)(_templateObject, styles.base, styles.smallUp, styles.mediumUp, styles.wideUp, styles.hugeUp);
};

exports.default = withResponsiveStyles;