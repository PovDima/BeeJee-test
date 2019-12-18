import React, { useState, useCallback } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Progress from '@material-ui/core/CircularProgress';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '../../ui-component/TextField';
import Button from '../../ui-component/Button';

import * as TasksActions from '../../../actions/tasks';

import './UpdatePage.css';

function UpdatePage(props) {
    const initialData = {
        status: '',
        text: ''
    };

    const statuses = [
        { label: 'Fulfilled', value: 10 },
        { label: 'Unfulfilled', value: 0 }
    ];

    const [taskData, setTaskData] = useState(props.task);

    const [isUpdate, setIsUpdate] = useState(false)

    const [err, setErrors] = useState(initialData);

    function handleChange(key, value) {
        setTaskData({ ...taskData, [key]: value });
        setErrors({ ...err, [key]: '' });
    }

    function onError(err) {
        setErrors({ ...err });
    }

    async function handleSubmit() {
        setIsUpdate(true);
        await props.updateTask(props.task.id, taskData, onError, props.handleToggleUpdate);
        await props.getTasks({ page: props.page, sort_field: props.sort_field, sort_direction: props.sort_direction });
        setIsUpdate(false);
    }

    return (
        <div className={'UpdatePageWrapper'}>
            <div className={'inputBlock'}>
                <TextField
                    placeholder={'Status'}
                    fullWidth
                    type='number'
                    select
                    value={taskData.status}
                    className={'input'}
                    onChange={useCallback(e => handleChange('status', e.target.value))}
                    error={!!err.status}
                    helperText={err.status}
                >
                    {statuses.map(status => (
                        <MenuItem key={status.value} value={status.value}>
                            {status.label}
                        </MenuItem>
                    ))}
                </TextField>
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
                    {isUpdate ? <Progress size={35} /> : 'Update'}
                </Button>
            </div>
        </div >
    );
}

UpdatePage.propTypes = {
    updateTask: PropTypes.func.isRequired,
    task: PropTypes.object.isRequired,
    page: PropTypes.number.isRequired,
    sort_field: PropTypes.string.isRequired,
    sort_direction: PropTypes.string.isRequired,
    getTasks: PropTypes.func.isRequired,
    handleToggleUpdate: PropTypes.func.isRequired
};

export default connect(() => { return {} }, { ...TasksActions })(UpdatePage);
