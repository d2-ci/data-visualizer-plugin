"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "getAllFieldObjectsByType", {
  enumerable: true,
  get: function get() {
    return _baseFields.getAllFieldObjectsByType;
  }
});
exports.getFieldsStringByType = exports.getExcludedByType = exports.getIncludedByType = exports.getOptionsByType = void 0;

var _baseFields = require("./baseFields");

var _nestedFields = require("./nestedFields");

var getOptionsByType = function getOptionsByType(type) {
  return (0, _baseFields.getAllFieldObjectsByType)(type).filter(function (fieldObj) {
    return fieldObj.option === true;
  });
};

exports.getOptionsByType = getOptionsByType;

var getIncludedByType = function getIncludedByType(type) {
  return (0, _baseFields.getAllFieldObjectsByType)(type).filter(function (fieldObj) {
    return !fieldObj.excluded;
  });
};

exports.getIncludedByType = getIncludedByType;

var getExcludedByType = function getExcludedByType(type) {
  return (0, _baseFields.getAllFieldObjectsByType)(type).filter(function (fieldObj) {
    return fieldObj.excluded === true;
  });
};

exports.getExcludedByType = getExcludedByType;

var getFieldsStringByType = function getFieldsStringByType(type) {
  return (0, _baseFields.getAllFieldObjectsByType)(type).map(_baseFields.markExcluded).map(_baseFields.extractName).sort().reduce(_baseFields.moveExcludedToEnd, null).map(_nestedFields.extendFields).join(',');
};

exports.getFieldsStringByType = getFieldsStringByType;