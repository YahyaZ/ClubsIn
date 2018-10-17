import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Alert } from 'react-bootstrap';
import Logo from '../../resources/LOGO/logo.png';

const Form = ({
    tagline,
    formBody,
    footerText,
    footerLinkText,
    footerLink,
    footerLinkClick,
    errorMessage,
}) => (
    <div>
        <div className="form-header">
            <img className="logo" src={Logo} alt="logo" />
            <div className="tagline">{tagline}</div>
            {errorMessage && <Alert bsStyle="danger">{errorMessage}</Alert>}
        </div>
        {formBody}
        <div className="form-footer">
            {footerText} {' '}
            <span className="link">
                {!footerLinkClick 
                    ? <Link to={`${footerLink}`}>{footerLinkText}</Link>
                    : (
                        <span
                            role="link"
                            tabIndex="0"
                            onClick={footerLinkClick}
                            onKeyPress={(e) => { if (e.key === 'ENTER') footerLinkClick(); }}
                        >
                            {footerLinkText}
                        </span>)}
            </span>
        </div>
    </div>
);

export default Form;

Form.defaultProps = {
    footerLinkClick: undefined,
    footerText: '',
    footerLinkText: '',
    footerLink: '',
    errorMessage: '',
};

Form.propTypes = {
    tagline: PropTypes.string.isRequired,
    formBody: PropTypes.element.isRequired,
    footerText: PropTypes.string,
    footerLinkText: PropTypes.string,
    footerLink: PropTypes.string,
    footerLinkClick: PropTypes.func,
    errorMessage: PropTypes.string,
};
