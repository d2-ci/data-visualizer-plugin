"use strict";

var _interopRequireDefault = require("/home/travis/build/dhis2/data-visualizer-app/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _SvgIcon = _interopRequireDefault(require("@material-ui/core/SvgIcon"));

var YearOverYearLineIcon = function YearOverYearLineIcon(_ref) {
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
  })), _react.default.createElement("polygon", {
    stroke: "#1976D2",
    strokeWidth: "2",
    mask: "url(#mask-2)",
    points: "1 28 10 35 18 16 34 35 50 36 50 51 -3 51 -3 28"
  }), _react.default.createElement("polygon", {
    stroke: "#004BA0",
    strokeWidth: "2",
    mask: "url(#mask-2)",
    points: "1 20 8 20 19 29 36 17 50 28 50 51 -3 51 -3 20"
  }), _react.default.createElement("polygon", {
    stroke: "#63A4FF",
    strokeWidth: "2",
    mask: "url(#mask-2)",
    points: "1 35 19 39 28 31 38 28 50 43 50 66 -3 66 -3 35"
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

var _default = YearOverYearLineIcon;
exports.default = _default;