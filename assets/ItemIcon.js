"use strict";

var _interopRequireDefault = require("/home/travis/build/dhis2/data-visualizer-app/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var ItemIcon = function ItemIcon(_ref) {
  var backgroundColor = _ref.backgroundColor;
  return _react.default.createElement("div", {
    style: {
      backgroundColor: backgroundColor,
      minHeight: 6,
      minWidth: 6,
      margin: '0px 5px'
    }
  });
};

var _default = ItemIcon;
exports.default = _default;