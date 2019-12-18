import api from '../apiSingleton.js';

export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';

export function login(data, onError) {
    return async dispatch => {
        try {
            const response = await api.login.login(data);
            if (response.status === 'ok') {
                const { message: { token } } = response

                localStorage.setItem('token', token);

                dispatch({
                    type: LOGIN,
                });
            }

        } catch (error) {
            onError(error)
        }
    };
}

export function logout() {
    return dispatch => {
        localStorage.setItem('token', '');

        dispatch({ type: LOGOUT });
    };
}

export function checkSession() {
    return dispatch => {
        try {
            const token = localStorage.getItem('token');

            if (!token) {
                return;
            }

            dispatch({
                type: LOGIN,
            });
        } catch (err) {
            console.log(err)
        }
    };
}
