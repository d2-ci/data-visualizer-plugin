/* eslint-disable */
'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = require('react');
var React__default = _interopDefault(React);
var analytics = require('@dhis2/analytics');
var PropTypes = _interopDefault(require('prop-types'));
var isEqual = _interopDefault(require('lodash-es/isEqual'));
var i18n = _interopDefault(require('@dhis2/d2-i18n'));
require('lodash-es/pick');
var styles$1 = require('@material-ui/core/styles');
var CircularProgress = _interopDefault(require('@material-ui/core/CircularProgress'));

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

var BASE_FIELD_NAME = 'name';
var BASE_FIELD_TYPE = 'type';
var BASE_FIELD_YEARLY_SERIES = 'yearlySeries';

var getFieldObject = function getFieldObject(name) {
  var props = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return _objectSpread2(_defineProperty({}, BASE_FIELD_NAME, name), props);
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
  }), getFieldObject(BASE_FIELD_YEARLY_SERIES)],
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
  }), getFieldObject(BASE_FIELD_TYPE, {
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

var extractName = function extractName(propObj) {
  return propObj[BASE_FIELD_NAME];
};
var markExcluded = function markExcluded(fieldObj) {
  return fieldObj.excluded === true ? _objectSpread2({}, fieldObj, _defineProperty({}, BASE_FIELD_NAME, "!".concat(fieldObj[BASE_FIELD_NAME]))) : fieldObj;
};
var moveExcludedToEnd = function moveExcludedToEnd(acc, current, curIndex, array) {
  !acc && (acc = array.slice());
  current.charAt(0) === '!' && acc.push(acc.shift());
  return acc;
}; // getters

var getAllFieldObjectsByType = function getAllFieldObjectsByType(type) {
  return Object.entries(fieldsByType).reduce(function (fields, _ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        key = _ref2[0],
        value = _ref2[1];

    return key.includes(type) ? fields.concat(value) : fields;
  }, []);
};

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
var extendFields = function extendFields(field) {
  return "".concat(field).concat(nestedFields[field] ? "[".concat(nestedFields[field], "]") : '');
};

var getFieldsStringByType = function getFieldsStringByType(type) {
  return getAllFieldObjectsByType(type).map(markExcluded).map(extractName).sort().reduce(moveExcludedToEnd, null).map(extendFields).join(',');
};

var apiFetchVisualization = function apiFetchVisualization(d2, type, id) {
  return d2.models[type].get(id, {
    fields: getFieldsStringByType(type)
  });
};

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
var getOptionsForRequest = function getOptionsForRequest() {
  return Object.entries(options).filter(function (_ref3) {
    var _ref4 = _slicedToArray(_ref3, 2),
        option = _ref4[0],
        props = _ref4[1];

    return props.requestable;
  });
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
  return React__default.createElement("div", {
    className: classes.outer
  }, React__default.createElement(CircularProgress, {
    className: classes.progress
  }));
}

CircularIndeterminate.propTypes = {
  classes: PropTypes.object.isRequired
};
var LoadingMask = styles$1.withStyles(styles)(CircularIndeterminate);

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

    _defineProperty(_assertThisInitialized(_this), "getConfigById", function (id) {
      return apiFetchVisualization(_this.props.d2, 'chart', id);
    });

    _defineProperty(_assertThisInitialized(_this), "renderChart", function _callee() {
      var _this$props, config, filters, forDashboard, onResponsesReceived, onChartGenerated, onError, visualization, options, extraOptions, responses, yearlySeriesLabels, _ref3;

      return regeneratorRuntime.async(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _this$props = _this.props, config = _this$props.config, filters = _this$props.filters, forDashboard = _this$props.forDashboard, onResponsesReceived = _this$props.onResponsesReceived, onChartGenerated = _this$props.onChartGenerated, onError = _this$props.onError;
              _context.prev = 1;

              if (!(Object.keys(config).length === 1 && config.id)) {
                _context.next = 8;
                break;
              }

              _context.next = 5;
              return regeneratorRuntime.awrap(_this.getConfigById(config.id));

            case 5:
              _context.t0 = _context.sent;
              _context.next = 9;
              break;

            case 8:
              _context.t0 = config;

            case 9:
              visualization = _context.t0;
              options = _this.getRequestOptions(visualization, filters);
              extraOptions = {
                dashboard: forDashboard,
                noData: {
                  text: i18n.t('No data')
                }
              };
              responses = [];

              if (!analytics.isYearOverYear(visualization.type)) {
                _context.next = 24;
                break;
              }

              yearlySeriesLabels = [];
              _context.next = 17;
              return regeneratorRuntime.awrap(apiFetchAnalyticsForYearOverYear(_this.props.d2, visualization, options));

            case 17:
              _ref3 = _context.sent;
              responses = _ref3.responses;
              yearlySeriesLabels = _ref3.yearlySeriesLabels;
              extraOptions[BASE_FIELD_YEARLY_SERIES] = yearlySeriesLabels;
              extraOptions.xAxisLabels = computeGenericPeriodNames(responses);
              _context.next = 27;
              break;

            case 24:
              _context.next = 26;
              return regeneratorRuntime.awrap(apiFetchAnalytics(_this.props.d2, visualization, options));

            case 26:
              responses = _context.sent;

            case 27:
              if (responses.length) {
                onResponsesReceived(responses);
              }

              _this.recreateVisualization = function (animation) {
                var visualizationConfig = analytics.createVisualization(responses, visualization, _this.canvasRef.current, _objectSpread2({}, extraOptions, {
                  animation: animation
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
              };

              _this.recreateVisualization();

              _this.setState({
                isLoading: false
              });

              _context.next = 36;
              break;

            case 33:
              _context.prev = 33;
              _context.t1 = _context["catch"](1);
              onError(_context.t1);

            case 36:
            case "end":
              return _context.stop();
          }
        }
      }, null, null, [[1, 33]]);
    });

    _this.canvasRef = React__default.createRef();
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
      return React__default.createElement(React.Fragment, null, this.state.isLoading ? React__default.createElement(LoadingMask, null) : null, React__default.createElement("div", {
        ref: this.canvasRef,
        style: this.props.style
      }));
    }
  }]);

  return ChartPlugin;
}(React.Component);

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

var PivotPlugin =
/*#__PURE__*/
function (_Component) {
  _inherits(PivotPlugin, _Component);

  function PivotPlugin(_props) {
    var _this;

    _classCallCheck(this, PivotPlugin);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(PivotPlugin).call(this, _props));

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

    _defineProperty(_assertThisInitialized(_this), "getConfigById", function (id) {
      return apiFetchVisualization(_this.props.d2, 'chart', id);
    });

    _defineProperty(_assertThisInitialized(_this), "renderChart", function _callee() {
      var _this$props, config, filters, forDashboard, onResponsesReceived, onChartGenerated, onError, visualization, options, extraOptions, responses, yearlySeriesLabels, _ref3;

      return regeneratorRuntime.async(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _this$props = _this.props, config = _this$props.config, filters = _this$props.filters, forDashboard = _this$props.forDashboard, onResponsesReceived = _this$props.onResponsesReceived, onChartGenerated = _this$props.onChartGenerated, onError = _this$props.onError;
              _context.prev = 1;

              if (!(Object.keys(config).length === 1 && config.id)) {
                _context.next = 8;
                break;
              }

              _context.next = 5;
              return regeneratorRuntime.awrap(_this.getConfigById(config.id));

            case 5:
              _context.t0 = _context.sent;
              _context.next = 9;
              break;

            case 8:
              _context.t0 = config;

            case 9:
              visualization = _context.t0;
              options = _this.getRequestOptions(visualization, filters);
              extraOptions = {
                dashboard: forDashboard,
                noData: {
                  text: i18n.t('No data')
                }
              };
              responses = [];

              if (!analytics.isYearOverYear(visualization.type)) {
                _context.next = 24;
                break;
              }

              yearlySeriesLabels = [];
              _context.next = 17;
              return regeneratorRuntime.awrap(apiFetchAnalyticsForYearOverYear(_this.props.d2, visualization, options));

            case 17:
              _ref3 = _context.sent;
              responses = _ref3.responses;
              yearlySeriesLabels = _ref3.yearlySeriesLabels;
              extraOptions[BASE_FIELD_YEARLY_SERIES] = yearlySeriesLabels;
              extraOptions.xAxisLabels = computeGenericPeriodNames(responses);
              _context.next = 27;
              break;

            case 24:
              _context.next = 26;
              return regeneratorRuntime.awrap(apiFetchAnalytics(_this.props.d2, visualization, options));

            case 26:
              responses = _context.sent;

            case 27:
              if (responses.length) {
                onResponsesReceived(responses);
              }

              _this.recreateVisualization = function (animation) {
                var visualizationConfig = analytics.createVisualization(responses, visualization, _this.canvasRef.current, _objectSpread2({}, extraOptions, {
                  animation: animation
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
              };

              _this.recreateVisualization();

              _this.setState({
                isLoading: false
              });

              _context.next = 36;
              break;

            case 33:
              _context.prev = 33;
              _context.t1 = _context["catch"](1);
              onError(_context.t1);

            case 36:
            case "end":
              return _context.stop();
          }
        }
      }, null, null, [[1, 33]]);
    });

    _this.canvasRef = React__default.createRef();
    _this.recreateVisualization = Function.prototype;
    _this.state = {
      isLoading: true
    };
    return _this;
  }

  _createClass(PivotPlugin, [{
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
      return React__default.createElement(React.Fragment, null, this.state.isLoading ? React__default.createElement(LoadingMask, null) : null, React__default.createElement("div", {
        ref: this.canvasRef,
        style: this.props.style
      }));
    }
  }]);

  return PivotPlugin;
}(React.Component);

PivotPlugin.defaultProps = {
  config: {},
  filters: {},
  forDashboard: false,
  style: {},
  animation: 200,
  onError: Function.prototype,
  onChartGenerated: Function.prototype,
  onResponsesReceived: Function.prototype
};
PivotPlugin.propTypes = {
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

var VisualizationPlugin = function VisualizationPlugin(props) {
  if (!props.config.type || props.config.type === analytics.VIS_TYPE_PIVOT_TABLE) {
    return React__default.createElement(PivotPlugin, props);
  } else {
    return React__default.createElement(ChartPlugin, props);
  }
};

module.exports = VisualizationPlugin;
//# sourceMappingURL=lib.js.map
