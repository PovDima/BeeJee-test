import React      from 'react';
import PropTypes  from 'prop-types';
import classnames from 'classnames';
import Button     from '@material-ui/core/Button';

import styles    from './Button.less';

function ExtendedButton({
    variant,
    color,
    classes,
    ...rest
}) {
    return (
        <Button
            classes = {{
                root  : classnames(styles.Button, classes.root),
                label : classnames(styles.Label, classes.label)
            }}
            variant   = {variant}
            color     = {color}
            target    = '_blank'
            {...rest}
        />
    );
}

ExtendedButton.propTypes = {
    variant : PropTypes.string,
    color   : PropTypes.string,
    classes : PropTypes.object
};

ExtendedButton.defaultProps = {
    variant : 'contained',
    color   : 'default',
    classes : {}
};

export default ExtendedButton;
