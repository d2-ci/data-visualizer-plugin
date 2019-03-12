import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

var styles = function styles(theme) {
    return {
        progress: {
            margin: theme.spacing.unit * 2,
            maxWidth: 200,
            textAlign: 'center',
            alignSelf: 'center'
        },
        outer: {
            display: 'flex',
            justifyContent: 'center',
            height: '100%'
        }
    };
};

function CircularIndeterminate(props) {
    var classes = props.classes;

    return React.createElement(
        'div',
        { className: classes.outer },
        React.createElement(CircularProgress, { className: classes.progress })
    );
}

CircularIndeterminate.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(CircularIndeterminate);