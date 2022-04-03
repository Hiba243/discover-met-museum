import { useReducer } from "react";
import axios from "axios";
import artContext from "./artContext";
import artReducer from "./artReducer";

import {
    SEARCH_DEPARTMENTS,
    SET_LOADING,
    CLEAR_OBJECTS,
    GET_OBJECTS,
    GET_IMAGES
} from '../types'

let ClientId;
let ClientSecret;
if (process.env.NODE_ENV !== 'production') {
    ClientId = process.env.REACT_APP__CLIENT_ID;
    ClientSecret = process.env.REACT_APP__CLIENT_SECRET;
}
else {
    ClientId = process.env._CLIENT_ID;
    ClientSecret = process.env._CLIENT_SECRET;
}

const ArtState = (props) => {
    const initialState = {
        departments: [],
        objectID: [],
        department: '',
        loading: false,
    }
    const [state, dispatch] = useReducer(artReducer, initialState);

    const searchAllDepartments = async () => {
        setLoading();
        const res = await axios.get(`https://collectionapi.metmuseum.org/public/collection/v1/departments`);
        localStorage.setItem('deptInfo', JSON.stringify(res.data.departments));
        dispatch({
            type: SEARCH_DEPARTMENTS,
            payload: res.data,
        })
    }

    const setLoading = () => dispatch({ type: SET_LOADING });

    const getObjectsOfDepartment = async (id, name) => {
        setLoading();
        const res = await axios.get(`https://collectionapi.metmuseum.org/public/collection/v1/search?departmentId=${id}&q=${name}&hasImages=true`)
        localStorage.setItem('objId', JSON.stringify(res.data.objectIDs));
        localStorage.setItem('deptName', JSON.stringify(name));
        dispatch({
            type: GET_OBJECTS,
            payload: res.data,
            name: name,
        })
    }

    const clearObjects = () => dispatch({ type: CLEAR_OBJECTS });

    return <artContext.Provider value={{
        departments: state.departments,
        objectID: state.objectID,
        loading: state.loading,
        department: state.department,
        searchAllDepartments,
        clearObjects,
        getObjectsOfDepartment,
    }}>
        {props.children}
    </artContext.Provider>
}

export default ArtState