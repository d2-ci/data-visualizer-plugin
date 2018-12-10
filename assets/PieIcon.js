"use strict";

var _interopRequireDefault = require("/home/travis/build/dhis2/data-visualizer-app/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _SvgIcon = _interopRequireDefault(require("@material-ui/core/SvgIcon"));

var PieIcon = function PieIcon(_ref) {
  var _ref$style = _ref.style,
      style = _ref$style === void 0 ? {
    paddingRight: '8px',
    width: 24,
    height: 24
  } : _ref$style;
  return _react.default.createElement(_SvgIcon.default, {
    viewBox: "0,0,48,48",
    style: style
  }, _react.default.createElement("defs", null, _react.default.createElement("mask", {
    id: "mask-4",
    fill: "white"
  }, _react.default.createElement("circle", {
    cx: "24",
    cy: "24",
    r: "24"
  }))), _react.default.createElement("g", {
    stroke: "none",
    strokeWidth: "0",
    fill: "none",
    fillRule: "evenodd"
  }, _react.default.createElement("g", {
    transform: "translate(24.000000, 24.000000) rotate(-135.000000) translate(-24.000000, -24.000000) "
  }, _react.default.createElement("g", {
    stroke: "none",
    fill: "none",
    strokeDasharray: "30.17142857142857,240",
    mask: "url(#mask-4)",
    strokeWidth: "48"
  }, _react.default.createElement("path", {
    stroke: "#63A4FF",
    d: "M24 48C37.254834 48 48 37.254834 48 24 48 10.745166 37.254834 0 24 0 10.745166 0 0 10.745166 0 24 0 37.254834 10.745166 48 24 48Z"
  })), _react.default.createElement("g", {
    stroke: "none",
    fill: "none",
    strokeDasharray: "82.97142857142858,240",
    mask: "url(#mask-4)",
    transform: "translate(24.000000, 24.000000) rotate(-72.000000) translate(-24.000000, -24.000000) ",
    strokeWidth: "48"
  }, _react.default.createElement("path", {
    stroke: "#1976D2",
    d: "M24 48C37.254834 48 48 37.254834 48 24 48 10.745166 37.254834 0 24 0 10.745166 0 0 10.745166 0 24 0 37.254834 10.745166 48 24 48Z"
  })), _react.default.createElement("g", {
    stroke: "none",
    fill: "none",
    strokeDasharray: "37.71428571428572,240",
    mask: "url(#mask-4)",
    transform: "translate(24.000000, 24.000000) rotate(-270.000000) translate(-24.000000, -24.000000) ",
    strokeWidth: "48"
  }, _react.default.createElement("path", {
    stroke: "#004BA0",
    d: "M24 48C37.254834 48 48 37.254834 48 24 48 10.745166 37.254834 0 24 0 10.745166 0 0 10.745166 0 24 0 37.254834 10.745166 48 24 48Z"
  })))));
};

var _default = PieIcon;
exports.default = _default;