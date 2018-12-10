"use strict";

var _interopRequireDefault = require("/home/travis/build/dhis2/data-visualizer-app/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.apiSaveVisualization = exports.apiFetchVisualization = void 0;

var _slicedToArray2 = _interopRequireDefault(require("/home/travis/build/dhis2/data-visualizer-app/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/slicedToArray"));

var _d = require("d2");

var _fields = require("../modules/fields");

var apiFetchVisualization = function apiFetchVisualization(type, id) {
  return (0, _d.getInstance)().then(function (d2) {
    return d2.models[type].get(id, {
      fields: (0, _fields.getFieldsStringByType)(type)
    });
  });
};

exports.apiFetchVisualization = apiFetchVisualization;

var apiSaveVisualization = function apiSaveVisualization(type, visualization) {
  return (0, _d.getInstance)().then(function (d2) {
    return d2.models[type];
  }).then(function (modelDefinition) {
    var api = modelDefinition.api;
    var apiEndpoint = modelDefinition.apiEndpoint;
    var options = {
      skipTranslations: true,
      skipSharing: true
    };
    var query = Object.entries(options).reduce(function (query, _ref) {
      var _ref2 = (0, _slicedToArray2.default)(_ref, 2),
          name = _ref2[0],
          value = _ref2[1];

      query.push("".concat(encodeURIComponent(name), "=").concat(encodeURIComponent(value)));
      return query;
    }, []);
    var queryString = '?' + query.join('&');

    if (visualization.id) {
      return api.update("".concat(apiEndpoint, "/").concat(visualization.id).concat(queryString), visualization, false);
    } else {
      return api.post("".concat(apiEndpoint).concat(queryString), visualization);
    }
  });
};

exports.apiSaveVisualization = apiSaveVisualization;