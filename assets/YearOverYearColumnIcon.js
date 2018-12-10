"use strict";

var _interopRequireDefault = require("/home/travis/build/dhis2/data-visualizer-app/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _SvgIcon = _interopRequireDefault(require("@material-ui/core/SvgIcon"));

var YearOverYearColumnIcon = function YearOverYearColumnIcon(_ref) {
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
  }, _react.default.createElement("g", null, _react.default.createElement("polygon", {
    points: "0 0 48 0 48 48 0 48"
  }), _react.default.createElement("polygon", {
    fill: "#63A4FF",
    points: "6 14 11 14 11 46 6 46"
  }), _react.default.createElement("polygon", {
    fill: "#63A4FF",
    points: "20 23 25 23 25 46 20 46"
  }), _react.default.createElement("polygon", {
    fill: "#63A4FF",
    points: "34 30 39 30 39 46 34 46"
  }), _react.default.createElement("polygon", {
    fill: "#004BA0",
    points: "11 26 16 26 16 46 11 46"
  }), _react.default.createElement("polygon", {
    fill: "#004BA0",
    points: "25 16 30 16 30 46 25 46"
  }), _react.default.createElement("polygon", {
    fill: "#004BA0",
    points: "39 9 44 9 44 46 39 46"
  }), _react.default.createElement("polygon", {
    fill: "#9E9E9E",
    points: "0 0 2 0 2 48 0 48"
  }), _react.default.createElement("polygon", {
    fill: "#9E9E9E",
    points: "0 46 48 46 48 48 0 48"
  }))));
};

var _default = YearOverYearColumnIcon;
exports.default = _default;