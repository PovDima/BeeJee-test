import { combineReducers } from 'redux';

import tasks from './tasks';
import login from './login';

export default combineReducers({
    tasks,
    login
});
