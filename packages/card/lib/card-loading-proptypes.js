"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.loadingDefaultProps = exports.loadingPropTypes = undefined;

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var loadingPropTypes = exports.loadingPropTypes = {
  aspectRatio: _propTypes2.default.number,
  showImage: _propTypes2.default.bool
};

var loadingDefaultProps = exports.loadingDefaultProps = {
  aspectRatio: 3 / 2,
  showImage: false
};