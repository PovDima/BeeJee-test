
import api               from '../apiSingleton';

export const ASSESSMENTS_GET_REQUEST    = 'ASSESSMENTS_GET_REQUEST';
export const ASSESSMENTS_GET_SUCCESS    = 'ASSESSMENTS_GET_SUCCESS';
export const ASSESSMENTS_GET_FAIL       = 'ASSESSMENTS_GET_FAIL';
export const SEND_NOTIFICATION_REQUEST  = 'SEND_NOTIFICATION_REQUEST';
export const SEND_NOTIFICATION_SUCCESS  = 'SEND_NOTIFICATION_SUCCESS';
export const SEND_NOTIFICATION_FAIL     = 'SEND_NOTIFICATION_FAIL';
export const WINDOWS_GET_REQUEST        = 'WINDOWS_GET_REQUEST';
export const WINDOWS_GET_SUCCESS        = 'WINDOWS_GET_SUCCESS';
export const WINDOWS_GET_FAIL           = 'WINDOWS_GET_FAIL';
export const ABILITIES_GET_REQUEST      = 'ABILITIES_GET_REQUEST';
export const ABILITIES_GET_SUCCESS      = 'ABILITIES_GET_SUCCESS';
export const ABILITIES_GET_FAIL         = 'ABILITIES_GET_FAIL';
export const APPROVE_ASSESSMENT_REQUEST = 'APPROVE_ASSESSMENT_REQUEST';
export const APPROVE_ASSESSMENT_SUCCESS = 'APPROVE_ASSESSMENT_SUCCESS';
export const APPROVE_ASSESSMENT_FAIL    = 'APPROVE_ASSESSMENT_FAIL';
export const APPROVE_ABILITY_REQUEST    = 'APPROVE_ABILITY_REQUEST';
export const APPROVE_ABILITY_SUCCESS    = 'APPROVE_ABILITY_SUCCESS';
export const APPROVE_ABILITY_FAIL       = 'APPROVE_ABILITY_FAIL';
export const LINKING_CHANGE             = 'LINKING_CHANGE';

export function getAssessments(id, studyId, siteId, windowId) {
    return async dispatch => {
        dispatch({
            type: ASSESSMENTS_GET_REQUEST
        });

        try {
            const response = await api.assessments.getAssessments(id, studyId, siteId, windowId);

            if (response.status === 1) {
                dispatch({
                    type: ASSESSMENTS_GET_SUCCESS,
                    list: response.data
                });
            }
        } catch (error) {
            dispatch({
                type: ASSESSMENTS_GET_FAIL,
                error
            });
        }
    };
}

