"use strict";

var _interopRequireDefault = require("/home/travis/build/dhis2/data-visualizer-app/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _SvgIcon = _interopRequireDefault(require("@material-ui/core/SvgIcon"));

var StackedBarIcon = function StackedBarIcon(_ref) {
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
  }, _react.default.createElement("rect", {
    fill: "#63A4FF",
    x: "2",
    y: "4",
    width: "17",
    height: "10"
  }), _react.default.createElement("rect", {
    fill: "#9EC6FF",
    transform: "translate(23.500000, 9.000000) scale(-1, 1) translate(-23.500000, -9.000000) ",
    x: "19",
    y: "4",
    width: "9",
    height: "10"
  }), _react.default.createElement("rect", {
    fill: "#1976D2",
    x: "2",
    y: "18",
    width: "34",
    height: "10"
  }), _react.default.createElement("rect", {
    fill: "#63A4FF",
    x: "13",
    y: "18",
    width: "23",
    height: "10"
  }), _react.default.createElement("rect", {
    fill: "#004BA0",
    x: "2",
    y: "32",
    width: "40",
    height: "10"
  }), _react.default.createElement("rect", {
    fill: "#1976D2",
    x: "33",
    y: "32",
    width: "9",
    height: "10"
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
  })));
};

var _default = StackedBarIcon;
exports.default = _default;