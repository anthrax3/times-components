"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.cardDefaultProps = exports.cardPropTypes = undefined;

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var cardPropTypes = exports.cardPropTypes = {
  children: _propTypes2.default.node,
  image: _propTypes2.default.shape({ uri: _propTypes2.default.string }),
  imageRatio: _propTypes2.default.number,
  imageSize: _propTypes2.default.number,
  isLoading: _propTypes2.default.bool,
  showImage: _propTypes2.default.bool
};

var cardDefaultProps = exports.cardDefaultProps = {
  children: [],
  image: {
    uri: ""
  },
  imageRatio: 1,
  imageSize: 100,
  isLoading: false,
  showImage: false
};