import React,{useContext} from 'react' 
import {Link,useHistory} from 'react-router-dom'
import GithubContext from '../context/github/githubContext';

const UserItem = (user) => {
    const githubContext = useContext(GithubContext);
    let history = useHistory();
    const DeptSearch= () => {
        console.log(user.user.displayName);
        githubContext.getUser(user.user.departmentId,user.user.displayName);
        history.push("/search");
    }
    return (
        <div >  
            <p onClick={DeptSearch}>{user.user.displayName}</p>
        </div>
    )
};

export default UserItem
