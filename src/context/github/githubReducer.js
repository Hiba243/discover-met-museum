import {
    SEARCH_USERS,
    SET_LOADING,
    CLEAR_USERS,
    GET_USER,
    GET_REPOS,
    GET_IMAGES
} from '../types'

const githubReducer = (state,action) => {
    switch(action.type){
        case SEARCH_USERS:
            
            return{
                ...state,
                users:action.payload.departments,
                loading: false
            }
        case CLEAR_USERS:
            return{
                ...state,
                users:[],
                loading:false
            }
        case SET_LOADING:
            return{
                ...state,
                loading:true
            }
        case GET_USER:
            return{
                ...state,
                department: action.name,
                user:action.payload.objectIDs,
                image:action.image.primaryImage,
                loading:false
            }
            case GET_IMAGES:
            return{
                ...state,
                image:action.payload.primaryImage,
                loading:false
            }
        case GET_REPOS:
            return{
                ...state,
                repos:action.payload,
                loading:false
            }
        default:
            return state;
    }
}
export default githubReducer