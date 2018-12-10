"use strict";

var _interopRequireDefault = require("/home/travis/build/dhis2/data-visualizer-app/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.apiFetchAnalyticsForYearOverYear = exports.apiFetchAnalytics = exports.apiDownloadData = exports.apiDownloadImage = void 0;

var _slicedToArray2 = _interopRequireDefault(require("/home/travis/build/dhis2/data-visualizer-app/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/slicedToArray"));

var _regenerator = _interopRequireDefault(require("/home/travis/build/dhis2/data-visualizer-app/node_modules/babel-preset-react-app/node_modules/@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("/home/travis/build/dhis2/data-visualizer-app/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/asyncToGenerator"));

var _d = require("d2");

var _fixedDimensions = require("../modules/fixedDimensions");

var peId = _fixedDimensions.FIXED_DIMENSIONS.pe.id;

var apiDownloadImage =
/*#__PURE__*/
function () {
  var _ref = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee(type, formData) {
    var d2, api, url;
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (0, _d.getInstance)();

          case 2:
            d2 = _context.sent;
            api = d2.Api.getApi();
            url = "".concat(api.baseUrl, "/svg.").concat(type);
            return _context.abrupt("return", api.fetch(url, {
              method: 'POST',
              body: formData,
              headers: new Headers(api.defaultHeaders)
            }).then(function (res) {
              return res.blob();
            }));

          case 6:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function apiDownloadImage(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.apiDownloadImage = apiDownloadImage;

var apiDownloadData =
/*#__PURE__*/
function () {
  var _ref2 = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee2(current, format, idScheme, path) {
    var d2, api, req, url;
    return _regenerator.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return (0, _d.getInstance)();

          case 2:
            d2 = _context2.sent;
            api = d2.Api.getApi();
            req = new d2.analytics.request().fromModel(current, path === 'dataValueSet').withFormat(format);

            if (path) {
              req = req.withPath(path);
            }

            if (idScheme) {
              req = req.withOutputIdScheme(idScheme);
            }

            url = new URL("".concat(api.baseUrl, "/").concat(req.buildUrl()), "".concat(window.location.origin).concat(window.location.pathname));
            Object.entries(req.buildQuery()).forEach(function (_ref3) {
              var _ref4 = (0, _slicedToArray2.default)(_ref3, 2),
                  key = _ref4[0],
                  value = _ref4[1];

              return url.searchParams.append(key, value);
            });
            return _context2.abrupt("return", url);

          case 10:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));

  return function apiDownloadData(_x3, _x4, _x5, _x6) {
    return _ref2.apply(this, arguments);
  };
}();

exports.apiDownloadData = apiDownloadData;

var apiFetchAnalytics =
/*#__PURE__*/
function () {
  var _ref5 = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee3(current, options) {
    var d2, req, rawResponse;
    return _regenerator.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return (0, _d.getInstance)();

          case 2:
            d2 = _context3.sent;
            req = new d2.analytics.request().fromModel(current).withParameters(options);
            _context3.next = 6;
            return d2.analytics.aggregate.get(req);

          case 6:
            rawResponse = _context3.sent;
            return _context3.abrupt("return", [new d2.analytics.response(rawResponse)]);

          case 8:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, this);
  }));

  return function apiFetchAnalytics(_x7, _x8) {
    return _ref5.apply(this, arguments);
  };
}();

exports.apiFetchAnalytics = apiFetchAnalytics;

var apiFetchAnalyticsForYearOverYear =
/*#__PURE__*/
function () {
  var _ref6 = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee4(current, options) {
    var d2, yearlySeriesReq, yearlySeriesRes, requests, yearlySeriesLabels, now, currentDay, currentMonth;
    return _regenerator.default.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return (0, _d.getInstance)();

          case 2:
            d2 = _context4.sent;
            yearlySeriesReq = new d2.analytics.request().addPeriodDimension(current.yearlySeries).withSkipData(true).withSkipMeta(false).withIncludeMetadataDetails(true);

            if (options.relativePeriodDate) {
              yearlySeriesReq = yearlySeriesReq.withRelativePeriodDate(options.relativePeriodDate);
            }

            _context4.next = 7;
            return d2.analytics.aggregate.fetch(yearlySeriesReq);

          case 7:
            yearlySeriesRes = _context4.sent;
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
            return _context4.abrupt("return", Promise.all(requests).then(function (responses) {
              return {
                responses: responses.map(function (res) {
                  return new d2.analytics.response(res);
                }),
                yearlySeriesLabels: yearlySeriesLabels
              };
            }));

          case 15:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, this);
  }));

  return function apiFetchAnalyticsForYearOverYear(_x9, _x10) {
    return _ref6.apply(this, arguments);
  };
}();

exports.apiFetchAnalyticsForYearOverYear = apiFetchAnalyticsForYearOverYear;