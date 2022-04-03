import {
    SEARCH_DEPARTMENTS,
    SET_LOADING,
    CLEAR_OBJECTS,
    GET_OBJECTS,
    GET_IMAGES
} from '../types'

const artReducer = (state, action) => {
    switch (action.type) {
        case SEARCH_DEPARTMENTS:
            return {
                ...state,
                departments: action.payload.departments,
                loading: false
            }
        case CLEAR_OBJECTS:
            return {
                ...state,
                departments: [],
                objectID: [],
                loading: false
            }
        case SET_LOADING:
            return {
                ...state,
                loading: true
            }
        case GET_OBJECTS:
            var arr=action.payload.objectIDs.slice(0,10);
            localStorage.setItem('objId', JSON.stringify(arr));
            return {
                ...state,
                department: action.name,
                objectID: arr,
                loading: false
            }
        default:
            return state;
    }
}
export default artReducer