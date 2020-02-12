/* eslint-disable */
import React, { useRef, useCallback, useEffect, useState } from 'react';
import { createVisualization, isSingleValue, isYearOverYear, PivotTable, VIS_TYPE_PIVOT_TABLE } from '@dhis2/analytics';
import PropTypes from 'prop-types';
import i18n from '@dhis2/d2-i18n';
import 'lodash-es/pick';

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

var peId = 'pe';
var apiFetchAnalytics = function apiFetchAnalytics(d2, current, options) {
  var req, rawResponse;
  return regeneratorRuntime.async(function apiFetchAnalytics$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          req = new d2.analytics.request().fromModel(current).withParameters(options);
          _context.next = 3;
          return regeneratorRuntime.awrap(d2.analytics.aggregate.get(req));

        case 3:
          rawResponse = _context.sent;
          return _context.abrupt("return", [new d2.analytics.response(rawResponse)]);

        case 5:
        case "end":
          return _context.stop();
      }
    }
  });
};
var apiFetchAnalyticsForYearOverYear = function apiFetchAnalyticsForYearOverYear(d2, current, options) {
  var yearlySeriesReq, yearlySeriesRes, requests, yearlySeriesLabels, now, currentDay, currentMonth;
  return regeneratorRuntime.async(function apiFetchAnalyticsForYearOverYear$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          yearlySeriesReq = new d2.analytics.request().addPeriodDimension(current.yearlySeries).withSkipData(true).withSkipMeta(false).withIncludeMetadataDetails(true);

          if (options.relativePeriodDate) {
            yearlySeriesReq = yearlySeriesReq.withRelativePeriodDate(options.relativePeriodDate);
          }

          _context2.next = 4;
          return regeneratorRuntime.awrap(d2.analytics.aggregate.fetch(yearlySeriesReq));

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
  });
};

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
    defaultValue: '0',
    requestable: false
  },
  subtitle: {
    defaultValue: undefined,
    requestable: false
  },
  title: {
    defaultValue: undefined,
    requestable: false
  },
  // only for PT XXX
  colTotals: {
    defaultValue: false,
    requestable: false
  },
  colSubTotals: {
    defaultValue: false,
    requestable: false
  },
  rowTotals: {
    defaultValue: false,
    requestable: false
  },
  rowSubTotals: {
    defaultValue: false,
    requestable: false
  },
  showDimensionLabels: {
    defaultValue: false,
    requestable: false
  },
  hideEmptyColumns: {
    defaultValue: false,
    requestable: true
  },
  hideEmptyRows: {
    defaultValue: false,
    requestable: true
  },
  skipRounding: {
    defaultValue: false,
    requestable: true
  },
  numberType: {
    defaultValue: 'VALUE',
    requestable: false
  },
  showHierarchy: {
    defaultValue: false,
    requestable: true
  },
  legendSet: {
    defaultValue: 'NONE',
    requestable: false
  },
  // XXX can be 'BY_DATA_ITEM'
  legendDisplayStyle: {
    defaultValue: 'FILL',
    requestable: false
  },
  displayDensity: {
    defaultValue: 'NORMAL',
    requestable: false
  },
  fontSize: {
    defaultValue: 'NORMAL',
    requestable: false
  },
  digitGroupSeparator: {
    defaultValue: 'SPACE',
    requestable: false
  },
  // XXX these are stored in the AO under reportParams
  paramReportingPeriod: {
    defaultValue: false,
    requestable: false
  },
  paramOrganisationUnit: {
    defaultValue: false,
    requestable: false
  },
  paramParentOrganisationUnit: {
    defaultValue: false,
    requestable: false
  },
  // XXX not in UI
  paramGrandParentOrganisationUnit: {
    defaultValue: false,
    requestable: false
  },
  regression: {
    defaultValue: false,
    requestable: false
  },
  cumulative: {
    defaultValue: false,
    requestable: false
  },
  measureCriteria: {
    defaultValue: undefined,
    requestable: true
  },
  topLimit: {
    defaultValue: '0',
    requestable: false
  }
};
var getOptionsForRequest = function getOptionsForRequest() {
  return Object.entries(options).filter(function (entry) {
    return entry[1].requestable;
  } // entry = [option, props]
  );
};

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

var fetchData = function fetchData(_ref3) {
  var visualization, filters, d2, forDashboard, options, extraOptions, _ref4, _responses, yearlySeriesLabels, responses;

  return regeneratorRuntime.async(function fetchData$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          visualization = _ref3.visualization, filters = _ref3.filters, d2 = _ref3.d2, forDashboard = _ref3.forDashboard;
          options = getRequestOptions(visualization, filters);
          extraOptions = {
            dashboard: forDashboard,
            noData: {
              text: i18n.t('No data')
            }
          };

          if (!isYearOverYear(visualization.type)) {
            _context.next = 10;
            break;
          }

          _context.next = 6;
          return regeneratorRuntime.awrap(apiFetchAnalyticsForYearOverYear(d2, visualization, options));

        case 6:
          _ref4 = _context.sent;
          _responses = _ref4.responses;
          yearlySeriesLabels = _ref4.yearlySeriesLabels;
          return _context.abrupt("return", {
            responses: _responses,
            extraOptions: _objectSpread2({}, extraOptions, {
              yearlySeries: yearlySeriesLabels,
              xAxisLabels: computeGenericPeriodNames(_responses)
            })
          });

        case 10:
          _context.next = 12;
          return regeneratorRuntime.awrap(apiFetchAnalytics(d2, visualization, options));

        case 12:
          responses = _context.sent;
          return _context.abrupt("return", {
            responses: responses,
            extraOptions: extraOptions
          });

        case 14:
        case "end":
          return _context.stop();
      }
    }
  });
};

var ChartPlugin = function ChartPlugin(_ref5) {
  var visualization = _ref5.visualization,
      filters = _ref5.filters,
      id = _ref5.id,
      style = _ref5.style,
      d2 = _ref5.d2,
      forDashboard = _ref5.forDashboard,
      onResponsesReceived = _ref5.onResponsesReceived,
      onChartGenerated = _ref5.onChartGenerated,
      onError = _ref5.onError,
      onLoadingComplete = _ref5.onLoadingComplete,
      defaultAnimation = _ref5.animation;
  var canvasRef = useRef(undefined);
  var fetchResult = useRef(undefined);
  var renderVisualization = useCallback(function (animation) {
    if (!fetchResult.current) return;
    var _fetchResult$current = fetchResult.current,
        responses = _fetchResult$current.responses,
        extraOptions = _fetchResult$current.extraOptions;
    var visualizationConfig = createVisualization(responses, visualization, canvasRef.current, _objectSpread2({}, extraOptions, {
      animation: animation
    }), undefined, undefined, isSingleValue(visualization.type) ? 'dhis' : 'highcharts' // output format
    );

    if (isSingleValue(visualization.type)) {
      onChartGenerated(visualizationConfig.visualization);
    } else {
      onChartGenerated(visualizationConfig.visualization.getSVGForExport({
        sourceHeight: 768,
        sourceWidth: 1024
      }));
    }
  }, [canvasRef, visualization, onChartGenerated]);
  var doFetch = useCallback(function (visualization, filters, forDashboard) {
    fetchData({
      visualization: visualization,
      filters: filters,
      d2: d2,
      forDashboard: forDashboard
    }).then(function (result) {
      if (result.responses.length) {
        onResponsesReceived(result.responses);
      }

      fetchResult.current = result;
      renderVisualization(defaultAnimation);
      onLoadingComplete();
    }).catch(function (error) {
      onError(error);
    });
  }, [d2, onResponsesReceived, onLoadingComplete, onError, renderVisualization, defaultAnimation]);
  useEffect(function () {
    doFetch(visualization, filters, forDashboard);
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, [visualization, filters, forDashboard]);
  useEffect(function () {
    renderVisualization(0);
  }, [id, style]);
  /* eslint-disable-line react-hooks/exhaustive-deps */

  return React.createElement("div", {
    ref: canvasRef,
    style: style
  });
};

ChartPlugin.defaultProps = {
  visualization: {},
  filters: {},
  forDashboard: false,
  style: {},
  animation: 200,
  onError: Function.prototype,
  onChartGenerated: Function.prototype,
  onLoadingComplete: Function.prototype,
  onResponsesReceived: Function.prototype
};
ChartPlugin.propTypes = {
  d2: PropTypes.object.isRequired,
  visualization: PropTypes.object.isRequired,
  onError: PropTypes.func.isRequired,
  animation: PropTypes.number,
  filters: PropTypes.object,
  forDashboard: PropTypes.bool,
  id: PropTypes.number,
  style: PropTypes.object,
  onChartGenerated: PropTypes.func,
  onLoadingComplete: PropTypes.func,
  onResponsesReceived: PropTypes.func
};

var getRequestOptions$1 = function getRequestOptions(visualization, filters) {
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

var PivotPlugin = function PivotPlugin(_ref3) {
  var visualization = _ref3.visualization,
      filters = _ref3.filters,
      style = _ref3.style,
      onError = _ref3.onError,
      onResponsesReceived = _ref3.onResponsesReceived,
      d2 = _ref3.d2,
      onLoadingComplete = _ref3.onLoadingComplete;

  var _useState = useState(null),
      _useState2 = _slicedToArray(_useState, 2),
      data = _useState2[0],
      setData = _useState2[1];

  useEffect(function () {
    var options = getRequestOptions$1(visualization, filters);
    apiFetchAnalytics(d2, visualization, options).then(function (responses) {
      if (!responses.length) {
        return;
      }

      if (onResponsesReceived) {
        onResponsesReceived(responses);
      }

      setData(responses[0].response);
      onLoadingComplete();
    }).catch(function (error) {
      onError(error);
    }); // TODO: cancellation
  }, [visualization, filters, onResponsesReceived, onError, d2, onLoadingComplete]);
  return React.createElement("div", {
    style: _objectSpread2({
      width: '100%',
      height: '100%'
    }, style)
  }, !data ? null : React.createElement(PivotTable, {
    visualization: visualization,
    data: data
  }));
};

PivotPlugin.defaultProps = {
  visualization: {},
  filters: {},
  style: {},
  onError: Function.prototype,
  onLoadingComplete: Function.prototype,
  onResponsesReceived: Function.prototype
};
PivotPlugin.propTypes = {
  d2: PropTypes.object.isRequired,
  visualization: PropTypes.object.isRequired,
  onError: PropTypes.func.isRequired,
  filters: PropTypes.object,
  style: PropTypes.object,
  onLoadingComplete: PropTypes.func,
  onResponsesReceived: PropTypes.func
};

var VisualizationPlugin = function VisualizationPlugin(props) {
  if (!props.visualization.type || props.visualization.type === VIS_TYPE_PIVOT_TABLE) {
    return React.createElement(PivotPlugin, props);
  } else {
    return React.createElement(ChartPlugin, props);
  }
};

export default VisualizationPlugin;
//# sourceMappingURL=lib.js.map
