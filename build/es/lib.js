/* eslint-disable */
import React, { Fragment, Component, useState, useEffect } from 'react';
import { createVisualization, isSingleValue, isYearOverYear, PivotTable, VIS_TYPE_PIVOT_TABLE } from '@dhis2/analytics';
import PropTypes from 'prop-types';
import isEqual from 'lodash-es/isEqual';
import i18n from '@dhis2/d2-i18n';
import 'lodash-es/pick';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
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

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

function _possibleConstructorReturn(self, call) {
  if (call && (typeof call === "object" || typeof call === "function")) {
    return call;
  }

  return _assertThisInitialized(self);
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

var styles = function styles(theme) {
  return {
    progress: {
      margin: theme.spacing.unit * 2,
      maxWidth: 200,
      textAlign: 'center',
      alignSelf: 'center'
    },
    outer: {
      display: 'flex',
      justifyContent: 'center',
      height: '100%'
    }
  };
};

function CircularIndeterminate(props) {
  var classes = props.classes;
  return React.createElement("div", {
    className: classes.outer
  }, React.createElement(CircularProgress, {
    className: classes.progress
  }));
}

CircularIndeterminate.propTypes = {
  classes: PropTypes.object.isRequired
};
var LoadingMask = withStyles(styles)(CircularIndeterminate);

var ChartPlugin =
/*#__PURE__*/
function (_Component) {
  _inherits(ChartPlugin, _Component);

  function ChartPlugin(_props) {
    var _this;

    _classCallCheck(this, ChartPlugin);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(ChartPlugin).call(this, _props));

    _defineProperty(_assertThisInitialized(_this), "getRequestOptions", function (visualization, filters) {
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
    });

    _defineProperty(_assertThisInitialized(_this), "renderChart", function _callee() {
      var _this$props, visualization, filters, forDashboard, onResponsesReceived, onChartGenerated, onError, options, extraOptions, responses, yearlySeriesLabels, _ref3;

      return regeneratorRuntime.async(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _this$props = _this.props, visualization = _this$props.config, filters = _this$props.filters, forDashboard = _this$props.forDashboard, onResponsesReceived = _this$props.onResponsesReceived, onChartGenerated = _this$props.onChartGenerated, onError = _this$props.onError;
              _context.prev = 1;
              options = _this.getRequestOptions(visualization, filters);
              extraOptions = {
                dashboard: forDashboard,
                noData: {
                  text: i18n.t('No data')
                }
              };
              responses = [];

              if (!isYearOverYear(visualization.type)) {
                _context.next = 16;
                break;
              }

              yearlySeriesLabels = [];
              _context.next = 9;
              return regeneratorRuntime.awrap(apiFetchAnalyticsForYearOverYear(_this.props.d2, visualization, options));

            case 9:
              _ref3 = _context.sent;
              responses = _ref3.responses;
              yearlySeriesLabels = _ref3.yearlySeriesLabels;
              extraOptions.yearlySeries = yearlySeriesLabels;
              extraOptions.xAxisLabels = computeGenericPeriodNames(responses);
              _context.next = 19;
              break;

            case 16:
              _context.next = 18;
              return regeneratorRuntime.awrap(apiFetchAnalytics(_this.props.d2, visualization, options));

            case 18:
              responses = _context.sent;

            case 19:
              if (responses.length) {
                onResponsesReceived(responses);
              }

              _this.recreateVisualization = function () {
                var animation = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _this.props.animation;
                var visualizationConfig = createVisualization(responses, visualization, _this.canvasRef.current, _objectSpread2({}, extraOptions, {
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
              };

              _this.recreateVisualization();

              _this.setState({
                isLoading: false
              });

              _context.next = 28;
              break;

            case 25:
              _context.prev = 25;
              _context.t0 = _context["catch"](1);
              onError(_context.t0);

            case 28:
            case "end":
              return _context.stop();
          }
        }
      }, null, null, [[1, 25]]);
    });

    _this.canvasRef = React.createRef();
    _this.recreateVisualization = Function.prototype;
    _this.state = {
      isLoading: true
    };
    return _this;
  }

  _createClass(ChartPlugin, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.renderChart();
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      if (!isEqual(this.props.config, prevProps.config)) {
        this.renderChart();
        return;
      }

      if (!isEqual(this.props.filters, prevProps.filters)) {
        this.renderChart();
        return;
      } // id set by DV app, style works in dashboards


      if (this.props.id !== prevProps.id || !isEqual(this.props.style, prevProps.style)) {
        this.recreateVisualization(0); // disable animation

        return;
      }
    }
  }, {
    key: "render",
    value: function render() {
      return React.createElement(Fragment, null, this.state.isLoading ? React.createElement(LoadingMask, null) : null, React.createElement("div", {
        ref: this.canvasRef,
        style: this.props.style
      }));
    }
  }]);

  return ChartPlugin;
}(Component);

ChartPlugin.defaultProps = {
  config: {},
  filters: {},
  forDashboard: false,
  style: {},
  animation: 200,
  onError: Function.prototype,
  onChartGenerated: Function.prototype,
  onResponsesReceived: Function.prototype
};
ChartPlugin.propTypes = {
  config: PropTypes.object.isRequired,
  d2: PropTypes.object.isRequired,
  onError: PropTypes.func.isRequired,
  animation: PropTypes.number,
  filters: PropTypes.object,
  forDashboard: PropTypes.bool,
  id: PropTypes.number,
  style: PropTypes.object,
  onChartGenerated: PropTypes.func,
  onResponsesReceived: PropTypes.func
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

var PivotPlugin = function PivotPlugin(_ref3) {
  var config = _ref3.config,
      filters = _ref3.filters,
      style = _ref3.style,
      onError = _ref3.onError,
      onResponsesReceived = _ref3.onResponsesReceived,
      d2 = _ref3.d2;

  var _useState = useState(true),
      _useState2 = _slicedToArray(_useState, 2),
      isLoading = _useState2[0],
      setIsLoading = _useState2[1];

  var _useState3 = useState(null),
      _useState4 = _slicedToArray(_useState3, 2),
      visualization = _useState4[0],
      setVisualization = _useState4[1];

  var _useState5 = useState(null),
      _useState6 = _slicedToArray(_useState5, 2),
      data = _useState6[0],
      setData = _useState6[1];

  useEffect(function () {
    setIsLoading(true);
    var options = getRequestOptions(config, filters);
    apiFetchAnalytics(d2, config, options).then(function (responses) {
      if (!responses.length) {
        return;
      }

      if (onResponsesReceived) {
        onResponsesReceived(responses);
      }

      setVisualization(config);
      setData(responses[0].response);
      setIsLoading(false);
    }).catch(function (error) {
      onError(error);
    }); // TODO: cancellation
  }, [config, filters, onResponsesReceived, onError, d2]);
  return React.createElement("div", {
    style: _objectSpread2({
      width: '100%',
      height: '100%'
    }, style)
  }, isLoading ? React.createElement("div", {
    style: {
      placeSelf: 'center',
      flex: '1 0 0%'
    }
  }, React.createElement(LoadingMask, null)) : React.createElement(PivotTable, {
    visualization: visualization,
    data: data
  }));
};

PivotPlugin.defaultProps = {
  config: {},
  filters: {},
  style: {},
  onError: Function.prototype,
  onResponsesReceived: Function.prototype
};
PivotPlugin.propTypes = {
  config: PropTypes.object.isRequired,
  d2: PropTypes.object.isRequired,
  onError: PropTypes.func.isRequired,
  filters: PropTypes.object,
  style: PropTypes.object,
  onResponsesReceived: PropTypes.func
};

var VisualizationPlugin = function VisualizationPlugin(props) {
  if (!props.config.type || props.config.type === VIS_TYPE_PIVOT_TABLE) {
    return React.createElement(PivotPlugin, props);
  } else {
    return React.createElement(ChartPlugin, props);
  }
};

export default VisualizationPlugin;
//# sourceMappingURL=lib.js.map
