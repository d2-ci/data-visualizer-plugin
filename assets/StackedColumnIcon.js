"use strict";

var _interopRequireDefault = require("/home/travis/build/dhis2/data-visualizer-app/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _SvgIcon = _interopRequireDefault(require("@material-ui/core/SvgIcon"));

var StackedColumnIcon = function StackedColumnIcon(_ref) {
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
    x: "6",
    y: "14",
    width: "10",
    height: "32"
  }), _react.default.createElement("rect", {
    fill: "#9EC6FF",
    transform: "translate(11.000000, 16.500000) scale(1, -1) translate(-11.000000, -16.500000) ",
    x: "6",
    y: "7",
    width: "10",
    height: "19"
  }), _react.default.createElement("rect", {
    fill: "#1976D2",
    x: "20",
    y: "20",
    width: "10",
    height: "26"
  }), _react.default.createElement("rect", {
    fill: "#63A4FF",
    transform: "translate(25.000000, 15.500000) scale(1, -1) translate(-25.000000, -15.500000) ",
    x: "20",
    y: "11",
    width: "10",
    height: "9"
  }), _react.default.createElement("rect", {
    fill: "#004BA0",
    x: "36",
    y: "33",
    width: "10",
    height: "13"
  }), _react.default.createElement("rect", {
    fill: "#1976D2",
    transform: "translate(41.000000, 23.500000) scale(1, -1) translate(-41.000000, -23.500000) ",
    x: "36",
    y: "14",
    width: "10",
    height: "19"
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

var _default = StackedColumnIcon;
exports.default = _default;