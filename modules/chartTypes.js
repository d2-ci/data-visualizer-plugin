export var YEAR_OVER_YEAR_LINE = 'YEAR_OVER_YEAR_LINE';
export var YEAR_OVER_YEAR_COLUMN = 'YEAR_OVER_YEAR_COLUMN';
export var SINGLE_VALUE = 'SINGLE_VALUE';
export var PIVOT_TABLE = 'PIVOT_TABLE';

var yearOverYearTypes = [YEAR_OVER_YEAR_LINE, YEAR_OVER_YEAR_COLUMN];

export var isYearOverYear = function isYearOverYear(type) {
  return yearOverYearTypes.includes(type);
};
export var isSingleValue = function isSingleValue(type) {
  return type === SINGLE_VALUE;
};