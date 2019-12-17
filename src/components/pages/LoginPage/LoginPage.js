import React, { useState, useCallback } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Grid } from '@material-ui/core';
import * as SessionActions from '../../../actions/login';
import TextField from '../../ui-component/TextField'

import Button from '../../ui-component/Button'
import styles from './LoginPage.less';

function LoginPage(props) {
    const [userData, setUserData] = useState({
        email: '',
        password: ''
    });
    const [err, setErrors] = useState({
        email: '',
        password: ''
    });

    function handleChange(key, value) {
        setUserData({ ...userData, [key]: value });
        setErrors({ ...err, [key]: '' });
    }

    function handleSubmit() {
    }

    return (
        <div>
            <div className={styles.LoginPage} />
            <div className={styles.inputBlock}>
                <Grid
                    container
                    justify='center'
                    alignItems='center'
                >

                    <Grid item xs={12} >
                        <TextField
                            type='email'
                            placeholder={'Email'}
                            fullWidth
                            value={userData.email}
                            className={styles.input}
                            onChange={useCallback(e => handleChange('email', e.target.value))}
                            error={!!err.email}
                            helperText={err.email}
                        />
                        <TextField
                            type='password'
                            placeholder={'Password'}
                            fullWidth
                            value={userData.password}
                            className={styles.input}
                            onChange={useCallback(e => handleChange('password', e.target.value))}
                            error={!!err.password || !!err['data/password']}
                            helperText={err.password || err['data/password']}
                        />
                        <Button
                            color='secondary'
                            fullWidth
                            className={styles.input}
                            onClick={handleSubmit}
                        >Login
                        </Button>
                    </Grid>

                </Grid>
            </div>
        </div>
    );
}
LoginPage.propTypes = {
    login: PropTypes.func.isRequired
};

export default connect(state => { return { sessions: state.sessions } }, { ...SessionActions })(LoginPage);
