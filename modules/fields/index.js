import { getAllFieldObjectsByType, extractName, markExcluded, moveExcludedToEnd } from './baseFields';
import { extendFields } from './nestedFields';

export { getAllFieldObjectsByType };

export var getOptionsByType = function getOptionsByType(type) {
    return getAllFieldObjectsByType(type).filter(function (fieldObj) {
        return fieldObj.option === true;
    });
};

export var getIncludedByType = function getIncludedByType(type) {
    return getAllFieldObjectsByType(type).filter(function (fieldObj) {
        return !fieldObj.excluded;
    });
};

export var getExcludedByType = function getExcludedByType(type) {
    return getAllFieldObjectsByType(type).filter(function (fieldObj) {
        return fieldObj.excluded === true;
    });
};

export var getFieldsStringByType = function getFieldsStringByType(type) {
    return getAllFieldObjectsByType(type).map(markExcluded).map(extractName).sort().reduce(moveExcludedToEnd, null).map(extendFields).join(',');
};