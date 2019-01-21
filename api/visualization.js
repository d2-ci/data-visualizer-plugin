import { getInstance } from 'd2';
import { getFieldsStringByType } from '../modules/fields';

export var apiFetchVisualization = function apiFetchVisualization(type, id) {
    return getInstance().then(function (d2) {
        return d2.models[type].get(id, {
            fields: getFieldsStringByType(type)
        });
    });
};