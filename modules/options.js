"use strict";

var _interopRequireDefault = require("/home/travis/build/dhis2/data-visualizer-app/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getOptionsFromVisualization = exports.getOptionsForRequest = exports.getOptionsForUi = exports.default = exports.computedOptions = exports.options = void 0;

var _slicedToArray2 = _interopRequireDefault(require("/home/travis/build/dhis2/data-visualizer-app/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/slicedToArray"));

var _objectSpread2 = _interopRequireDefault(require("/home/travis/build/dhis2/data-visualizer-app/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/objectSpread"));

var _pick = _interopRequireDefault(require("lodash-es/pick"));

var options = {
  baseLineLabel: {
    defaultValue: undefined,
    requestable: false
  },
  baseLineValue: {
    defaultValue: undefined,
    requestable: false
  },
  // colorSet:
  cumulativeValues: {
    defaultValue: false,
    requestable: false
  },
  domainAxisLabel: {
    defaultValue: undefined,
    requestable: false
  },
  hideEmptyRowItems: {
    defaultValue: 'NONE',
    requestable: false
  },
  hideLegend: {
    defaultValue: false,
    requestable: false
  },
  noSpaceBetweenColumns: {
    defaultValue: false,
    requestable: false
  },
  percentStackedValues: {
    defaultValue: false,
    requestable: false
  },
  rangeAxisDecimals: {
    defaultValue: undefined,
    requestable: false
  },
  rangeAxisLabel: {
    defaultValue: undefined,
    requestable: false
  },
  rangeAxisMaxValue: {
    defaultValue: undefined,
    requestable: false
  },
  rangeAxisMinValue: {
    defaultValue: undefined,
    requestable: false
  },
  rangeAxisSteps: {
    defaultValue: undefined,
    requestable: false
  },
  regressionType: {
    defaultValue: 'NONE',
    requestable: false
  },
  showData: {
    defaultValue: true,
    requestable: false
  },
  targetLineLabel: {
    defaultValue: undefined,
    requestable: false
  },
  targetLineValue: {
    defaultValue: undefined,
    requestable: false
  },
  // legendDisplayStrategy
  // legendSet
  aggregationType: {
    defaultValue: 'DEFAULT',
    requestable: true
  },
  completedOnly: {
    defaultValue: false,
    requestable: true
  },
  hideSubtitle: {
    defaultValue: false,
    requestable: false
  },
  hideTitle: {
    defaultValue: false,
    requestable: false
  },
  sortOrder: {
    defaultValue: 0,
    requestable: false
  },
  subtitle: {
    defaultValue: undefined,
    requestable: false
  },
  title: {
    defaultValue: undefined,
    requestable: false
  } // topLimit

};
exports.options = options;
var computedOptions = {
  baseLine: {
    defaultValue: false,
    requestable: false
  },
  targetLine: {
    defaultValue: false,
    requestable: false
  }
};
exports.computedOptions = computedOptions;
var _default = options;
exports.default = _default;

var getOptionsForUi = function getOptionsForUi() {
  return Object.entries((0, _objectSpread2.default)({}, options, computedOptions)).reduce(function (map, _ref) {
    var _ref2 = (0, _slicedToArray2.default)(_ref, 2),
        option = _ref2[0],
        props = _ref2[1];

    map[option] = props.defaultValue;
    return map;
  }, {});
};

exports.getOptionsForUi = getOptionsForUi;

var getOptionsForRequest = function getOptionsForRequest() {
  return Object.entries(options).filter(function (_ref3) {
    var _ref4 = (0, _slicedToArray2.default)(_ref3, 2),
        option = _ref4[0],
        props = _ref4[1];

    return props.requestable;
  });
};

exports.getOptionsForRequest = getOptionsForRequest;

var isNotDefault = function isNotDefault(optionsFromVisualization, prop) {
  return Boolean(optionsFromVisualization[prop] && optionsFromVisualization[prop] !== options[prop].defaultValue);
};

var getOptionsFromVisualization = function getOptionsFromVisualization(visualization) {
  var optionsFromVisualization = (0, _objectSpread2.default)({}, getOptionsForUi(), (0, _pick.default)(visualization, Object.keys(options)));
  optionsFromVisualization.baseLine = isNotDefault(optionsFromVisualization, 'baseLineLabel') || isNotDefault(optionsFromVisualization, 'baseLineValue');
  optionsFromVisualization.targetLine = isNotDefault(optionsFromVisualization, 'targetLineLabel') || isNotDefault(optionsFromVisualization, 'targetLineValue');
  return optionsFromVisualization;
};

exports.getOptionsFromVisualization = getOptionsFromVisualization;