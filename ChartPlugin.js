var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import { createChart } from 'd2-charts-api';

import { apiFetchVisualization } from './api/visualization';
import { apiFetchAnalytics, apiFetchAnalyticsForYearOverYear } from './api/analytics';
import { isYearOverYear } from './modules/chartTypes';
import { getOptionsForRequest } from './modules/options';
import { computeGenericPeriodNames } from './modules/analytics';
import { BASE_FIELD_YEARLY_SERIES } from './modules/fields/baseFields';
import LoadingMask from './widgets/LoadingMask';

var ChartPlugin = function (_Component) {
    _inherits(ChartPlugin, _Component);

    function ChartPlugin(props) {
        _classCallCheck(this, ChartPlugin);

        var _this = _possibleConstructorReturn(this, (ChartPlugin.__proto__ || Object.getPrototypeOf(ChartPlugin)).call(this, props));

        _initialiseProps.call(_this);

        _this.canvasRef = React.createRef();

        _this.recreateChart = Function.prototype;

        _this.state = {
            isLoading: true
        };
        return _this;
    }

    _createClass(ChartPlugin, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.renderChart();
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate(prevProps) {
            if (this.props.config !== prevProps.config) {
                this.renderChart();
                return;
            }

            if (this.props.filters !== prevProps.filters) {
                this.renderChart();
                return;
            }

            if (this.props.id !== prevProps.id) {
                this.recreateChart(0); // disable animation
                return;
            }
        }
    }, {
        key: 'render',
        value: function render() {
            return React.createElement(
                Fragment,
                null,
                this.state.isLoading ? React.createElement(LoadingMask, null) : null,
                React.createElement('div', { ref: this.canvasRef, style: this.props.style })
            );
        }
    }]);

    return ChartPlugin;
}(Component);

var _initialiseProps = function _initialiseProps() {
    var _this2 = this;

    this.getRequestOptions = function (visualization, filters) {
        var options = getOptionsForRequest().reduce(function (map, _ref) {
            var _ref2 = _slicedToArray(_ref, 2),
                option = _ref2[0],
                props = _ref2[1];

            // only add parameter if value !== default
            if (visualization[option] !== props.defaultValue) {
                map[option] = visualization[option];
            }

            return map;
        }, {});

        // interpretation filter
        if (filters.relativePeriodDate) {
            options.relativePeriodDate = filters.relativePeriodDate;
        }

        // global filters
        // userOrgUnit
        if (filters.userOrgUnit && filters.userOrgUnit.length) {
            var ouIds = filters.userOrgUnit.map(function (ouPath) {
                return ouPath.split('/').slice(-1)[0];
            });

            options.userOrgUnit = ouIds.join(';');
        }

        return options;
    };

    this.getConfigById = function (id) {
        return apiFetchVisualization(_this2.props.d2, 'chart', id);
    };

    this.renderChart = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var _props, config, filters, forDashboard, onResponsesReceived, onChartGenerated, onError, visualization, options, extraOptions, responses, yearlySeriesLabels, _ref4;

        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        _props = _this2.props, config = _props.config, filters = _props.filters, forDashboard = _props.forDashboard, onResponsesReceived = _props.onResponsesReceived, onChartGenerated = _props.onChartGenerated, onError = _props.onError;
                        _context.prev = 1;

                        if (!(forDashboard || Object.keys(config).length === 1)) {
                            _context.next = 8;
                            break;
                        }

                        _context.next = 5;
                        return _this2.getConfigById(config.id);

                    case 5:
                        _context.t0 = _context.sent;
                        _context.next = 9;
                        break;

                    case 8:
                        _context.t0 = config;

                    case 9:
                        visualization = _context.t0;
                        options = _this2.getRequestOptions(visualization, filters);
                        extraOptions = { dashboard: forDashboard };
                        responses = [];

                        if (!isYearOverYear(visualization.type)) {
                            _context.next = 24;
                            break;
                        }

                        yearlySeriesLabels = [];
                        _context.next = 17;
                        return apiFetchAnalyticsForYearOverYear(_this2.props.d2, visualization, options);

                    case 17:
                        _ref4 = _context.sent;
                        responses = _ref4.responses;
                        yearlySeriesLabels = _ref4.yearlySeriesLabels;


                        extraOptions[BASE_FIELD_YEARLY_SERIES] = yearlySeriesLabels;
                        extraOptions.xAxisLabels = computeGenericPeriodNames(responses);
                        _context.next = 27;
                        break;

                    case 24:
                        _context.next = 26;
                        return apiFetchAnalytics(_this2.props.d2, visualization, options);

                    case 26:
                        responses = _context.sent;

                    case 27:

                        if (responses.length) {
                            onResponsesReceived(responses);
                        }

                        _this2.recreateChart = function (animation) {
                            var chartConfig = createChart(responses, visualization, _this2.canvasRef.current, _extends({}, extraOptions, {
                                animation: animation
                            }));

                            onChartGenerated(chartConfig.chart.getSVGForExport({
                                sourceHeight: 768,
                                sourceWidth: 1024
                            }));
                        };

                        _this2.recreateChart();

                        _this2.setState({ isLoading: false });
                        _context.next = 36;
                        break;

                    case 33:
                        _context.prev = 33;
                        _context.t1 = _context['catch'](1);

                        onError(_context.t1);

                    case 36:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, _this2, [[1, 33]]);
    }));
};

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
    id: PropTypes.number,
    d2: PropTypes.object.isRequired,
    animation: PropTypes.number,
    config: PropTypes.object.isRequired,
    filters: PropTypes.object,
    forDashboard: PropTypes.bool,
    style: PropTypes.object,
    onError: PropTypes.func.isRequired,
    onChartGenerated: PropTypes.func,
    onResponsesReceived: PropTypes.func
};

export default ChartPlugin;