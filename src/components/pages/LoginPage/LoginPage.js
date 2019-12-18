import React, { useState, useCallback } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Progress from '@material-ui/core/CircularProgress';
import TextField from '../../ui-component/TextField';
import Button from '../../ui-component/Button';

import * as LoginActions from '../../../actions/login';

import './LoginPage.css';

function LoginPage(props) {

    const [userData, setUserData] = useState({
        username: '',
        password: ''
    });

    const [isLogin, setIsLogin] = useState(false)

    const [err, setErrors] = useState({
        username: '',
        password: ''
    });

    function handleChange(key, value) {
        setUserData({ ...userData, [key]: value });
        setErrors({ ...err, [key]: '' });
    }

    function onError(err) {
        setErrors({ ...err });
    }

    async function handleSubmit() {
        setIsLogin(true)
        await props.login(userData, onError)
        setIsLogin(false)
    }

    return (
        <div className={'pageWrapper'}>
            <div className={'inputBlock'}>
                <TextField
                    placeholder={'Username'}
                    fullWidth
                    value={userData.username}
                    className={'input'}
                    onChange={useCallback(e => handleChange('username', e.target.value))}
                    error={!!err.username}
                    helperText={err.username}
                />
                <TextField
                    type='password'
                    placeholder={'Password'}
                    fullWidth
                    value={userData.password}
                    className={'input'}
                    onChange={useCallback(e => handleChange('password', e.target.value))}
                    error={!!err.password}
                    helperText={err.password}
                />
                <Button
                    color='secondary'
                    fullWidth
                    className={'input'}
                    onClick={handleSubmit}
                >
                    {isLogin ? <Progress size={35} /> : 'Login'}
                </Button>
            </div>
        </div>
    );
}

LoginPage.propTypes = {
    login: PropTypes.func.isRequired
};

export default connect(state => { return { login: state.login } }, { ...LoginActions })(LoginPage);
