/* eslint-disable */
import React, { useState, useCallback, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import { useDataEngine, useDataQuery } from '@dhis2/app-runtime';
import { FlyoutMenu, MenuItem, Divider, Popper } from '@dhis2/ui';
import { createVisualization, isSingleValue, PivotTable, VIS_TYPE_PIVOT_TABLE, isYearOverYear } from '@dhis2/analytics';
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

const orgUnitLevelsQuery = {
  orgUnitLevels: {
    resource: 'organisationUnitLevels',
    params: {
      fields: 'id,level,displayName~rename(name)',
      paging: 'false'
    }
  }
};
const orgUnitsQuery = {
  orgUnits: {
    resource: 'organisationUnits',
    id: ({
      id: _id
    }) => _id,
    params: {
      fields: 'id,level,displayName~rename(name),path,parent[id,displayName~rename(name)],children[level]',
      paging: 'false',
      userDataViewFallback: 'true'
    }
  }
};
const apiFetchOrganisationUnit = (dataEngine, id) => dataEngine.query(orgUnitsQuery, {
  variables: {
    id
  }
});

const ArrowUpwardIcon = ({
  style = {
    width: 18,
    height: 18
  }
}) => /*#__PURE__*/React.createElement("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24",
  style: style
}, /*#__PURE__*/React.createElement("path", {
  d: "M0 0h24v24H0V0z",
  fill: "none"
}), /*#__PURE__*/React.createElement("path", {
  d: "M4 12l1.41 1.41L11 7.83V20h2V7.83l5.58 5.59L20 12l-8-8-8 8z",
  fill: "black"
}));

ArrowUpwardIcon.propTypes = {
  style: PropTypes.object
};

const ArrowDownwardIcon = ({
  style = {
    width: 18,
    height: 18
  }
}) => /*#__PURE__*/React.createElement("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24",
  style: style
}, /*#__PURE__*/React.createElement("path", {
  d: "M0 0h24v24H0V0z",
  fill: "none"
}), /*#__PURE__*/React.createElement("path", {
  d: "M20 12l-1.41-1.41L13 16.17V4h-2v12.17l-5.58-5.59L4 12l8 8 8-8z",
  fill: "black"
}));

ArrowDownwardIcon.propTypes = {
  style: PropTypes.object
};

const ContextualMenu = ({
  config,
  ouLevels,
  onClick: _onClick
}) => {
  const engine = useDataEngine();
  const [ouData, setOuData] = useState(undefined);
  const [subLevelData, setSubLevelData] = useState(undefined);

  const lookupLevel = levelId => ouLevels.find(item => item.level === levelId);

  const doFetchOuData = useCallback(async ouId => {
    const ouData = await apiFetchOrganisationUnit(engine, ouId);
    return ouData.orgUnits;
  }, [engine]);
  useEffect(() => {
    setOuData(null);

    const doFetch = async () => {
      const orgUnit = await doFetchOuData(config.ouId);
      setOuData(orgUnit);
    };

    if (config.ouId) {
      doFetch();
    }
    /* eslint-disable-next-line react-hooks/exhaustive-deps */

  }, [config]);
  useEffect(() => {
    setSubLevelData(null);

    if (ouData === null || ouData === void 0 ? void 0 : ouData.children.length) {
      const levelData = lookupLevel(ouData.children[0].level);

      if (levelData) {
        setSubLevelData(levelData);
      }
    }
    /* eslint-disable-next-line react-hooks/exhaustive-deps */

  }, [ouData]);
  const menuItemStyle = {
    display: 'inline-block',
    minWidth: 200
  };
  return /*#__PURE__*/React.createElement(FlyoutMenu, null, ouData && /*#__PURE__*/React.createElement(MenuItem, {
    dense: true,
    label: i18n.t('Change org unit')
  }, (ouData === null || ouData === void 0 ? void 0 : ouData.parent) && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(MenuItem, {
    dense: true,
    icon: /*#__PURE__*/React.createElement(ArrowUpwardIcon, null),
    label: /*#__PURE__*/React.createElement("span", {
      style: menuItemStyle
    }, ouData.parent.name),
    onClick: () => _onClick({
      ou: {
        id: ouData.parent.id
      }
    })
  }), subLevelData && /*#__PURE__*/React.createElement(Divider, null)), subLevelData && /*#__PURE__*/React.createElement(MenuItem, {
    dense: true,
    icon: /*#__PURE__*/React.createElement(ArrowDownwardIcon, null),
    label: /*#__PURE__*/React.createElement("span", {
      style: menuItemStyle
    }, i18n.t('{{level}} level in {{orgunit}}', {
      level: subLevelData.name,
      orgunit: ouData.name
    })),
    onClick: () => _onClick({
      ou: {
        id: ouData.id,
        path: ouData.path,
        level: subLevelData.id
      }
    })
  })));
};
ContextualMenu.propTypes = {
  config: PropTypes.object,
  ouLevels: PropTypes.array,
  onClick: PropTypes.func
};

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
  const canvasRef = useRef(undefined);
  const renderVisualization = useCallback(animation => {
    const visualizationConfig = createVisualization(responses, visualization, canvasRef.current, _objectSpread2(_objectSpread2({}, extraOptions), {}, {
      animation,
      legendSets
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
  }, [canvasRef, visualization, onChartGenerated, responses, extraOptions, legendSets]);
  useEffect(() => {
    renderVisualization(defaultAnimation);
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, [visualization, responses, extraOptions]);
  useEffect(() => {
    renderVisualization(0);
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, [renderCounter, style]);
  return /*#__PURE__*/React.createElement("div", {
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
  id: renderCounter,
  onToggleContextualMenu
}) => {
  return /*#__PURE__*/React.createElement("div", {
    style: style
  }, /*#__PURE__*/React.createElement(PivotTable, {
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

const peId = 'pe';
const apiFetchAnalytics = async (d2, current, options) => {
  const req = new d2.analytics.request().fromModel(current).withParameters(options).withIncludeNumDen(current.type === VIS_TYPE_PIVOT_TABLE);
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

  if (isYearOverYear(visualization.type)) {
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
    onResponsesReceived,
    onDrill
  } = _ref,
      props = _objectWithoutProperties(_ref, ["d2", "visualization", "filters", "forDashboard", "onError", "onLoadingComplete", "onResponsesReceived", "onDrill"]);

  const engine = useDataEngine();
  const [fetchResult, setFetchResult] = useState(null);
  const [contextualMenuRef, setContextualMenuRef] = useState(undefined);
  const [contextualMenuConfig, setContextualMenuConfig] = useState({});

  const onToggleContextualMenu = (ref, data) => {
    setContextualMenuRef(ref);
    setContextualMenuConfig(data);
  };

  const closeContextualMenu = () => setContextualMenuRef(undefined);

  const onContextualMenuItemClick = args => {
    closeContextualMenu();
    onDrill(args);
  };

  const {
    data: ouLevelsResponse
  } = useDataQuery(orgUnitLevelsQuery, {
    onError
  });
  const ouLevels = ouLevelsResponse === null || ouLevelsResponse === void 0 ? void 0 : ouLevelsResponse.orgUnitLevels.organisationUnitLevels;
  const doFetchData = useCallback(async () => {
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
  const doFetchLegendSets = useCallback(async legendSetIds => {
    if (!legendSetIds.length) {
      return [];
    }

    const response = await apiFetchLegendSets(engine, legendSetIds);

    if (response && response.legendSets) {
      return response.legendSets.legendSets;
    }
  }, [engine]);
  useEffect(() => {
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

  const contextualMenuRect = contextualMenuRef && contextualMenuRef.current && contextualMenuRef.current.getBoundingClientRect();
  const virtualContextualMenuElement = contextualMenuRect ? {
    getBoundingClientRect: () => contextualMenuRect
  } : null;
  return /*#__PURE__*/React.createElement(React.Fragment, null, !fetchResult.visualization.type || fetchResult.visualization.type === VIS_TYPE_PIVOT_TABLE ? /*#__PURE__*/React.createElement(PivotPlugin, _extends({
    visualization: fetchResult.visualization,
    responses: fetchResult.responses,
    legendSets: fetchResult.legendSets,
    onToggleContextualMenu: onDrill ? onToggleContextualMenu : undefined
  }, props)) : /*#__PURE__*/React.createElement(ChartPlugin, _extends({
    visualization: fetchResult.visualization,
    responses: fetchResult.responses,
    extraOptions: fetchResult.extraOptions,
    legendSets: fetchResult.legendSets
  }, props)), contextualMenuRect && /*#__PURE__*/createPortal( /*#__PURE__*/React.createElement("div", {
    onClick: closeContextualMenu,
    style: styles.backdrop
  }, /*#__PURE__*/React.createElement(Popper, {
    reference: virtualContextualMenuElement,
    placement: "right"
  }, /*#__PURE__*/React.createElement(ContextualMenu, {
    config: contextualMenuConfig,
    ouLevels: ouLevels,
    onClick: onContextualMenuItemClick
  }))), document.body));
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
  onDrill: PropTypes.func,
  onError: PropTypes.func,
  onLoadingComplete: PropTypes.func,
  onResponsesReceived: PropTypes.func
};

export default VisualizationPlugin;
//# sourceMappingURL=lib.js.map
