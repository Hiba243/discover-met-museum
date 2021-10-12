import {
    SEARCH_DEPARTMENTS,
    SET_LOADING,
    CLEAR_USERS,
    GET_OBJECTS,
    GET_REPOS,
    GET_IMAGES
} from '../types'

const artReducer = (state, action) => {
    switch (action.type) {
        case SEARCH_DEPARTMENTS:

            return {
                ...state,
                departments: action.payload.departments,
                image:action.image,
                loading: false
            }
        case CLEAR_USERS:
            return {
                ...state,
                departments: [],
                loading: false
            }
        case SET_LOADING:
            return {
                ...state,
                loading: true
            }
        case GET_OBJECTS:
            return {
                ...state,
                department: action.name,
                objectID: action.payload.objectIDs,
                image: action.image.primaryImage,
                loading: false
            }
        case GET_IMAGES:
            return {
                ...state,
                image: action.payload.primaryImage,
                loading: false
            }
        case GET_REPOS:
            return {
                ...state,
                repos: action.payload,
                loading: false
            }
        default:
            return state;
    }
}
export default artReducer