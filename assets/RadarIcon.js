"use strict";

var _interopRequireDefault = require("/home/travis/build/dhis2/data-visualizer-app/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _SvgIcon = _interopRequireDefault(require("@material-ui/core/SvgIcon"));

var RadarIcon = function RadarIcon(_ref) {
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
  }, _react.default.createElement("circle", {
    stroke: "#9E9E9E",
    strokeWidth: "2",
    cx: "24",
    cy: "24",
    r: "23"
  }), _react.default.createElement("circle", {
    stroke: "#9E9E9E",
    strokeWidth: "2",
    cx: "24",
    cy: "24",
    r: "15"
  }), _react.default.createElement("circle", {
    stroke: "#9E9E9E",
    strokeWidth: "2",
    cx: "24",
    cy: "24",
    r: "5"
  }), _react.default.createElement("circle", {
    fill: "#1976D2",
    cx: "24",
    cy: "9",
    r: "2"
  }), _react.default.createElement("circle", {
    fill: "#1976D2",
    cx: "11",
    cy: "31",
    r: "2"
  }), _react.default.createElement("circle", {
    fill: "#63A4FF",
    cx: "24",
    cy: "39",
    r: "2"
  }), _react.default.createElement("circle", {
    fill: "#004BA0",
    cx: "39",
    cy: "24",
    r: "2"
  }), _react.default.createElement("circle", {
    fill: "#004BA0",
    cx: "40",
    cy: "40",
    r: "2"
  })));
};

var _default = RadarIcon;
exports.default = _default;