var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

import React from 'react';
import { shallow } from 'enzyme';
import * as analytics from '@dhis2/analytics';

import LoadingMask from '../widgets/LoadingMask';
import ChartPlugin from '../ChartPlugin';
import * as api from '../api/analytics';
import * as apiViz from '../api/visualization';
import * as options from '../modules/options';

jest.mock('@dhis2/analytics');

var dxMock = {
    dimension: 'dx',
    items: [{
        id: 'Uvn6LCg7dVU'
    }]
};

var peMock = {
    dimension: 'pe',
    items: [{
        id: 'LAST_12_MONTHS'
    }]
};

var ouMock = {
    dimension: 'ou',
    items: [{
        id: 'ImspTQPwCqd'
    }]
};

var defaultCurrentMock = {
    type: analytics.VIS_TYPE_COLUMN,
    columns: [dxMock],
    rows: [peMock],
    filters: [ouMock]
};

var yearOverYearCurrentMock = {
    type: analytics.VIS_TYPE_YEAR_OVER_YEAR_LINE,
    columns: [dxMock],
    rows: [peMock],
    yearlySeries: ['LAST_YEAR']
};

var singleValueCurrentMock = {
    type: analytics.VIS_TYPE_SINGLE_VALUE,
    columns: [dxMock],
    rows: [],
    filters: [ouMock, peMock]
};

var metaDataMock = {
    items: {
        a: { name: 'a dim' },
        b: { name: 'b dim' },
        p1: { name: 'period 1 1979' },
        p2: { name: 'period 2 1979' }
    },
    dimensions: {
        pe: ['p1', 'p2']
    }
};

var analyticsResponse = {
    metaData: metaDataMock
};

var MockAnalyticsResponse = function MockAnalyticsResponse() {
    _classCallCheck(this, MockAnalyticsResponse);

    return analyticsResponse;
};

var mockYoYSeriesLabels = ['rainbow', 'rarity'];

var MockYoYAnalyticsResponse = function MockYoYAnalyticsResponse() {
    _classCallCheck(this, MockYoYAnalyticsResponse);

    return {
        responses: [analyticsResponse],
        yearlySeriesLabels: mockYoYSeriesLabels
    };
};

var createVisualizationMock = {
    visualization: {
        getSVGForExport: function getSVGForExport() {
            return '<svg />';
        }
    }
};

var isYearOverYearMockResponse = function isYearOverYearMockResponse(visType) {
    return visType === analytics.VIS_TYPE_YEAR_OVER_YEAR_LINE;
};

var isSingleValueMockResponse = function isSingleValueMockResponse(visType) {
    return visType === analytics.VIS_TYPE_SINGLE_VALUE;
};

describe('ChartPlugin', function () {
    options.getOptionsForRequest = function () {
        return [['option1', { defaultValue: 'abc' }], ['option2', { defaultValue: null }]];
    };
    var props = void 0;
    var shallowChartPlugin = void 0;
    var canvas = function canvas() {
        if (!shallowChartPlugin) {
            shallowChartPlugin = shallow(React.createElement(ChartPlugin, props));
        }
        return shallowChartPlugin;
    };

    beforeEach(function () {
        props = {
            config: {},
            filters: {},
            style: { height: 100 },
            id: 1,
            d2: {},
            forDashboard: false,
            onChartGenerated: jest.fn(),
            onResponsesReceived: jest.fn(),
            onError: jest.fn()
        };
        shallowChartPlugin = undefined;

        apiViz.apiFetchVisualization = jest.fn().mockResolvedValue(defaultCurrentMock);

        api.apiFetchAnalytics = jest.fn().mockResolvedValue([new MockAnalyticsResponse()]);
    });

    it('renders the loading indicator', function () {
        props.loading = true;
        expect(canvas().find(LoadingMask).exists()).toBeTruthy();
    });

    describe('createVisualization success', function () {
        beforeEach(function () {
            analytics.createVisualization = jest.fn().mockReturnValue(createVisualizationMock);
        });

        it('renders a div', function (done) {
            expect(canvas().find('div').length).toBeGreaterThan(0);
            done();
        });

        it('uses the style passed as prop', function (done) {
            expect(canvas().find('div').prop('style')).toEqual(props.style);
            done();
        });

        it('calls createVisualization', function (done) {
            canvas();

            setTimeout(function () {
                expect(analytics.createVisualization).toHaveBeenCalled();
                done();
            });
        });

        it('includes only options that do not have default value in request', function (done) {
            props.config = _extends({}, defaultCurrentMock, {
                option1: 'def',
                option2: null
            });

            canvas();

            setTimeout(function () {
                expect(api.apiFetchAnalytics).toHaveBeenCalled();
                expect(api.apiFetchAnalytics.mock.calls[0][2]).toEqual({
                    option1: 'def'
                });

                done();
            });
        });

        it('fetches the AO by id when only id is passed in config', function (done) {
            props.forDashboard = true;
            props.config = {
                id: 'test1'
            };

            canvas();

            setTimeout(function () {
                expect(apiViz.apiFetchVisualization).toHaveBeenCalled();
                expect(apiViz.apiFetchVisualization).toHaveBeenCalledWith(props.d2, 'chart', 'test1');

                done();
            });
        });

        it('calls onResponsesReceived callback', function (done) {
            canvas();

            setTimeout(function () {
                expect(props.onResponsesReceived).toHaveBeenCalled();
                expect(props.onResponsesReceived).toHaveBeenCalledWith([analyticsResponse]);
                done();
            });
        });

        it('calls onChartGenerated callback', function (done) {
            canvas();

            setTimeout(function () {
                expect(props.onChartGenerated).toHaveBeenCalled();
                expect(props.onChartGenerated).toHaveBeenCalledWith(createVisualizationMock.visualization.getSVGForExport());
                done();
            });
        });

        it('calls onError callback when an exception is thrown', function (done) {
            api.apiFetchAnalytics = jest.fn().mockRejectedValue('error');

            canvas();

            setTimeout(function () {
                expect(props.onError).toHaveBeenCalled();
                done();
            });
        });

        it('sets period when interpretation selected', function (done) {
            var period = 'eons ago';
            props.filters.relativePeriodDate = period;

            canvas();

            setTimeout(function () {
                expect(api.apiFetchAnalytics).toHaveBeenCalled();
                expect(api.apiFetchAnalytics.mock.calls[0][2]).toHaveProperty('relativePeriodDate', period);

                done();
            });
        });

        describe('Year-on-year chart', function () {
            beforeEach(function () {
                props.config = _extends({}, yearOverYearCurrentMock, {
                    option1: 'def'
                });

                api.apiFetchAnalyticsForYearOverYear = jest.fn().mockResolvedValue(new MockYoYAnalyticsResponse());

                analytics.isYearOverYear = jest.fn().mockReturnValue(isYearOverYearMockResponse(props.config.type));
            });

            it('makes year-on-year analytics request', function (done) {
                canvas();

                setTimeout(function () {
                    expect(api.apiFetchAnalyticsForYearOverYear).toHaveBeenCalled();
                    expect(api.apiFetchAnalyticsForYearOverYear.mock.calls[0][1]).toEqual(_extends({}, yearOverYearCurrentMock, {
                        option1: 'def'
                    }));

                    done();
                });
            });

            it('provides extra options to createVisualization', function (done) {
                canvas();

                setTimeout(function () {
                    expect(analytics.createVisualization).toHaveBeenCalled();

                    var expectedExtraOptions = {
                        yearlySeries: mockYoYSeriesLabels,
                        xAxisLabels: ['period 1', 'period 2'],
                        noData: { text: 'No data' }
                    };

                    expect(analytics.createVisualization.mock.calls[0][3]).toEqual(_extends({
                        animation: undefined,
                        dashboard: false
                    }, expectedExtraOptions));

                    done();
                });
            });
        });

        describe('Single value visualization', function () {
            beforeEach(function () {
                props.config = _extends({}, singleValueCurrentMock);

                analytics.isSingleValue = jest.fn().mockReturnValue(isSingleValueMockResponse(props.config.type));
            });

            it('provides dhis as output format to createChart', function (done) {
                canvas();

                setTimeout(function () {
                    expect(analytics.createVisualization).toHaveBeenCalled();

                    expect(analytics.createVisualization.mock.calls[0][6]).toEqual('dhis');

                    done();
                });
            });
        });
    });
});