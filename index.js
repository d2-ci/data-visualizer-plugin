import React from 'react';

import ChartPlugin from './ChartPlugin';
import PivotPlugin from './PivotPlugin';

import { PIVOT_TABLE } from './modules/chartTypes';

var VisualizationPlugin = function VisualizationPlugin(props) {
    if (!props.config.type || props.config.type === PIVOT_TABLE) {
        return React.createElement(PivotPlugin, props);
    } else {
        return React.createElement(ChartPlugin, props);
    }
};

export default VisualizationPlugin;