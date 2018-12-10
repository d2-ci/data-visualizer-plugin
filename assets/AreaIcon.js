"use strict";

var _interopRequireDefault = require("/home/travis/build/dhis2/data-visualizer-app/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _SvgIcon = _interopRequireDefault(require("@material-ui/core/SvgIcon"));

var AreaIcon = function AreaIcon(_ref) {
  var _ref$style = _ref.style,
      style = _ref$style === void 0 ? {
    paddingRight: '8px',
    width: 24,
    height: 24
  } : _ref$style;
  return _react.default.createElement(_SvgIcon.default, {
    viewBox: "0,0,48,48",
    style: style
  }, _react.default.createElement("g", {
    stroke: "none",
    strokeWidth: "1",
    fill: "none",
    fillRule: "evenodd"
  }, _react.default.createElement("g", null, _react.default.createElement("mask", {
    id: "mask-2",
    fill: "white"
  }, _react.default.createElement("rect", {
    x: "0",
    y: "0",
    width: "48",
    height: "48"
  })), _react.default.createElement("g", null), _react.default.createElement("polygon", {
    stroke: "#1976D2",
    strokeWidth: "2",
    fill: "#63A4FF",
    mask: "url(#mask-2)",
    points: "4 28 16 16 26.7935166 26.7935166 33.0558406 20.5311926 53 36 53 51 0 51 0 28"
  }), _react.default.createElement("rect", {
    fill: "#9E9E9E",
    x: "0",
    y: "0",
    width: "2",
    height: "48"
  }), _react.default.createElement("rect", {
    fill: "#9E9E9E",
    x: "0",
    y: "46",
    width: "48",
    height: "2"
  }))));
};

var _default = AreaIcon;
exports.default = _default;