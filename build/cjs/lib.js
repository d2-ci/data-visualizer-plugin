/* eslint-disable */
'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = require('react');
var React__default = _interopDefault(React);
var reactDom = require('react-dom');
var PropTypes = _interopDefault(require('prop-types'));
var appRuntime = require('@dhis2/app-runtime');
var uiCore = require('@dhis2/ui-core');
var analytics = require('@dhis2/analytics');
var i18n = _interopDefault(require('@dhis2/d2-i18n'));
require('lodash-es/pick');

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }

  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function () {
    var self = this,
        args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);

      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }

      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }

      _next(undefined);
    });
  };
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    });
    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys(Object(source), true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

function _objectWithoutProperties(source, excluded) {
  if (source == null) return {};

  var target = _objectWithoutPropertiesLoose(source, excluded);

  var key, i;

  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);

    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }

  return target;
}

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest();
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArrayLimit(arr, i) {
  if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) {
    return;
  }

  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;

  try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance");
}

var legendSetsQuery = {
  legendSets: {
    resource: 'legendSets',
    params: function params(_ref) {
      var ids = _ref.ids;
      return {
        fields: 'id,legends[id,displayName~rename(name),startValue,endValue,color]',
        filter: "id:in:[".concat(ids.join(','), "]")
      };
    }
  }
};
var apiFetchLegendSets = function apiFetchLegendSets(dataEngine, ids) {
  return dataEngine.query(legendSetsQuery, {
    variables: {
      ids: ids
    }
  });
};

var orgUnitLevelsQuery = {
  orgUnitsLevels: {
    resource: 'organisationUnitLevels',
    params: {
      fields: 'id,level,displayName~rename(name)',
      paging: 'false'
    }
  }
};
var orgUnitsQuery = {
  orgUnits: {
    resource: 'organisationUnits',
    id: function id(_ref) {
      var _id = _ref.id;
      return _id;
    },
    params: {
      fields: 'id,level,displayName~rename(name),parent[id,displayName~rename(name)],children[level]',
      paging: 'false',
      userDataViewFallback: 'true'
    }
  }
};
var apiFetchOrganisationUnitLevels = function apiFetchOrganisationUnitLevels(dataEngine) {
  return dataEngine.query(orgUnitLevelsQuery);
};
var apiFetchOrganisationUnit = function apiFetchOrganisationUnit(dataEngine, id) {
  return dataEngine.query(orgUnitsQuery, {
    variables: {
      id: id
    }
  });
};

var ArrowUpwardIcon = function ArrowUpwardIcon(_ref) {
  var _ref$style = _ref.style,
      style = _ref$style === void 0 ? {
    width: 18,
    height: 18
  } : _ref$style;
  return React__default.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 24 24",
    style: style
  }, React__default.createElement("path", {
    d: "M0 0h24v24H0V0z",
    fill: "none"
  }), React__default.createElement("path", {
    d: "M4 12l1.41 1.41L11 7.83V20h2V7.83l5.58 5.59L20 12l-8-8-8 8z",
    fill: "black"
  }));
};

ArrowUpwardIcon.propTypes = {
  style: PropTypes.object
};

var ArrowDownwardIcon = function ArrowDownwardIcon(_ref) {
  var _ref$style = _ref.style,
      style = _ref$style === void 0 ? {
    width: 18,
    height: 18
  } : _ref$style;
  return React__default.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 24 24",
    style: style
  }, React__default.createElement("path", {
    d: "M0 0h24v24H0V0z",
    fill: "none"
  }), React__default.createElement("path", {
    d: "M20 12l-1.41-1.41L13 16.17V4h-2v12.17l-5.58-5.59L4 12l8 8 8-8z",
    fill: "black"
  }));
};

ArrowDownwardIcon.propTypes = {
  style: PropTypes.object
};

var ContextualMenu = function ContextualMenu(_ref) {
  var config = _ref.config,
      ouLevels = _ref.ouLevels,
      _onClick = _ref.onClick;
  var engine = appRuntime.useDataEngine();

  var _useState = React.useState(undefined),
      _useState2 = _slicedToArray(_useState, 2),
      ouData = _useState2[0],
      setOuData = _useState2[1];

  var _useState3 = React.useState(undefined),
      _useState4 = _slicedToArray(_useState3, 2),
      subLevelData = _useState4[0],
      setSubLevelData = _useState4[1];

  var lookupLevel = function lookupLevel(levelId) {
    return ouLevels.find(function (item) {
      return item.level === levelId;
    });
  };

  var doFetchOuData = React.useCallback(
  /*#__PURE__*/
  function () {
    var _ref2 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee(ouId) {
      var ouData;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return apiFetchOrganisationUnit(engine, ouId);

            case 2:
              ouData = _context.sent;
              return _context.abrupt("return", ouData.orgUnits);

            case 4:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function (_x) {
      return _ref2.apply(this, arguments);
    };
  }(), [engine]);
  React.useEffect(function () {
    setOuData(null);

    var doFetch =
    /*#__PURE__*/
    function () {
      var _ref3 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2() {
        var orgUnit;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return doFetchOuData(config.ouId);

              case 2:
                orgUnit = _context2.sent;
                setOuData(orgUnit);

              case 4:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      return function doFetch() {
        return _ref3.apply(this, arguments);
      };
    }();

    if (config.ouId) {
      doFetch();
    }
    /* eslint-disable-next-line react-hooks/exhaustive-deps */

  }, [config]);
  React.useEffect(function () {
    setSubLevelData(null);

    if (ouData === null || ouData === void 0 ? void 0 : ouData.children.length) {
      var levelData = lookupLevel(ouData.children[0].level);

      if (levelData) {
        setSubLevelData(levelData);
      }
    }
    /* eslint-disable-next-line react-hooks/exhaustive-deps */

  }, [ouData]);
  return React__default.createElement(uiCore.Menu, null, ouData && React__default.createElement(uiCore.MenuItem, {
    dense: true,
    label: i18n.t('Org. unit drill down/up')
  }, React__default.createElement(uiCore.Menu, null, subLevelData && React__default.createElement(React__default.Fragment, null, React__default.createElement(uiCore.MenuItem, {
    dense: true,
    icon: React__default.createElement(ArrowDownwardIcon, null),
    label: i18n.t('Show {{level}} level in {{orgunit}}', {
      level: subLevelData.name,
      orgunit: ouData.name
    }),
    onClick: function onClick() {
      return _onClick({
        ou: {
          id: ouData.id,
          level: subLevelData.id
        }
      });
    }
  }), (ouData === null || ouData === void 0 ? void 0 : ouData.parent) && React__default.createElement(uiCore.Divider, null)), (ouData === null || ouData === void 0 ? void 0 : ouData.parent) && React__default.createElement(uiCore.MenuItem, {
    dense: true,
    icon: React__default.createElement(ArrowUpwardIcon, null),
    label: i18n.t('Show {{orgunit}}', {
      orgunit: ouData.parent.name
    }),
    onClick: function onClick() {
      return _onClick({
        ou: {
          id: ouData.parent.id
        }
      });
    }
  }))));
};
ContextualMenu.propTypes = {
  config: PropTypes.object,
  ouLevels: PropTypes.array,
  onClick: PropTypes.func
};

var ChartPlugin = function ChartPlugin(_ref) {
  var visualization = _ref.visualization,
      responses = _ref.responses,
      extraOptions = _ref.extraOptions,
      legendSets = _ref.legendSets,
      renderCounter = _ref.id,
      style = _ref.style,
      onChartGenerated = _ref.onChartGenerated,
      defaultAnimation = _ref.animation;
  var canvasRef = React.useRef(undefined);
  var renderVisualization = React.useCallback(function (animation) {
    var visualizationConfig = analytics.createVisualization(responses, visualization, canvasRef.current, _objectSpread2({}, extraOptions, {
      animation: animation,
      legendSets: legendSets
    }), undefined, undefined, analytics.isSingleValue(visualization.type) ? 'dhis' : 'highcharts' // output format
    );

    if (analytics.isSingleValue(visualization.type)) {
      onChartGenerated(visualizationConfig.visualization);
    } else {
      onChartGenerated(visualizationConfig.visualization.getSVGForExport({
        sourceHeight: 768,
        sourceWidth: 1024
      }));
    }
  }, [canvasRef, visualization, onChartGenerated, responses, extraOptions, legendSets]);
  React.useEffect(function () {
    renderVisualization(defaultAnimation);
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, [visualization, responses, extraOptions]);
  React.useEffect(function () {
    renderVisualization(0);
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, [renderCounter, style]);
  return React__default.createElement("div", {
    ref: canvasRef,
    style: style
  });
};

ChartPlugin.defaultProps = {
  visualization: {},
  filters: {},
  style: {},
  animation: 200,
  onChartGenerated: Function.prototype
};
ChartPlugin.propTypes = {
  extraOptions: PropTypes.object.isRequired,
  legendSets: PropTypes.arrayOf(PropTypes.object).isRequired,
  responses: PropTypes.arrayOf(PropTypes.object).isRequired,
  visualization: PropTypes.object.isRequired,
  animation: PropTypes.number,
  id: PropTypes.number,
  style: PropTypes.object,
  onChartGenerated: PropTypes.func
};

var PivotPlugin = function PivotPlugin(_ref) {
  var responses = _ref.responses,
      legendSets = _ref.legendSets,
      visualization = _ref.visualization,
      style = _ref.style,
      renderCounter = _ref.id,
      onToggleContextualMenu = _ref.onToggleContextualMenu;
  return React__default.createElement("div", {
    style: style
  }, React__default.createElement(analytics.PivotTable, {
    visualization: visualization,
    data: responses[0].response,
    legendSets: legendSets,
    renderCounter: renderCounter,
    onToggleContextualMenu: onToggleContextualMenu
  }));
};

PivotPlugin.defaultProps = {
  style: {}
};
PivotPlugin.propTypes = {
  legendSets: PropTypes.arrayOf(PropTypes.object).isRequired,
  responses: PropTypes.arrayOf(PropTypes.object).isRequired,
  visualization: PropTypes.object.isRequired,
  id: PropTypes.number,
  style: PropTypes.object,
  onToggleContextualMenu: PropTypes.func
};

var peId = 'pe';
var apiFetchAnalytics =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(d2, current, options) {
    var req, rawResponse;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            req = new d2.analytics.request().fromModel(current).withParameters(options).withIncludeNumDen(current.type === analytics.VIS_TYPE_PIVOT_TABLE);
            _context.next = 3;
            return d2.analytics.aggregate.get(req);

          case 3:
            rawResponse = _context.sent;
            return _context.abrupt("return", [new d2.analytics.response(rawResponse)]);

          case 5:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function apiFetchAnalytics(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();
var apiFetchAnalyticsForYearOverYear =
/*#__PURE__*/
function () {
  var _ref2 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2(d2, current, options) {
    var yearlySeriesReq, yearlySeriesRes, requests, yearlySeriesLabels, now, currentDay, currentMonth;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            yearlySeriesReq = new d2.analytics.request().addPeriodDimension(current.yearlySeries).withSkipData(true).withSkipMeta(false).withIncludeMetadataDetails(true);

            if (options.relativePeriodDate) {
              yearlySeriesReq = yearlySeriesReq.withRelativePeriodDate(options.relativePeriodDate);
            }

            _context2.next = 4;
            return d2.analytics.aggregate.fetch(yearlySeriesReq);

          case 4:
            yearlySeriesRes = _context2.sent;
            requests = [];
            yearlySeriesLabels = [];
            now = new Date();
            currentDay = ('' + now.getDate()).padStart(2, 0);
            currentMonth = ('' + (now.getMonth() + 1)).padStart(2, 0);
            yearlySeriesRes.metaData.dimensions[peId].forEach(function (period) {
              yearlySeriesLabels.push(yearlySeriesRes.metaData.items[period].name);
              var startDate = "".concat(period, "-").concat(currentMonth, "-").concat(currentDay);
              var req = new d2.analytics.request().fromModel(current).withParameters(options).withRelativePeriodDate(startDate);
              requests.push(d2.analytics.aggregate.get(req));
            });
            return _context2.abrupt("return", Promise.all(requests).then(function (responses) {
              return {
                responses: responses.map(function (res) {
                  return new d2.analytics.response(res);
                }),
                yearlySeriesLabels: yearlySeriesLabels
              };
            }));

          case 12:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function apiFetchAnalyticsForYearOverYear(_x4, _x5, _x6) {
    return _ref2.apply(this, arguments);
  };
}();

var computeGenericPeriodNames = function computeGenericPeriodNames(responses) {
  var xAxisRes = responses.reduce(function (out, res) {
    if (out.metaData) {
      if (res.metaData.dimensions.pe.length > out.metaData.dimensions.pe.length) {
        out = res;
      }
    } else {
      out = res;
    }

    return out;
  }, {});
  var metadata = xAxisRes.metaData;
  return metadata.dimensions.pe.reduce(function (genericPeriodNames, periodId) {
    var name = metadata.items[periodId].name; // until the day the backend will support this in the API:
    // trim off the trailing year in the period name
    // english names should all have the year at the end of the string

    genericPeriodNames.push(name.replace(/\s+\d{4}$/, ''));
    return genericPeriodNames;
  }, []);
};

var options = {
  baseLineLabel: {
    defaultValue: undefined,
    requestable: false,
    savable: true
  },
  baseLineValue: {
    defaultValue: undefined,
    requestable: false,
    savable: true
  },
  // colorSet:
  cumulativeValues: {
    defaultValue: false,
    requestable: false,
    savable: true
  },
  domainAxisLabel: {
    defaultValue: undefined,
    requestable: false,
    savable: true
  },
  hideEmptyRowItems: {
    defaultValue: 'NONE',
    requestable: false,
    savable: true
  },
  hideLegend: {
    defaultValue: false,
    requestable: false,
    savable: true
  },
  noSpaceBetweenColumns: {
    defaultValue: false,
    requestable: false,
    savable: true
  },
  percentStackedValues: {
    defaultValue: false,
    requestable: false,
    savable: true
  },
  rangeAxisDecimals: {
    defaultValue: undefined,
    requestable: false,
    savable: true
  },
  rangeAxisLabel: {
    defaultValue: undefined,
    requestable: false,
    savable: true
  },
  rangeAxisMaxValue: {
    defaultValue: undefined,
    requestable: false,
    savable: true
  },
  rangeAxisMinValue: {
    defaultValue: undefined,
    requestable: false,
    savable: true
  },
  rangeAxisSteps: {
    defaultValue: undefined,
    requestable: false,
    savable: true
  },
  regressionType: {
    defaultValue: 'NONE',
    requestable: false,
    savable: true
  },
  showData: {
    defaultValue: true,
    requestable: false,
    savable: true
  },
  targetLineLabel: {
    defaultValue: undefined,
    requestable: false,
    savable: true
  },
  targetLineValue: {
    defaultValue: undefined,
    requestable: false,
    savable: true
  },
  aggregationType: {
    defaultValue: 'DEFAULT',
    requestable: true,
    savable: true
  },
  completedOnly: {
    defaultValue: false,
    requestable: true,
    savable: true
  },
  hideSubtitle: {
    defaultValue: false,
    requestable: false,
    savable: true
  },
  hideTitle: {
    defaultValue: false,
    requestable: false,
    savable: true
  },
  sortOrder: {
    defaultValue: '0',
    requestable: false,
    savable: true
  },
  subtitle: {
    defaultValue: undefined,
    requestable: false,
    savable: true
  },
  title: {
    defaultValue: undefined,
    requestable: false,
    savable: true
  },
  // only for PT
  colTotals: {
    defaultValue: false,
    requestable: false,
    savable: true
  },
  colSubTotals: {
    defaultValue: false,
    requestable: false,
    savable: true
  },
  rowTotals: {
    defaultValue: false,
    requestable: false,
    savable: true
  },
  rowSubTotals: {
    defaultValue: false,
    requestable: false,
    savable: true
  },
  showDimensionLabels: {
    defaultValue: false,
    requestable: false,
    savable: true
  },
  hideEmptyColumns: {
    defaultValue: false,
    requestable: false,
    savable: true
  },
  hideEmptyRows: {
    defaultValue: false,
    requestable: false,
    savable: true
  },
  skipRounding: {
    defaultValue: false,
    requestable: true,
    savable: true
  },
  numberType: {
    defaultValue: 'VALUE',
    requestable: false,
    savable: true
  },
  showHierarchy: {
    defaultValue: false,
    requestable: true,
    savable: true
  },
  legendSet: {
    defaultValue: undefined,
    requestable: false,
    savable: true
  },
  legendDisplayStrategy: {
    defaultValue: 'FIXED',
    requestable: false,
    savable: true
  },
  legendDisplayStyle: {
    defaultValue: 'FILL',
    requestable: false,
    savable: true
  },
  displayDensity: {
    defaultValue: 'NORMAL',
    requestable: false,
    savable: true
  },
  fontSize: {
    defaultValue: 'NORMAL',
    requestable: false,
    savable: true
  },
  digitGroupSeparator: {
    defaultValue: 'SPACE',
    requestable: false,
    savable: true
  },
  approvalLevel: {
    defaultValue: undefined,
    requestable: true,
    savable: false
  },
  // these are stored in the AO under reportingParams
  reportingPeriod: {
    defaultValue: false,
    requestable: false,
    savable: true
  },
  organisationUnit: {
    defaultValue: false,
    requestable: false,
    savable: true
  },
  parentOrganisationUnit: {
    defaultValue: false,
    requestable: false,
    savable: true
  },
  // not exposed in UI
  grandParentOrganisationUnit: {
    defaultValue: false,
    requestable: false,
    savable: true
  },
  regression: {
    defaultValue: false,
    requestable: false,
    savable: true
  },
  cumulative: {
    defaultValue: false,
    requestable: false,
    savable: true
  },
  measureCriteria: {
    defaultValue: undefined,
    requestable: true,
    savable: true
  },
  topLimit: {
    defaultValue: '0',
    requestable: false,
    savable: true
  }
};
var getOptionsForRequest = function getOptionsForRequest() {
  return Object.entries(options).filter(function (entry) {
    return entry[1].requestable;
  } // entry = [option, props]
  );
};

var getRequestOptions = function getRequestOptions(visualization, filters) {
  var options = getOptionsForRequest().reduce(function (map, _ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        option = _ref2[0],
        props = _ref2[1];

    // only add parameter if value !== default
    if (visualization[option] !== undefined && visualization[option] !== props.defaultValue) {
      map[option] = visualization[option];
    }

    return map;
  }, {}); // interpretation filter

  if (filters.relativePeriodDate) {
    options.relativePeriodDate = filters.relativePeriodDate;
  } // global filters
  // userOrgUnit


  if (filters.userOrgUnit && filters.userOrgUnit.length) {
    var ouIds = filters.userOrgUnit.map(function (ouPath) {
      return ouPath.split('/').slice(-1)[0];
    });
    options.userOrgUnit = ouIds.join(';');
  }

  return options;
};

var fetchData =
/*#__PURE__*/
function () {
  var _ref2 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(_ref) {
    var visualization, filters, d2, forDashboard, options, extraOptions, _ref3, responses, yearlySeriesLabels;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            visualization = _ref.visualization, filters = _ref.filters, d2 = _ref.d2, forDashboard = _ref.forDashboard;
            options = getRequestOptions(visualization, filters);
            extraOptions = {
              dashboard: forDashboard,
              noData: {
                text: i18n.t('No data')
              }
            };

            if (!analytics.isYearOverYear(visualization.type)) {
              _context.next = 10;
              break;
            }

            _context.next = 6;
            return apiFetchAnalyticsForYearOverYear(d2, visualization, options);

          case 6:
            _ref3 = _context.sent;
            responses = _ref3.responses;
            yearlySeriesLabels = _ref3.yearlySeriesLabels;
            return _context.abrupt("return", {
              responses: responses,
              extraOptions: _objectSpread2({}, extraOptions, {
                yearlySeries: yearlySeriesLabels,
                xAxisLabels: computeGenericPeriodNames(responses)
              })
            });

          case 10:
            _context.next = 12;
            return apiFetchAnalytics(d2, visualization, options);

          case 12:
            _context.t0 = _context.sent;
            _context.t1 = extraOptions;
            return _context.abrupt("return", {
              responses: _context.t0,
              extraOptions: _context.t1
            });

          case 15:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function fetchData(_x) {
    return _ref2.apply(this, arguments);
  };
}();

var styles = {
  backdrop: {
    position: 'fixed',
    height: '100%',
    width: '100%',
    top: 0,
    left: 0,
    backgroundColor: 'transparent'
  }
};

var LEGEND_DISPLAY_STRATEGY_BY_DATA_ITEM = 'BY_DATA_ITEM';
var LEGEND_DISPLAY_STRATEGY_FIXED = 'FIXED';
var VisualizationPlugin = function VisualizationPlugin(_ref) {
  var d2 = _ref.d2,
      visualization = _ref.visualization,
      filters = _ref.filters,
      forDashboard = _ref.forDashboard,
      onError = _ref.onError,
      onLoadingComplete = _ref.onLoadingComplete,
      onResponsesReceived = _ref.onResponsesReceived,
      onDrill = _ref.onDrill,
      props = _objectWithoutProperties(_ref, ["d2", "visualization", "filters", "forDashboard", "onError", "onLoadingComplete", "onResponsesReceived", "onDrill"]);

  var engine = appRuntime.useDataEngine();

  var _useState = React.useState(null),
      _useState2 = _slicedToArray(_useState, 2),
      fetchResult = _useState2[0],
      setFetchResult = _useState2[1];

  var _useState3 = React.useState(undefined),
      _useState4 = _slicedToArray(_useState3, 2),
      contextualMenuRef = _useState4[0],
      setContextualMenuRef = _useState4[1];

  var _useState5 = React.useState({}),
      _useState6 = _slicedToArray(_useState5, 2),
      contextualMenuConfig = _useState6[0],
      setContextualMenuConfig = _useState6[1];

  var _useState7 = React.useState(null),
      _useState8 = _slicedToArray(_useState7, 2),
      ouLevels = _useState8[0],
      setOuLevels = _useState8[1];

  var onToggleContextualMenu = function onToggleContextualMenu(ref, data) {
    setContextualMenuRef(ref);
    setContextualMenuConfig(data);
  };

  var closeContextualMenu = function closeContextualMenu() {
    return setContextualMenuRef(undefined);
  };

  var onContextualMenuItemClick = function onContextualMenuItemClick(args) {
    closeContextualMenu();

    if (args.ou) {
      var ouItems = [{
        id: args.ou.id,
        name: args.ou.name
      }];

      if (args.ou.level) {
        var levelData = ouLevels.find(function (item) {
          return item.id === args.ou.level;
        });
        ouItems.push({
          id: levelData.id,
          name: levelData.name
        });
      }
    }

    onDrill(args);
  };

  var doFetchData = React.useCallback(
  /*#__PURE__*/
  _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee() {
    var result;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return fetchData({
              visualization: visualization,
              filters: filters,
              d2: d2,
              forDashboard: forDashboard
            });

          case 2:
            result = _context.sent;

            if (result.responses.length) {
              onResponsesReceived(result.responses);
            }

            return _context.abrupt("return", result);

          case 5:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  })), [d2, filters, forDashboard, onResponsesReceived, visualization]);
  var doFetchLegendSets = React.useCallback(
  /*#__PURE__*/
  function () {
    var _ref3 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee2(legendSetIds) {
      var response;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              if (legendSetIds.length) {
                _context2.next = 2;
                break;
              }

              return _context2.abrupt("return", []);

            case 2:
              _context2.next = 4;
              return apiFetchLegendSets(engine, legendSetIds);

            case 4:
              response = _context2.sent;

              if (!(response && response.legendSets)) {
                _context2.next = 7;
                break;
              }

              return _context2.abrupt("return", response.legendSets.legendSets);

            case 7:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));

    return function (_x) {
      return _ref3.apply(this, arguments);
    };
  }(), [engine]);
  var doFetchOuLevelsData = React.useCallback(
  /*#__PURE__*/
  _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee3() {
    var ouLevelsData;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return apiFetchOrganisationUnitLevels(engine);

          case 2:
            ouLevelsData = _context3.sent;
            return _context3.abrupt("return", ouLevelsData.orgUnitsLevels.organisationUnitLevels);

          case 4:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  })), [engine]);
  React.useEffect(function () {
    var doFetch =
    /*#__PURE__*/
    function () {
      var _ref5 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee4() {
        var orgUnitLevels;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.next = 2;
                return doFetchOuLevelsData();

              case 2:
                orgUnitLevels = _context4.sent;
                setOuLevels(orgUnitLevels);

              case 4:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4);
      }));

      return function doFetch() {
        return _ref5.apply(this, arguments);
      };
    }();

    doFetch().catch(function (error) {
      return onError(error);
    });
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, []);
  React.useEffect(function () {
    setFetchResult(null);

    var doFetchAll =
    /*#__PURE__*/
    function () {
      var _ref6 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee5() {
        var _ref7, responses, extraOptions, legendSetIds, dxIds, legendSets;

        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.next = 2;
                return doFetchData(visualization, filters, forDashboard);

              case 2:
                _ref7 = _context5.sent;
                responses = _ref7.responses;
                extraOptions = _ref7.extraOptions;
                legendSetIds = [];
                _context5.t0 = visualization.legendDisplayStrategy;
                _context5.next = _context5.t0 === LEGEND_DISPLAY_STRATEGY_FIXED ? 9 : _context5.t0 === LEGEND_DISPLAY_STRATEGY_BY_DATA_ITEM ? 11 : 14;
                break;

              case 9:
                if (visualization.legendSet && visualization.legendSet.id) {
                  legendSetIds.push(visualization.legendSet.id);
                }

                return _context5.abrupt("break", 14);

              case 11:
                // parse responses to extract legendSet ids from metaData
                // multiple responses are only for YOY which does not support legends
                // safe to use only the 1st
                // dx dimensions might not be present, the empty array covers that case
                dxIds = responses[0].metaData.dimensions.dx || [];
                dxIds.forEach(function (dxId) {
                  var legendSetId = responses[0].metaData.items[dxId].legendSet;

                  if (legendSetId) {
                    legendSetIds.push(legendSetId);
                  }
                });
                return _context5.abrupt("break", 14);

              case 14:
                _context5.next = 16;
                return doFetchLegendSets(legendSetIds);

              case 16:
                legendSets = _context5.sent;
                setFetchResult({
                  visualization: visualization,
                  legendSets: legendSets,
                  responses: responses,
                  extraOptions: extraOptions
                });
                onLoadingComplete();

              case 19:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5);
      }));

      return function doFetchAll() {
        return _ref6.apply(this, arguments);
      };
    }();

    doFetchAll().catch(function (error) {
      onError(error);
    });
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, [visualization, filters, forDashboard]);

  if (!fetchResult) {
    return null;
  }

  var contextualMenuRect = contextualMenuRef && contextualMenuRef.current && contextualMenuRef.current.getBoundingClientRect();
  var virtualContextualMenuElement = contextualMenuRect ? {
    getBoundingClientRect: function getBoundingClientRect() {
      return contextualMenuRect;
    }
  } : null;
  return React__default.createElement(React__default.Fragment, null, !fetchResult.visualization.type || fetchResult.visualization.type === analytics.VIS_TYPE_PIVOT_TABLE ? React__default.createElement(PivotPlugin, _extends({
    visualization: fetchResult.visualization,
    responses: fetchResult.responses,
    legendSets: fetchResult.legendSets,
    onToggleContextualMenu: onToggleContextualMenu
  }, props)) : React__default.createElement(ChartPlugin, _extends({
    visualization: fetchResult.visualization,
    responses: fetchResult.responses,
    extraOptions: fetchResult.extraOptions,
    legendSets: fetchResult.legendSets
  }, props)), contextualMenuRect && reactDom.createPortal(React__default.createElement("div", {
    onClick: closeContextualMenu,
    style: styles.backdrop
  }, React__default.createElement(uiCore.Popper, {
    reference: virtualContextualMenuElement,
    placement: "right"
  }, React__default.createElement(ContextualMenu, {
    config: contextualMenuConfig,
    ouLevels: ouLevels,
    onClick: onContextualMenuItemClick
  }))), document.body));
};
VisualizationPlugin.defaultProps = {
  filters: {},
  forDashboard: false,
  onDrill: Function.prototype,
  onError: Function.prototype,
  onLoadingComplete: Function.prototype,
  onResponsesReceived: Function.prototype,
  visualization: {}
};
VisualizationPlugin.propTypes = {
  d2: PropTypes.object.isRequired,
  visualization: PropTypes.object.isRequired,
  filters: PropTypes.object,
  forDashboard: PropTypes.bool,
  onDrill: PropTypes.func,
  onError: PropTypes.func,
  onLoadingComplete: PropTypes.func,
  onResponsesReceived: PropTypes.func
};

module.exports = VisualizationPlugin;
//# sourceMappingURL=lib.js.map
