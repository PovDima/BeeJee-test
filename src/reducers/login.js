import { LOGIN, LOGOUT } from '../actions/login';

const initialState = {
    isLogin: false
};

export default function login(state = initialState, action) {
    const { type } = action;

    switch (type) {
        case LOGIN:
            return { ...state, isLogin: true };
        case LOGOUT:
            return { ...state, isLogin: false };
        default:
            return state;
    }
}
