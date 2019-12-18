import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';

import './Button.css';

function ExtendedButton({
    variant,
    color,
    classes,
    ...rest
}) {
    return (
        <Button
            classes={{
                root: 'Button'
            }}
            variant={variant}
            color={color}
            target='_blank'
            {...rest}
        />
    );
}

ExtendedButton.propTypes = {
    variant: PropTypes.string,
    color: PropTypes.string,
    classes: PropTypes.object
};

ExtendedButton.defaultProps = {
    variant: 'contained',
    color: 'default',
    classes: {}
};

export default ExtendedButton;
