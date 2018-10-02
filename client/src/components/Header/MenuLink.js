import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

const MenuLink = ({
    to,
    activeClassName = 'active',
    exact,
    children,
}) => (
    <li>
        <NavLink exact={exact} to={to} activeClassName={activeClassName}>{children}</NavLink>
    </li>
);

export default MenuLink;

MenuLink.defaultProps = {
    activeClassName: '',
    exact: undefined,
};

MenuLink.propTypes = {
    to: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.shape({}),
    ]).isRequired,
    activeClassName: PropTypes.string,
    children: PropTypes.node.isRequired,
    exact: PropTypes.bool,
};
