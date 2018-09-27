import React, { Component } from 'react';
import PropTypes from 'prop-types';

class SignUpFormChooseClubType extends Component {
    render() {
        const { existingClubButtonClick, newClubButtonClick } = this.props;
        return (
            <div>
                <button type="button" className="form-button" onClick={existingClubButtonClick}>Existing Club</button>
                <button type="button" className="form-button" onClick={newClubButtonClick}>Register Club</button>
            </div>
        );
    }
}

export default SignUpFormChooseClubType;

SignUpFormChooseClubType.propTypes = {
    existingClubButtonClick: PropTypes.func.isRequired,
    newClubButtonClick: PropTypes.func.isRequired,
};
