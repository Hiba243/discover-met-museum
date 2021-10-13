import React, { useContext } from 'react'
import { Link, useHistory } from 'react-router-dom'
import ArtContext from '../../context/metart/artContext';

const DeptCategory = (obj) => {
    const artContext = useContext(ArtContext);
    let history = useHistory();
    const DeptSearch = () => {
        artContext.getObjectsOfDepartment(obj.obj.departmentId, obj.obj.displayName);
        history.push("/search");
    }
    return (
        <div className="deptNameField">
            <p onClick={DeptSearch} className="deptName">~ {obj.obj.displayName}</p>
        </div>
    )
};

export default DeptCategory
