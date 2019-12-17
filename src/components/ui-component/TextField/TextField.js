import React, { PureComponent } from 'react';
import PropTypes                from 'prop-types';
import classNames               from 'classnames';
import TextField                from '@material-ui/core/TextField';

import styles                   from './TextField.less';

class ExtendedTextField extends PureComponent {
    static propTypes = {
        variant       : PropTypes.string,
        InputProps    : PropTypes.object,
        className     : PropTypes.string,
        error         : PropTypes.bool,
        visible       : PropTypes.bool,
        style         : PropTypes.string,
        inputProps    : PropTypes.object,
        value         : PropTypes.string,
        textareaClass : PropTypes.string
    }

    static defaultProps = {
        variant       : 'outlined',
        InputProps    : {},
        style         : '',
        className     : '',
        error         : false,
        visible       : true,
        inputProps    : {},
        value         : '',
        textareaClass : ''
    }

    state = {
        isCount : false
    }

    handleOnFocus = () => {
        this.setState({
            isCount : true
        });
    }

    handleOnBlur = () => {
        this.setState({
            isCount : false
        });
    }

    render() {
        const {
            visible,
            variant,
            className,
            error,
            style,
            value,
            InputProps,
            inputProps,
            textareaClass,
            ...rest
        } = this.props;
        const { isCount } = this.state;

        return (
            visible &&
            <div className={classNames(styles.wrapper, className)}>
                <TextField
                    variant   = {variant}
                    className = {classNames(styles.input, styles[textareaClass])}
                    InputProps={{
                        classes : {
                            root    : classNames(styles.root, { [styles.error]: error }, style),
                            focused : styles.inputFocused
                        },
                        ...InputProps
                    }}
                    FormHelperTextProps = {{
                        classes : {
                            root : styles.helperTextRoot
                        }
                    }}
                    onFocus = {this.handleOnFocus}
                    onBlur  = {this.handleOnBlur}
                    inputProps = {inputProps}
                    value   = {value}
                    {...rest}
                />
                {isCount && inputProps.maxLength && value
                    ? <div className={styles.counter}>
                        {inputProps.maxLength - value.length}
                    </div>
                    : null
                }
            </div>
        );
    }
}

export default ExtendedTextField;
