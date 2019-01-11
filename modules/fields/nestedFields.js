// constants

var ID = 'id';
var NAME = 'name,displayName,displayShortName';

var DIMENSION_ITEM = 'dimensionItem~rename(' + ID + ')';
var LEGEND_SET = 'legendSet[' + ID + ',' + NAME + ']';
var USER = 'user[' + NAME + ',userCredentials[username]]';

var ITEMS = 'items[' + DIMENSION_ITEM + ',' + NAME + ',dimensionItemType]';
var COMMENTS = 'comments[' + ID + ',' + USER + ',lastUpdated,text';

var AXIS = 'dimension,filter,' + LEGEND_SET + ',' + ITEMS;
var INTERPRETATIONS = 'id,created';

// nested fields map
export var nestedFields = {
    columns: AXIS,
    rows: AXIS,
    filters: AXIS,
    user: USER,
    comments: COMMENTS,
    interpretations: INTERPRETATIONS
};

export var extendFields = function extendFields(field) {
    return '' + field + (nestedFields[field] ? '[' + nestedFields[field] + ']' : '');
};