var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

import pick from 'lodash-es/pick';

export var options = {
    baseLineLabel: { defaultValue: undefined, requestable: false },
    baseLineValue: { defaultValue: undefined, requestable: false },
    // colorSet:
    cumulativeValues: { defaultValue: false, requestable: false },
    domainAxisLabel: { defaultValue: undefined, requestable: false },
    hideEmptyRowItems: { defaultValue: 'NONE', requestable: false },
    hideLegend: { defaultValue: false, requestable: false },
    noSpaceBetweenColumns: { defaultValue: false, requestable: false },
    percentStackedValues: { defaultValue: false, requestable: false },
    rangeAxisDecimals: { defaultValue: undefined, requestable: false },
    rangeAxisLabel: { defaultValue: undefined, requestable: false },
    rangeAxisMaxValue: { defaultValue: undefined, requestable: false },
    rangeAxisMinValue: { defaultValue: undefined, requestable: false },
    rangeAxisSteps: { defaultValue: undefined, requestable: false },
    regressionType: { defaultValue: 'NONE', requestable: false },
    showData: { defaultValue: true, requestable: false },
    targetLineLabel: { defaultValue: undefined, requestable: false },
    targetLineValue: { defaultValue: undefined, requestable: false },
    // legendDisplayStrategy
    // legendSet
    aggregationType: { defaultValue: 'DEFAULT', requestable: true },
    completedOnly: { defaultValue: false, requestable: true },
    hideSubtitle: { defaultValue: false, requestable: false },
    hideTitle: { defaultValue: false, requestable: false },
    sortOrder: { defaultValue: 0, requestable: false },
    subtitle: { defaultValue: undefined, requestable: false },
    title: { defaultValue: undefined, requestable: false }
    // topLimit
};

export var computedOptions = {
    baseLine: { defaultValue: false, requestable: false },
    targetLine: { defaultValue: false, requestable: false }
};

export default options;

export var getOptionsForUi = function getOptionsForUi() {
    return Object.entries(_extends({}, options, computedOptions)).reduce(function (map, _ref) {
        var _ref2 = _slicedToArray(_ref, 2),
            option = _ref2[0],
            props = _ref2[1];

        map[option] = props.defaultValue;

        return map;
    }, {});
};

export var getOptionsForRequest = function getOptionsForRequest() {
    return Object.entries(options).filter(function (_ref3) {
        var _ref4 = _slicedToArray(_ref3, 2),
            option = _ref4[0],
            props = _ref4[1];

        return props.requestable;
    });
};

var isNotDefault = function isNotDefault(optionsFromVisualization, prop) {
    return Boolean(optionsFromVisualization[prop] && optionsFromVisualization[prop] !== options[prop].defaultValue);
};

export var getOptionsFromVisualization = function getOptionsFromVisualization(visualization) {
    var optionsFromVisualization = _extends({}, getOptionsForUi(), pick(visualization, Object.keys(options)));

    optionsFromVisualization.baseLine = isNotDefault(optionsFromVisualization, 'baseLineLabel') || isNotDefault(optionsFromVisualization, 'baseLineValue');

    optionsFromVisualization.targetLine = isNotDefault(optionsFromVisualization, 'targetLineLabel') || isNotDefault(optionsFromVisualization, 'targetLineValue');

    return optionsFromVisualization;
};