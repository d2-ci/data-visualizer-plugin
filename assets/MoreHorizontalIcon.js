"use strict";

var _interopRequireDefault = require("/home/travis/build/dhis2/data-visualizer-app/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _objectSpread2 = _interopRequireDefault(require("/home/travis/build/dhis2/data-visualizer-app/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/objectSpread"));

var _react = _interopRequireDefault(require("react"));

var MoreHorizontalIcon = function MoreHorizontalIcon(_ref) {
  var style = _ref.style;
  return _react.default.createElement("svg", {
    style: (0, _objectSpread2.default)({}, style),
    xmlns: "http://www.w3.org/2000/svg",
    width: "22",
    height: "24",
    viewBox: "0 0 24 24"
  }, _react.default.createElement("path", {
    d: "M0 0h24v24H0z",
    fill: "none"
  }), _react.default.createElement("path", {
    d: "M6 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm12 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-6 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"
  }));
};

var _default = MoreHorizontalIcon;
exports.default = _default;