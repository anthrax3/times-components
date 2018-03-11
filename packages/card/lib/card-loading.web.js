"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _image = require("@times-components/image/lib/image");

var _image2 = _interopRequireDefault(_image);

var _gradient = require("@times-components/gradient/lib/gradient");

var _gradient2 = _interopRequireDefault(_gradient);

var _cardLoadingProptypes = require("./card-loading-proptypes");

var _responsive = require("./styles/responsive");

var _shared = require("./styles/shared");

var _shared2 = _interopRequireDefault(_shared);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Loading = function Loading(_ref) {
  var aspectRatio = _ref.aspectRatio,
      tabletChildRatio = _ref.tabletChildRatio,
      showImage = _ref.showImage;

  var ChildContainer = (0, _responsive.getChildContainer)({ tabletChildRatio: tabletChildRatio });

  return _react2.default.createElement(
    _responsive.CardContainer,
    null,
    showImage && _react2.default.createElement(
      _responsive.ImageContainer,
      null,
      _react2.default.createElement(_image2.default, { aspectRatio: aspectRatio })
    ),
    _react2.default.createElement(
      ChildContainer,
      null,
      _react2.default.createElement(_gradient2.default, { style: [_shared2.default.headerContainer], degrees: 264 }),
      _react2.default.createElement(_gradient2.default, { style: [_shared2.default.textContainer], degrees: 267 }),
      _react2.default.createElement(_gradient2.default, { style: [_shared2.default.textContainer], degrees: 267 }),
      _react2.default.createElement(_gradient2.default, {
        style: [_shared2.default.textContainer, _shared2.default.lastBar],
        degrees: 267
      })
    )
  );
};

Loading.propTypes = _extends({}, _cardLoadingProptypes.loadingPropTypes, {
  tabletChildRatio: _propTypes2.default.number
});
Loading.defaultProps = _extends({}, _cardLoadingProptypes.loadingDefaultProps, {
  tabletChildRatio: 1
});

exports.default = Loading;