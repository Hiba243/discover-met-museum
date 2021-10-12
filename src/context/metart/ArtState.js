import { useReducer } from "react";
import axios from "axios";
import artContext from "./artContext";
import artReducer from "./artReducer";

import {
    SEARCH_DEPARTMENTS,
    SET_LOADING,
    CLEAR_USERS,
    GET_OBJECTS,
    GET_REPOS,
    GET_IMAGES
} from '../types'

let githubClientId;
let githubClientSecret;
if (process.env.NODE_ENV !== 'production') {
    githubClientId = process.env.REACT_APP_GITHUB_CLIENT_ID;
    githubClientSecret = process.env.REACT_APP_GITHUB_CLIENT_SECRET;
}
else {
    githubClientId = process.env.GITHUB_CLIENT_ID;
    githubClientSecret = process.env.GITHUB_CLIENT_SECRET;
}

const ArtState = (props) => {
    const initialState = {
        departments: [],
        objectID: [],
        department: '',
        loading: false,
        repos: [],
        image: ''
    }
    const [state, dispatch] = useReducer(artReducer, initialState);

    const searchAllDepartments = async () => {
        setLoading();
        const allImages=[];
        const cancelTokenSource = axios.CancelToken.source();
        const res = await axios.get(`https://collectionapi.metmuseum.org/public/collection/v1/departments`);
        let res1;
        let res2;
        if(res){
            res1=await axios.get(`https://collectionapi.metmuseum.org/public/collection/v1/search?departmentId=${res.data.departments[0].departmentId}&q=${res.data.departments[0].displayName}&hasImages=true`);
        }
        if(res1){
            res2=await axios.get(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${res1.data.objectIDs[0]}`)
        }
        dispatch({
            type: SEARCH_DEPARTMENTS,
            payload: res.data,
            image:res2.data.primaryImage
        })
    }

    const setLoading = () => dispatch({ type: SET_LOADING });

    const getObjectsOfDepartment = async (id, name) => {
        setLoading();
        const res = await axios.get(`https://collectionapi.metmuseum.org/public/collection/v1/search?departmentId=${id}&q=${name}&hasImages=true`)
        let res1
        if (res) {
            res1 = await axios.get(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${res.data.objectIDs[0]}`)
        }

        dispatch({
            type: GET_OBJECTS,
            payload: res.data,
            name: name,
            image: res1.data
        })
    }
    const getImages = async (arr) => {
        setLoading();
        const res = await axios.get(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${arr}`)
        dispatch({
            type: GET_IMAGES,
            payload: res.data,
        })
    }
    const getUserRepos = async (username) => {
        setLoading();
        const res = await axios.get(`https://api.github.com/departments/${username}/repos?per_page=5&sort=created:asc&client_id=${githubClientId}
        &client_secret=${githubClientSecret}`)
        dispatch({
            type: GET_REPOS,
            payload: res.data
        })
    }

    const clearUsers = () => dispatch({ type: CLEAR_USERS });

    return <artContext.Provider value={{
        departments: state.departments,
        objectID: state.objectID,
        loading: state.loading,
        repos: state.repos,
        department: state.department,
        image: state.image,
        getImages,
        searchAllDepartments,
        clearUsers,
        getObjectsOfDepartment,
        getUserRepos
    }}>
        {props.children}
    </artContext.Provider>
}

export default ArtState