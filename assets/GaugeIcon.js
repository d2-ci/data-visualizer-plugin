"use strict";

var _interopRequireDefault = require("/home/travis/build/dhis2/data-visualizer-app/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _SvgIcon = _interopRequireDefault(require("@material-ui/core/SvgIcon"));

var GaugeIcon = function GaugeIcon(_ref) {
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
  }, _react.default.createElement("g", {
    transform: "translate(0.000000, -12.000000)"
  }, _react.default.createElement("path", {
    d: "M2,36 C2,23.8497355 11.8497355,14 24,14 C36.1502645,14 46,23.8497355 46,36 L48,36 C48,22.745166 37.254834,12 24,12 C10.745166,12 0,22.745166 0,36 L2,36 Z",
    fill: "#9E9E9E",
    fillRule: "nonzero"
  }), _react.default.createElement("path", {
    d: "M39.5630877,20.4405157 C39.0656993,19.9377314 38.5441136,19.4570095 38,19 C34.2678935,15.9151064 29.3575953,14 24,14 C11.8497355,14 2,23.8497355 2,36 L8,36 C8,27.163444 15.163444,20 24,20 C27.7876065,20 31.3827316,21.3146632 34.1773496,23.6246453 C34.5775703,23.9608232 34.9595684,24.3130995 35.3225781,24.6801975 L39.5630877,20.4405157 Z",
    fill: "#63A4FF",
    fillRule: "nonzero"
  }))));
};

var _default = GaugeIcon;
exports.default = _default;