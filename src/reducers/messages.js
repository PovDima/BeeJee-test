import {
    ASSESSMENTS_GET_REQUEST,
    ASSESSMENTS_GET_SUCCESS,
    ASSESSMENTS_GET_FAIL,
    SEND_NOTIFICATION_REQUEST,
    SEND_NOTIFICATION_SUCCESS,
    SEND_NOTIFICATION_FAIL,
    WINDOWS_GET_REQUEST,
    WINDOWS_GET_SUCCESS,
    WINDOWS_GET_FAIL,
    ABILITIES_GET_REQUEST,
    ABILITIES_GET_SUCCESS,
    ABILITIES_GET_FAIL,
    LINKING_CHANGE
}                    from '../actions/messages';

const initialState = {
    isAssessmentsLoading : false,
    getAssessmentsError  : null,
    isSendLoading        : false,
    sendError            : null,
    windows              : null,
    isGetAbilitiesLoading: false,
    abilities            : [],
    list                 : []
};

export default function participants(state = initialState, action) {
    const { type, list, error, user, id, windows, abilities } = action;

    switch (type) {
        case ASSESSMENTS_GET_REQUEST:
            return { ...state, isAssessmentsLoading: true };
        case ASSESSMENTS_GET_SUCCESS:
            return { ...state, isAssessmentsLoading: false, getAssessmentsError: null, list };
        case ASSESSMENTS_GET_FAIL:
            return { ...initialState, isAssessmentsLoading: false, getAssessmentsError: error };
        case SEND_NOTIFICATION_REQUEST:
            return { ...state, isSendLoading: true };
        case SEND_NOTIFICATION_SUCCESS:
            return {
                ...state,
                isSendLoading: false,
                sendError    : null,
                list         : state.list.map(item => item.id === id ? { ...item, status: 'RERECORD' } : item) };
        case SEND_NOTIFICATION_FAIL:
            return { ...state, isSendLoading: false, sendError: error };
        case WINDOWS_GET_REQUEST:
            return { ...state, isWindowsLoading: true };
        case WINDOWS_GET_SUCCESS:
            return { ...state, isWindowsLoading: false, windows };
        case WINDOWS_GET_FAIL:
            return { ...initialState, isWindowsLoading: false };
        case ABILITIES_GET_REQUEST:
            return { ...state, isGetAbilitiesLoading: true };
        case ABILITIES_GET_SUCCESS:
            return { ...state, isGetAbilitiesLoading: false, abilities };
        case ABILITIES_GET_FAIL:
            return { ...initialState, isGetAbilitiesLoading: false };
        case LINKING_CHANGE:
            return { ...state, user };
        default:
            return state;
    }
}
