import React, { useState, useCallback } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Progress from '@material-ui/core/CircularProgress';
import TextField from '../../ui-component/TextField';
import Button from '../../ui-component/Button';

import * as TasksActions from '../../../actions/tasks';

import './CreatePage.css';

function CreatePage(props) {
    const initialData = {
        username: '',
        email: '',
        text: ''
    };
    const [taskData, setTaskData] = useState(initialData);

    const [isCreate, setIsCreate] = useState(false)

    const [err, setErrors] = useState(initialData);

    function handleChange(key, value) {
        setTaskData({ ...taskData, [key]: value });
        setErrors({ ...err, [key]: '' });
    }

    function onError(err) {
        setErrors({ ...err });
    }

    async function handleSubmit() {
        setIsCreate(true);
        await props.createTask(taskData, onError, props.handleToggleCreate);
        await props.getTasks({ page: props.page, sort_field: props.sort_field, sort_direction: props.sort_direction });
        setIsCreate(false);
    }

    return (
        <div className={'createPageWrapper'}>
            <div className={'inputBlock'}>
                <TextField
                    placeholder={'Username'}
                    fullWidth
                    value={taskData.username}
                    className={'input'}
                    onChange={useCallback(e => handleChange('username', e.target.value))}
                    error={!!err.username}
                    helperText={err.username}
                />
                <TextField
                    type='email'
                    placeholder={'Email'}
                    fullWidth
                    value={taskData.email}
                    className={'input'}
                    onChange={useCallback(e => handleChange('email', e.target.value))}
                    error={!!err.email}
                    helperText={err.email}
                />
                <TextField
                    placeholder={'Text'}
                    fullWidth
                    value={taskData.text}
                    className={'input'}
                    onChange={useCallback(e => handleChange('text', e.target.value))}
                    error={!!err.text}
                    helperText={err.text}
                />
                <Button
                    color='secondary'
                    fullWidth
                    className={'input'}
                    onClick={handleSubmit}
                >
                    {isCreate ? <Progress size={35} /> : 'Create'}
                </Button>
            </div>
        </div>
    );
}

CreatePage.propTypes = {
    createTask: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
    sort_field: PropTypes.string.isRequired,
    sort_direction: PropTypes.string.isRequired,
    getTasks: PropTypes.func.isRequired,
    handleToggleCreate: PropTypes.func.isRequired
};

export default connect(() => { return {} }, { ...TasksActions })(CreatePage);
