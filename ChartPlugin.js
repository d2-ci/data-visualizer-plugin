"use strict";

var _interopRequireWildcard = require("/home/travis/build/dhis2/data-visualizer-app/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("/home/travis/build/dhis2/data-visualizer-app/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _regenerator = _interopRequireDefault(require("/home/travis/build/dhis2/data-visualizer-app/node_modules/babel-preset-react-app/node_modules/@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("/home/travis/build/dhis2/data-visualizer-app/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/asyncToGenerator"));

var _slicedToArray2 = _interopRequireDefault(require("/home/travis/build/dhis2/data-visualizer-app/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/slicedToArray"));

var _classCallCheck2 = _interopRequireDefault(require("/home/travis/build/dhis2/data-visualizer-app/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("/home/travis/build/dhis2/data-visualizer-app/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("/home/travis/build/dhis2/data-visualizer-app/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn"));

var _getPrototypeOf3 = _interopRequireDefault(require("/home/travis/build/dhis2/data-visualizer-app/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("/home/travis/build/dhis2/data-visualizer-app/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/inherits"));

var _react = _interopRequireWildcard(require("react"));

var _visualization = require("./api/visualization");

var _analytics = require("./api/analytics");

var _chartTypes = require("./modules/chartTypes");

var _options = require("./modules/options");

var _analytics2 = require("./modules/analytics");

var _d2ChartsApi = require("d2-charts-api");

var ChartPlugin =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(ChartPlugin, _Component);

  function ChartPlugin() {
    var _getPrototypeOf2;

    var _this;

    (0, _classCallCheck2.default)(this, ChartPlugin);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = (0, _possibleConstructorReturn2.default)(this, (_getPrototypeOf2 = (0, _getPrototypeOf3.default)(ChartPlugin)).call.apply(_getPrototypeOf2, [this].concat(args)));
    _this.isActive = false;

    _this.getOptions = function (vis) {
      var options = (0, _options.getOptionsForRequest)().reduce(function (map, _ref) {
        var _ref2 = (0, _slicedToArray2.default)(_ref, 2),
            option = _ref2[0],
            props = _ref2[1];

        // only add parameter if value !== default
        if (vis[option] !== props.defaultValue) {
          map[option] = vis[option];
        }

        return map;
      }, {});
    };

    _this.getConfigById =
    /*#__PURE__*/
    function () {
      var _ref3 = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee(id) {
        var config;
        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return (0, _visualization.apiFetchVisualization)('chart', id);

              case 2:
                config = _context.sent;
                return _context.abrupt("return", config);

              case 4:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      return function (_x) {
        return _ref3.apply(this, arguments);
      };
    }();

    _this.renderChart =
    /*#__PURE__*/
    (0, _asyncToGenerator2.default)(
    /*#__PURE__*/
    _regenerator.default.mark(function _callee2() {
      var _this$props, id, config, containerId, vis, options, extraOptions, responses, yearlySeriesLabels, _ref5;

      return _regenerator.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              if (_this.isActive) {
                _context2.next = 2;
                break;
              }

              return _context2.abrupt("return");

            case 2:
              _this$props = _this.props, id = _this$props.id, config = _this$props.config, containerId = _this$props.containerId;
              vis = id ? _this.getConfigById(id) : config;
              options = _this.getOptions(vis);
              extraOptions = {};
              responses = [];

              if (!(0, _chartTypes.isYearOverYear)(vis.type)) {
                _context2.next = 18;
                break;
              }

              yearlySeriesLabels = [];
              _context2.next = 11;
              return (0, _analytics.apiFetchAnalyticsForYearOverYear)(vis, options);

            case 11:
              _ref5 = _context2.sent;
              responses = _ref5.responses;
              yearlySeriesLabels = _ref5.yearlySeriesLabels;
              extraOptions.yearlySeries = yearlySeriesLabels;
              extraOptions.xAxisLabels = (0, _analytics2.computeGenericPeriodNames)(responses);
              _context2.next = 21;
              break;

            case 18:
              _context2.next = 20;
              return (0, _analytics.apiFetchAnalytics)(vis, options);

            case 20:
              responses = _context2.sent;

            case 21:
              (0, _d2ChartsApi.createChart)(responses, vis, containerId, extraOptions);

            case 22:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, this);
    }));
    return _this;
  }

  (0, _createClass2.default)(ChartPlugin, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.isActive = true;
      this.renderChart();
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.isActive = false;
    }
  }, {
    key: "render",
    value: function render() {
      // TODO add loading
      return _react.default.createElement("div", {
        id: this.props.containerId
      });
    }
  }]);
  return ChartPlugin;
}(_react.Component);

var _default = ChartPlugin;
exports.default = _default;