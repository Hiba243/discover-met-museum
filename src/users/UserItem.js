import React,{useContext} from 'react' 
import {Link,useHistory} from 'react-router-dom'
import GithubContext from '../context/github/githubContext';

const UserItem = (user,images) => {
    const githubContext = useContext(GithubContext);
    let history = useHistory();
    const DeptSearch= () => {
        
        githubContext.getUser(user.user.departmentId,user.user.displayName);
        history.push("/search");
    }
    return (
        <div className="deptNameField">  
            <p onClick={DeptSearch} className="deptName">{user.user.displayName}</p>
        </div>
    )
};

export default UserItem
