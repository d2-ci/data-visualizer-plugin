var _this = this;

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

import { getInstance } from 'd2';

var peId = 'pe';

export var apiFetchAnalytics = function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(current, options) {
        var d2, req, rawResponse;
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        _context.next = 2;
                        return getInstance();

                    case 2:
                        d2 = _context.sent;
                        req = new d2.analytics.request().fromModel(current).withParameters(options);
                        _context.next = 6;
                        return d2.analytics.aggregate.get(req);

                    case 6:
                        rawResponse = _context.sent;
                        return _context.abrupt('return', [new d2.analytics.response(rawResponse)]);

                    case 8:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, _this);
    }));

    return function apiFetchAnalytics(_x, _x2) {
        return _ref.apply(this, arguments);
    };
}();

export var apiFetchAnalyticsForYearOverYear = function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(current, options) {
        var d2, yearlySeriesReq, yearlySeriesRes, requests, yearlySeriesLabels, now, currentDay, currentMonth;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        _context2.next = 2;
                        return getInstance();

                    case 2:
                        d2 = _context2.sent;
                        yearlySeriesReq = new d2.analytics.request().addPeriodDimension(current.yearlySeries).withSkipData(true).withSkipMeta(false).withIncludeMetadataDetails(true);


                        if (options.relativePeriodDate) {
                            yearlySeriesReq = yearlySeriesReq.withRelativePeriodDate(options.relativePeriodDate);
                        }

                        _context2.next = 7;
                        return d2.analytics.aggregate.fetch(yearlySeriesReq);

                    case 7:
                        yearlySeriesRes = _context2.sent;
                        requests = [];
                        yearlySeriesLabels = [];
                        now = new Date();
                        currentDay = ('' + now.getDate()).padStart(2, 0);
                        currentMonth = ('' + (now.getMonth() + 1)).padStart(2, 0);


                        yearlySeriesRes.metaData.dimensions[peId].forEach(function (period) {
                            yearlySeriesLabels.push(yearlySeriesRes.metaData.items[period].name);

                            var startDate = period + '-' + currentMonth + '-' + currentDay;

                            var req = new d2.analytics.request().fromModel(current).withParameters(options).withRelativePeriodDate(startDate);

                            requests.push(d2.analytics.aggregate.get(req));
                        });

                        return _context2.abrupt('return', Promise.all(requests).then(function (responses) {
                            return {
                                responses: responses.map(function (res) {
                                    return new d2.analytics.response(res);
                                }),
                                yearlySeriesLabels: yearlySeriesLabels
                            };
                        }));

                    case 15:
                    case 'end':
                        return _context2.stop();
                }
            }
        }, _callee2, _this);
    }));

    return function apiFetchAnalyticsForYearOverYear(_x3, _x4) {
        return _ref2.apply(this, arguments);
    };
}();