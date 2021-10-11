import { useReducer } from "react";
import axios from "axios";
import GithubContext from "./githubContext";
import githubReducer from "./githubReducer";

import {
    SEARCH_USERS,
    SET_LOADING,
    CLEAR_USERS,
    GET_USER,
    GET_REPOS,
    GET_IMAGES
} from '../types'

let githubClientId;
let githubClientSecret;
if(process.env.NODE_ENV!=='production'){
    githubClientId=process.env.REACT_APP_GITHUB_CLIENT_ID;
    githubClientSecret=process.env.REACT_APP_GITHUB_CLIENT_SECRET;
}
else{
    githubClientId=process.env.GITHUB_CLIENT_ID;
    githubClientSecret=process.env.GITHUB_CLIENT_SECRET;
}

const GithubState = (props) => {
    const initialState = {
        users: [],
        user: [],
        department:'',
        loading: false,
        repos: [],
        image: ''
    }
    const [state, dispatch] = useReducer(githubReducer, initialState);

    const searchUsers = async () => {
        setLoading();

        const res = await axios.get(`https://collectionapi.metmuseum.org/public/collection/v1/departments`);
        console.log(res);
        dispatch({
            type: SEARCH_USERS,
            payload: res.data
        })
    }
    const clearUsers = () => dispatch({type:CLEAR_USERS});
     
    const setLoading = () => dispatch({ type: SET_LOADING });

    const getUser = async (id,name) => {
        setLoading();
        const res = await axios.get(`https://collectionapi.metmuseum.org/public/collection/v1/search?departmentId=${id}&q=${name}&hasImages=true`)
        let res1
        if(res){
            res1=await axios.get(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${res.data.objectIDs[0]}`)
        }
        console.log(res);
        dispatch({
            type:GET_USER,
            payload: res.data,
            name: name,
            image:res1.data
        })
    }
    const getImages = async (arr)  =>{
        setLoading();
        const res = await axios.get(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${arr}`)
        dispatch({
            type:GET_IMAGES,
            payload: res.data,
        })
    }
    const getUserRepos = async (username) => {
        setLoading();
        const res = await axios.get(`https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${githubClientId}
        &client_secret=${githubClientSecret}`)
        dispatch({
            type:GET_REPOS,
            payload:res.data
        })
    }
      

    return <GithubContext.Provider value={{
        users: state.users,
        user: state.user,
        loading: state.loading,
        repos: state.repos,
        department: state.department,
        image:state.image,
        getImages,
        searchUsers,
        clearUsers,
        getUser,
        getUserRepos
    }}>
        {props.children}
    </GithubContext.Provider>
}

export default GithubState