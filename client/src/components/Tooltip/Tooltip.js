import React from 'react';
import PropTypes from 'prop-types';
import Tooltip from '@material-ui/core/Tooltip';
import { withStyles } from '@material-ui/core/styles';

const styles = {
    tooltip: {
        fontSize: 16,
    },
};

/* Custom tooltip that has a larger font size */
const CustomTooltip = ({ classes, children, ...other }) => (
    <Tooltip classes={{ tooltip: classes.tooltip }} {...other}>{children}</Tooltip>
);

export default withStyles(styles)(CustomTooltip);

CustomTooltip.propTypes = {
    classes: PropTypes.shape({}).isRequired,
    title: PropTypes.string.isRequired,
    placement: PropTypes.string.isRequired,
    children: PropTypes.element.isRequired,
};
