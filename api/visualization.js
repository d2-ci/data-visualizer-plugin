import { getFieldsStringByType } from '../modules/fields';

export var apiFetchVisualization = function apiFetchVisualization(d2, type, id) {
    return d2.models[type].get(id, {
        fields: getFieldsStringByType(type)
    });
};