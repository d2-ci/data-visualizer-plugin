export var YEAR_OVER_YEAR_LINE = 'YEAR_OVER_YEAR_LINE';
export var YEAR_OVER_YEAR_COLUMN = 'YEAR_OVER_YEAR_COLUMN';

var yearOverYearTypes = [YEAR_OVER_YEAR_LINE, YEAR_OVER_YEAR_COLUMN];

export var isYearOverYear = function isYearOverYear(type) {
  return yearOverYearTypes.includes(type);
};