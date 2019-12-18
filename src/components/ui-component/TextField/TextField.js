import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import TextField from '@material-ui/core/TextField';

import './TextField.css';

class ExtendedTextField extends PureComponent {
    static propTypes = {
        variant: PropTypes.string,
        className: PropTypes.string,
        error: PropTypes.bool,
        style: PropTypes.string,
        value: PropTypes.string,
    }

    static defaultProps = {
        variant: 'outlined',
        style: '',
        className: '',
        error: false,
        value: '',
    }

    render() {
        const {
            variant,
            className,
            error,
            style,
            value,
            ...rest
        } = this.props;

        return (
            <div className={classNames('wrapper', `${className}`)}>
                <TextField
                    variant={variant}
                    className={'input'}
                    InputProps={{
                        classes: {
                            root: classNames('root', { 'error': error }, style),
                            focused: 'inputFocused'
                        },
                    }}
                    FormHelperTextProps={{
                        classes: {
                            root: 'helperTextRoot'
                        }
                    }}
                    value={value}
                    {...rest}
                />
            </div>
        );
    }
}

export default ExtendedTextField;
