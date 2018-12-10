"use strict";

var _interopRequireDefault = require("/home/travis/build/dhis2/data-visualizer-app/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAllFieldObjectsByType = exports.moveExcludedToEnd = exports.markExcluded = exports.extractName = exports.fieldsByType = void 0;

var _slicedToArray2 = _interopRequireDefault(require("/home/travis/build/dhis2/data-visualizer-app/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/slicedToArray"));

var _defineProperty2 = _interopRequireDefault(require("/home/travis/build/dhis2/data-visualizer-app/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/defineProperty"));

var _objectSpread4 = _interopRequireDefault(require("/home/travis/build/dhis2/data-visualizer-app/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/objectSpread"));

var NAME_FIELD = 'name';

var getFieldObject = function getFieldObject(name) {
  var props = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return (0, _objectSpread4.default)((0, _defineProperty2.default)({}, NAME_FIELD, name), props);
}; // fields by type


var fieldsByType = {
  reportTable: [getFieldObject('cumulative', {
    option: true
  }), getFieldObject('hideEmptyColumns', {
    option: true
  }), getFieldObject('legendDisplayStyle', {
    option: true
  }), getFieldObject('measureCriteria', {
    option: true
  }), getFieldObject('numberType', {
    option: true
  }), getFieldObject('regression', {
    option: true
  }), getFieldObject('reportParams', {
    option: true
  }), getFieldObject('skipRounding', {
    option: true
  })],
  chart: [getFieldObject('category', {
    excluded: true
  }), getFieldObject('series', {
    excluded: true
  }), getFieldObject('yearlySeries')],
  eventReport: [getFieldObject('dataType')],
  reportTable_eventReport: [getFieldObject('colSubTotals', {
    option: true
  }), getFieldObject('colTotals', {
    option: true
  }), getFieldObject('displayDensity', {
    option: true
  }), getFieldObject('fontSize', {
    option: true
  }), getFieldObject('hideEmptyRows', {
    option: true
  }), getFieldObject('rowSubTotals', {
    option: true
  }), getFieldObject('rowTotals', {
    option: true
  }), getFieldObject('showDimensionLabels', {
    option: true
  }), getFieldObject('showHierarchy', {
    option: true
  })],
  chart_eventChart: [getFieldObject('baseLineLabel', {
    option: true
  }), getFieldObject('baseLineValue', {
    option: true
  }), getFieldObject('colorSet', {
    option: true
  }), getFieldObject('cumulativeValues', {
    option: true
  }), getFieldObject('domainAxisLabel', {
    option: true
  }), getFieldObject('hideEmptyRowItems', {
    option: true
  }), getFieldObject('hideLegend', {
    option: true
  }), getFieldObject('noSpaceBetweenColumns', {
    option: true
  }), getFieldObject('percentStackedValues', {
    option: true
  }), getFieldObject('rangeAxisDecimals', {
    option: true
  }), getFieldObject('rangeAxisLabel', {
    option: true
  }), getFieldObject('rangeAxisMaxValue', {
    option: true
  }), getFieldObject('rangeAxisMinValue', {
    option: true
  }), getFieldObject('rangeAxisSteps', {
    option: true
  }), getFieldObject('regressionType', {
    option: true
  }), getFieldObject('showData', {
    option: true
  }), getFieldObject('targetLineLabel', {
    option: true
  }), getFieldObject('targetLineValue', {
    option: true
  }), getFieldObject('type', {
    option: true
  })],
  eventReport_eventChart: [getFieldObject('attributeValueDimension'), getFieldObject('collapseDataDimensions'), getFieldObject('dataElementValueDimension'), getFieldObject('endDate'), getFieldObject('eventStatus', {
    option: true
  }), getFieldObject('hideNaData', {
    option: true
  }), getFieldObject('outputType', {
    option: true
  }), getFieldObject('program'), getFieldObject('programStage'), getFieldObject('programStatus', {
    option: true
  }), getFieldObject('startDate'), getFieldObject('value')],
  reportTable_chart_eventReport: [getFieldObject('legendDisplayStrategy', {
    option: true
  }), getFieldObject('legendSet', {
    option: true
  })],
  reportTable_eventReport_eventChart: [getFieldObject('columnDimensions', {
    excluded: true
  }), getFieldObject('rowDimensions', {
    excluded: true
  })],
  reportTable_chart_eventReport_eventChart: [getFieldObject('access'), getFieldObject('aggregationType', {
    option: true
  }), getFieldObject('attributeDimensions', {
    excluded: true
  }), getFieldObject('attributeValues', {
    excluded: true
  }), getFieldObject('categoryDimensions', {
    excluded: true
  }), getFieldObject('categoryOptionGroupSetDimensions', {
    excluded: true
  }), getFieldObject('code', {
    excluded: true
  }), getFieldObject('columns'), getFieldObject('completedOnly', {
    option: true
  }), getFieldObject('created'), getFieldObject('dataDimensionItems', {
    excluded: true
  }), getFieldObject('dataElementDimensions', {
    excluded: true
  }), getFieldObject('dataElementGroupSetDimensions', {
    excluded: true
  }), getFieldObject('description'), getFieldObject('digitGroupSeparator'), getFieldObject('displayDescription'), getFieldObject('displayName'), getFieldObject('displayShortName'), getFieldObject('externalAccess', {
    excluded: true
  }), getFieldObject('favorite'), getFieldObject('favorites'), getFieldObject('filterDimensions', {
    excluded: true
  }), getFieldObject('filters'), getFieldObject('hideSubtitle', {
    option: true
  }), getFieldObject('hideTitle', {
    option: true
  }), getFieldObject('href', {
    excluded: true
  }), getFieldObject('id'), getFieldObject('interpretations'), getFieldObject('itemOrganisationUnitGroups', {
    excluded: true
  }), getFieldObject('lastUpdated'), getFieldObject('lastUpdatedBy'), getFieldObject('name'), getFieldObject('organisationUnitGroupSetDimensions', {
    excluded: true
  }), getFieldObject('organisationUnitLevels', {
    excluded: true
  }), getFieldObject('organisationUnits', {
    excluded: true
  }), getFieldObject('parentGraphMap'), getFieldObject('periods', {
    excluded: true
  }), getFieldObject('programIndicatorDimensions', {
    excluded: true
  }), getFieldObject('publicAccess'), getFieldObject('relativePeriods', {
    excluded: true
  }), getFieldObject('rows'), getFieldObject('shortName'), getFieldObject('sortOrder', {
    option: true
  }), getFieldObject('subscribed'), getFieldObject('subscribers'), getFieldObject('subtitle', {
    option: true
  }), getFieldObject('timeField'), getFieldObject('title', {
    option: true
  }), getFieldObject('topLimit', {
    option: true
  }), getFieldObject('translations'), getFieldObject('user'), getFieldObject('userAccesses'), getFieldObject('userGroupAccesses'), getFieldObject('userOrganisationUnit', {
    excluded: true
  }), getFieldObject('userOrganisationUnitChildren', {
    excluded: true
  }), getFieldObject('userOrganisationUnitGrandChildren', {
    excluded: true
  })]
}; // actions

exports.fieldsByType = fieldsByType;

var extractName = function extractName(propObj) {
  return propObj[NAME_FIELD];
};

exports.extractName = extractName;

var markExcluded = function markExcluded(fieldObj) {
  return fieldObj.excluded === true ? (0, _objectSpread4.default)({}, fieldObj, (0, _defineProperty2.default)({}, NAME_FIELD, "!".concat(fieldObj[NAME_FIELD]))) : fieldObj;
};

exports.markExcluded = markExcluded;

var moveExcludedToEnd = function moveExcludedToEnd(acc, current, curIndex, array) {
  !acc && (acc = array.slice());
  current.charAt(0) === '!' && acc.push(acc.shift());
  return acc;
}; // getters


exports.moveExcludedToEnd = moveExcludedToEnd;

var getAllFieldObjectsByType = function getAllFieldObjectsByType(type) {
  return Object.entries(fieldsByType).reduce(function (fields, _ref) {
    var _ref2 = (0, _slicedToArray2.default)(_ref, 2),
        key = _ref2[0],
        value = _ref2[1];

    return key.includes(type) ? fields.concat(value) : fields;
  }, []);
};

exports.getAllFieldObjectsByType = getAllFieldObjectsByType;