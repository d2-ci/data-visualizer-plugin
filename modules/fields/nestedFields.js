"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.extendFields = exports.nestedFields = void 0;
// constants
var ID = 'id';
var NAME = 'name,displayName,displayShortName';
var DIMENSION_ITEM = "dimensionItem~rename(".concat(ID, ")");
var LEGEND_SET = "legendSet[".concat(ID, ",").concat(NAME, "]");
var USER = "user[".concat(NAME, ",userCredentials[username]]");
var ITEMS = "items[".concat(DIMENSION_ITEM, ",").concat(NAME, ",dimensionItemType]");
var COMMENTS = "comments[".concat(ID, ",").concat(USER, ",lastUpdated,text");
var AXIS = "dimension,filter,".concat(LEGEND_SET, ",").concat(ITEMS);
var INTERPRETATIONS = 'id,created'; // nested fields map

var nestedFields = {
  columns: AXIS,
  rows: AXIS,
  filters: AXIS,
  user: USER,
  comments: COMMENTS,
  interpretations: INTERPRETATIONS
};
exports.nestedFields = nestedFields;

var extendFields = function extendFields(field) {
  return "".concat(field).concat(nestedFields[field] ? "[".concat(nestedFields[field], "]") : '');
};

exports.extendFields = extendFields;