"use strict";

var _interopRequireDefault = require("/home/travis/build/dhis2/data-visualizer-app/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isYearOverYear = exports.isStacked = exports.chartTypeDisplayNames = exports.YEAR_OVER_YEAR_COLUMN = exports.YEAR_OVER_YEAR_LINE = exports.BUBBLE = exports.GAUGE = exports.RADAR = exports.PIE = exports.AREA = exports.LINE = exports.STACKED_BAR = exports.BAR = exports.STACKED_COLUMN = exports.COLUMN = void 0;

var _defineProperty2 = _interopRequireDefault(require("/home/travis/build/dhis2/data-visualizer-app/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/defineProperty"));

var _d2I18n = _interopRequireDefault(require("@dhis2/d2-i18n"));

var _chartTypeDisplayName;

var COLUMN = 'COLUMN';
exports.COLUMN = COLUMN;
var STACKED_COLUMN = 'STACKED_COLUMN';
exports.STACKED_COLUMN = STACKED_COLUMN;
var BAR = 'BAR';
exports.BAR = BAR;
var STACKED_BAR = 'STACKED_BAR';
exports.STACKED_BAR = STACKED_BAR;
var LINE = 'LINE';
exports.LINE = LINE;
var AREA = 'AREA';
exports.AREA = AREA;
var PIE = 'PIE';
exports.PIE = PIE;
var RADAR = 'RADAR';
exports.RADAR = RADAR;
var GAUGE = 'GAUGE';
exports.GAUGE = GAUGE;
var BUBBLE = 'BUBBLE';
exports.BUBBLE = BUBBLE;
var YEAR_OVER_YEAR_LINE = 'YEAR_OVER_YEAR_LINE';
exports.YEAR_OVER_YEAR_LINE = YEAR_OVER_YEAR_LINE;
var YEAR_OVER_YEAR_COLUMN = 'YEAR_OVER_YEAR_COLUMN';
exports.YEAR_OVER_YEAR_COLUMN = YEAR_OVER_YEAR_COLUMN;
var chartTypeDisplayNames = (_chartTypeDisplayName = {}, (0, _defineProperty2.default)(_chartTypeDisplayName, COLUMN, _d2I18n.default.t('Column')), (0, _defineProperty2.default)(_chartTypeDisplayName, STACKED_COLUMN, _d2I18n.default.t('Stacked column')), (0, _defineProperty2.default)(_chartTypeDisplayName, BAR, _d2I18n.default.t('Bar')), (0, _defineProperty2.default)(_chartTypeDisplayName, STACKED_BAR, _d2I18n.default.t('Stacked bar')), (0, _defineProperty2.default)(_chartTypeDisplayName, LINE, _d2I18n.default.t('Line')), (0, _defineProperty2.default)(_chartTypeDisplayName, AREA, _d2I18n.default.t('Area')), (0, _defineProperty2.default)(_chartTypeDisplayName, PIE, _d2I18n.default.t('Pie')), (0, _defineProperty2.default)(_chartTypeDisplayName, RADAR, _d2I18n.default.t('Radar')), (0, _defineProperty2.default)(_chartTypeDisplayName, GAUGE, _d2I18n.default.t('Gauge')), (0, _defineProperty2.default)(_chartTypeDisplayName, YEAR_OVER_YEAR_LINE, _d2I18n.default.t('Year over year (line)')), (0, _defineProperty2.default)(_chartTypeDisplayName, YEAR_OVER_YEAR_COLUMN, _d2I18n.default.t('Year over year (column)')), _chartTypeDisplayName);
exports.chartTypeDisplayNames = chartTypeDisplayNames;
var stackedTypes = [STACKED_COLUMN, STACKED_BAR, AREA];
var yearOverYearTypes = [YEAR_OVER_YEAR_LINE, YEAR_OVER_YEAR_COLUMN];

var isStacked = function isStacked(type) {
  return stackedTypes.includes(type);
};

exports.isStacked = isStacked;

var isYearOverYear = function isYearOverYear(type) {
  return yearOverYearTypes.includes(type);
};

exports.isYearOverYear = isYearOverYear;