/* eslint-disable */
'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = require('react');
var React__default = _interopDefault(React);
var analytics = require('@dhis2/analytics');
var appRuntime = require('@dhis2/app-runtime');
var PropTypes = _interopDefault(require('prop-types'));
require('lodash-es/pick');

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

const legendSetsQuery = {
  legendSets: {
    resource: 'legendSets',
    params: ({
      ids
    }) => ({
      fields: 'id,legends[id,displayName~rename(name),startValue,endValue,color]',
      filter: "id:in:[".concat(ids.join(','), "]")
    })
  }
};
const apiFetchLegendSets = (dataEngine, ids) => dataEngine.query(legendSetsQuery, {
  variables: {
    ids
  }
});

const ChartPlugin = ({
  visualization,
  responses,
  extraOptions,
  legendSets,
  id: renderCounter,
  style,
  onChartGenerated,
  animation: defaultAnimation
}) => {
  const canvasRef = React.useRef(undefined);
  const renderVisualization = React.useCallback(animation => {
    const visualizationConfig = analytics.createVisualization(responses, visualization, canvasRef.current, _objectSpread2(_objectSpread2({}, extraOptions), {}, {
      animation,
      legendSets
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
  React.useEffect(() => {
    renderVisualization(defaultAnimation);
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, [visualization, responses, extraOptions]);
  React.useEffect(() => {
    renderVisualization(0);
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, [renderCounter, style]);
  return /*#__PURE__*/React__default.createElement("div", {
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

const PivotPlugin = ({
  responses,
  legendSets,
  visualization,
  style,
  id: renderCounter
}) => {
  return /*#__PURE__*/React__default.createElement("div", {
    style: style
  }, /*#__PURE__*/React__default.createElement(analytics.PivotTable, {
    visualization: visualization,
    data: responses[0].response,
    legendSets: legendSets,
    renderCounter: renderCounter
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
  style: PropTypes.object
};

const peId = 'pe';
const apiFetchAnalytics = async (d2, current, options) => {
  const req = new d2.analytics.request().fromModel(current).withParameters(options).withIncludeNumDen(current.type === analytics.VIS_TYPE_PIVOT_TABLE);
  const rawResponse = await d2.analytics.aggregate.get(req);
  return [new d2.analytics.response(rawResponse)];
};
const apiFetchAnalyticsForYearOverYear = async (d2, current, options) => {
  let yearlySeriesReq = new d2.analytics.request().addPeriodDimension(current.yearlySeries).withSkipData(true).withSkipMeta(false).withIncludeMetadataDetails(true);

  if (options.relativePeriodDate) {
    yearlySeriesReq = yearlySeriesReq.withRelativePeriodDate(options.relativePeriodDate);
  }

  const yearlySeriesRes = await d2.analytics.aggregate.fetch(yearlySeriesReq);
  const requests = [];
  const yearlySeriesLabels = [];
  const now = new Date();
  const currentDay = ('' + now.getDate()).padStart(2, 0);
  const currentMonth = ('' + (now.getMonth() + 1)).padStart(2, 0);
  yearlySeriesRes.metaData.dimensions[peId].forEach(period => {
    yearlySeriesLabels.push(yearlySeriesRes.metaData.items[period].name);
    const startDate = "".concat(period, "-").concat(currentMonth, "-").concat(currentDay);
    const req = new d2.analytics.request().fromModel(current).withParameters(options).withRelativePeriodDate(startDate);
    requests.push(d2.analytics.aggregate.get(req));
  });
  return Promise.all(requests).then(responses => ({
    responses: responses.map(res => new d2.analytics.response(res)),
    yearlySeriesLabels
  }));
};

const computeGenericPeriodNames = responses => {
  const xAxisRes = responses.reduce((out, res) => {
    if (out.metaData) {
      if (res.metaData.dimensions.pe.length > out.metaData.dimensions.pe.length) {
        out = res;
      }
    } else {
      out = res;
    }

    return out;
  }, {});
  const metadata = xAxisRes.metaData;
  return metadata.dimensions.pe.reduce((genericPeriodNames, periodId) => {
    const name = metadata.items[periodId].name; // until the day the backend will support this in the API:
    // trim off the trailing year in the period name
    // english names should all have the year at the end of the string

    genericPeriodNames.push(name.replace(/\s+\d{4}$/, ''));
    return genericPeriodNames;
  }, []);
};

const options = {
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
const getOptionsForRequest = () => {
  return Object.entries(options).filter(entry => entry[1].requestable // entry = [option, props]
  );
};

const getRequestOptions = (visualization, filters) => {
  const options = getOptionsForRequest().reduce((map, [option, props]) => {
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
    const ouIds = filters.userOrgUnit.map(ouPath => ouPath.split('/').slice(-1)[0]);
    options.userOrgUnit = ouIds.join(';');
  }

  return options;
};

const fetchData = async ({
  visualization,
  filters,
  d2,
  forDashboard
}) => {
  const options = getRequestOptions(visualization, filters);
  const extraOptions = {
    dashboard: forDashboard
  };

  if (analytics.isYearOverYear(visualization.type)) {
    const {
      responses,
      yearlySeriesLabels
    } = await apiFetchAnalyticsForYearOverYear(d2, visualization, options);
    return {
      responses,
      extraOptions: _objectSpread2(_objectSpread2({}, extraOptions), {}, {
        yearlySeries: yearlySeriesLabels,
        xAxisLabels: computeGenericPeriodNames(responses)
      })
    };
  }

  return {
    responses: await apiFetchAnalytics(d2, visualization, options),
    extraOptions
  };
};

const LEGEND_DISPLAY_STRATEGY_BY_DATA_ITEM = 'BY_DATA_ITEM';
const LEGEND_DISPLAY_STRATEGY_FIXED = 'FIXED';
const VisualizationPlugin = (_ref) => {
  let {
    d2,
    visualization,
    filters,
    forDashboard,
    onError,
    onLoadingComplete,
    onResponsesReceived
  } = _ref,
      props = _objectWithoutProperties(_ref, ["d2", "visualization", "filters", "forDashboard", "onError", "onLoadingComplete", "onResponsesReceived"]);

  const engine = appRuntime.useDataEngine();
  const [fetchResult, setFetchResult] = React.useState(null);
  const doFetchData = React.useCallback(async () => {
    const result = await fetchData({
      visualization,
      filters,
      d2,
      forDashboard
    });

    if (result.responses.length) {
      onResponsesReceived(result.responses);
    }

    return result;
  }, [d2, filters, forDashboard, onResponsesReceived, visualization]);
  const doFetchLegendSets = React.useCallback(async legendSetIds => {
    if (!legendSetIds.length) {
      return [];
    }

    const response = await apiFetchLegendSets(engine, legendSetIds);

    if (response && response.legendSets) {
      return response.legendSets.legendSets;
    }
  }, [engine]);
  React.useEffect(() => {
    setFetchResult(null);

    const doFetchAll = async () => {
      const {
        responses,
        extraOptions
      } = await doFetchData(visualization, filters, forDashboard);
      const legendSetIds = [];

      switch (visualization.legendDisplayStrategy) {
        case LEGEND_DISPLAY_STRATEGY_FIXED:
          if (visualization.legendSet && visualization.legendSet.id) {
            legendSetIds.push(visualization.legendSet.id);
          }

          break;

        case LEGEND_DISPLAY_STRATEGY_BY_DATA_ITEM:
          {
            // parse responses to extract legendSet ids from metaData
            // multiple responses are only for YOY which does not support legends
            // safe to use only the 1st
            // dx dimensions might not be present, the empty array covers that case
            const dxIds = responses[0].metaData.dimensions.dx || [];
            dxIds.forEach(dxId => {
              const legendSetId = responses[0].metaData.items[dxId].legendSet;

              if (legendSetId) {
                legendSetIds.push(legendSetId);
              }
            });
            break;
          }
      }

      const legendSets = await doFetchLegendSets(legendSetIds);
      setFetchResult({
        visualization,
        legendSets,
        responses,
        extraOptions
      });
      onLoadingComplete();
    };

    doFetchAll().catch(error => {
      onError(error);
    });
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, [visualization, filters, forDashboard]);

  if (!fetchResult) {
    return null;
  }

  if (!fetchResult.visualization.type || fetchResult.visualization.type === analytics.VIS_TYPE_PIVOT_TABLE) {
    return /*#__PURE__*/React__default.createElement(PivotPlugin, _extends({
      visualization: fetchResult.visualization,
      responses: fetchResult.responses,
      legendSets: fetchResult.legendSets
    }, props));
  } else {
    return /*#__PURE__*/React__default.createElement(ChartPlugin, _extends({
      visualization: fetchResult.visualization,
      responses: fetchResult.responses,
      extraOptions: fetchResult.extraOptions,
      legendSets: fetchResult.legendSets
    }, props));
  }
};
VisualizationPlugin.defaultProps = {
  filters: {},
  forDashboard: false,
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
  onError: PropTypes.func,
  onLoadingComplete: PropTypes.func,
  onResponsesReceived: PropTypes.func
};

module.exports = VisualizationPlugin;
//# sourceMappingURL=lib.js.map
