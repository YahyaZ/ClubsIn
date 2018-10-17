import React from 'react';
import PropTypes from 'prop-types';

/* Component for a menu item in an event's tasks */
const MenuItem = ({
    itemName,
    itemType,
    isSelectedMenu,
    selectMenu,
    handleKeyPress,
}) => (
    <div
        role="button"
        className={`event-menu-item ${isSelectedMenu(itemType)}`}
        onClick={() => selectMenu(itemType)}
        onKeyPress={e => handleKeyPress(e, 'SELECT_MENU', itemType)}
        tabIndex="0"
    >
        <h2>{itemName}</h2>
    </div>
);

export default MenuItem;

MenuItem.propTypes = {
    itemName: PropTypes.string.isRequired,
    itemType: PropTypes.string.isRequired,
    isSelectedMenu: PropTypes.func.isRequired,
    selectMenu: PropTypes.func.isRequired,
    handleKeyPress: PropTypes.func.isRequired,
};
