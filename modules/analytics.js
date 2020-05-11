export var computeGenericPeriodNames = function computeGenericPeriodNames(responses) {
    var xAxisRes = responses.reduce(function (out, res) {
        if (out.metaData) {
            if (res.metaData.dimensions.pe.length > out.metaData.dimensions.pe.length) {
                out = res;
            }
        } else {
            out = res;
        }

        return out;
    }, {});

    var metadata = xAxisRes.metaData;

    return metadata.dimensions.pe.reduce(function (genericPeriodNames, periodId) {
        var name = metadata.items[periodId].name;

        // until the day the backend will support this in the API:
        // trim off the trailing year in the period name
        // english names should all have the year at the end of the string
        genericPeriodNames.push(name.replace(/\s+\d{4}$/, ''));

        return genericPeriodNames;
    }, []);
};