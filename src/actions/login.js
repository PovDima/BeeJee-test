import jwt          from 'jwt-simple';
import api          from '../apiSingleton.js';
//import { decodeErrorObject } from '../utils/validation';

export const LOGIN  = 'LOGIN';
export const LOGOUT = 'LOGOUT';

export function login(payload, onError) {
    return async dispatch => {
        try {
            const { data: { jwt: token } } = await api.sessions.login(payload);

            const userData = jwt.decode(token, '', true);


                api.apiClient.setToken(token);
                localStorage.setItem('token', token);

                dispatch({
                    type    : LOGIN,
                    payload : userData
                });
        } catch (err) {
            //onError(decodeErrorObject({ ...err.fields }));
        }
    };
}

export function logout() {
    return dispatch => {
        api.apiClient.setToken('');
        localStorage.setItem('token', '');

        dispatch({ type: LOGOUT });
    };
}

export function checkSession() {
    return dispatch => {
        try {
            const token = localStorage.getItem('token');

            if (!token) {
              //  if (pathname !== ROUTES.login) 

                return;
            }
            api.apiClient.setToken(token);

            const userData = jwt.decode(token, '', true);

            dispatch({
                type    : LOGIN,
                payload : userData
            });
        } catch (err) {
          console.log(err)
        }
    };
}
