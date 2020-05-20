var _this = this;

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var peId = 'pe';

export var apiFetchAnalytics = function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(d2, current, options) {
        var req, rawResponse;
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        req = new d2.analytics.request().fromModel(current).withParameters(options);
                        _context.next = 3;
                        return d2.analytics.aggregate.get(req);

                    case 3:
                        rawResponse = _context.sent;
                        return _context.abrupt('return', [new d2.analytics.response(rawResponse)]);

                    case 5:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, _this);
    }));

    return function apiFetchAnalytics(_x, _x2, _x3) {
        return _ref.apply(this, arguments);
    };
}();

export var apiFetchAnalyticsForYearOverYear = function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(d2, current, options) {
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

                    case 12:
                    case 'end':
                        return _context2.stop();
                }
            }
        }, _callee2, _this);
    }));

    return function apiFetchAnalyticsForYearOverYear(_x4, _x5, _x6) {
        return _ref2.apply(this, arguments);
    };
}();