var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

import React from 'react';
import { shallow } from 'enzyme';
import LoadingMask from '../widgets/LoadingMask';
import ChartPlugin from '../ChartPlugin';
import * as chartsApi from 'd2-charts-api';
import * as api from '../api/analytics';
import * as options from '../modules/options';
import { YEAR_OVER_YEAR_LINE, COLUMN } from '../modules/chartTypes';

jest.mock('d2-charts-api');

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
    type: COLUMN,
    columns: [dxMock],
    rows: [peMock],
    filters: [ouMock]
};

var yearOverYearCurrentMock = {
    type: YEAR_OVER_YEAR_LINE,
    columns: [dxMock],
    rows: [peMock],
    yearlySeries: ['LAST_YEAR']
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

var createChartMock = {
    chart: {
        getSVGForExport: function getSVGForExport() {
            return '<svg />';
        }
    }
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
            onChartGenerated: jest.fn(),
            onResponsesReceived: jest.fn(),
            onError: jest.fn()
        };
        shallowChartPlugin = undefined;

        api.apiFetchAnalytics = jest.fn().mockResolvedValue([new MockAnalyticsResponse()]);
    });

    it('renders the loading indicator', function () {
        props.loading = true;
        expect(canvas().find(LoadingMask).exists()).toBeTruthy();
    });

    describe('createChart success', function () {
        beforeEach(function () {
            chartsApi.createChart = jest.fn().mockReturnValue(createChartMock);
        });

        it('renders a div', function (done) {
            expect(canvas().find('div').length).toBeGreaterThan(0);
            done();
        });

        it('uses the style passed as prop', function (done) {
            expect(canvas().find('div').prop('style')).toEqual(props.style);
            done();
        });

        it('calls createChart', function (done) {
            canvas();

            setTimeout(function () {
                expect(chartsApi.createChart).toHaveBeenCalled();
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
                expect(api.apiFetchAnalytics.mock.calls[0][1]).toEqual({
                    option1: 'def'
                });

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
                expect(props.onChartGenerated).toHaveBeenCalledWith(createChartMock.chart.getSVGForExport());
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
                expect(api.apiFetchAnalytics.mock.calls[0][1]).toHaveProperty('relativePeriodDate', period);

                done();
            });
        });

        describe('Year-on-year chart', function () {
            beforeEach(function () {
                props.config = _extends({}, yearOverYearCurrentMock, {
                    option1: 'def'
                });

                api.apiFetchAnalyticsForYearOverYear = jest.fn().mockResolvedValue(new MockYoYAnalyticsResponse());
            });

            it('makes year-on-year analytics request', function (done) {
                canvas();

                setTimeout(function () {
                    expect(api.apiFetchAnalyticsForYearOverYear).toHaveBeenCalled();
                    expect(api.apiFetchAnalyticsForYearOverYear.mock.calls[0][1]).toEqual({
                        option1: 'def'
                    });

                    done();
                });
            });

            it('provides extra options to createChart', function (done) {
                canvas();

                setTimeout(function () {
                    expect(chartsApi.createChart).toHaveBeenCalled();

                    var expectedExtraOptions = {
                        yearlySeries: mockYoYSeriesLabels,
                        xAxisLabels: ['period 1', 'period 2']
                    };

                    expect(chartsApi.createChart.mock.calls[0][3]).toEqual(_extends({
                        animation: undefined,
                        dashboard: false
                    }, expectedExtraOptions));

                    done();
                });
            });
        });
    });
});