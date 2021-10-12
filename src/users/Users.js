import React, { useContext,useEffect,useState } from 'react'
import UserItem from './UserItem'
import { Spinner } from '../components/layout/Spinner'
import GithubContext from '../context/github/githubContext'

import axios from "axios";

const Users = () => {
    const cancelTokenSource = axios.CancelToken.source();
    const githubContext = useContext(GithubContext);
    const {loading,users}=githubContext;
    const [allImages, setAllImages] = useState([]);
    useEffect(() => {
        if(!loading){
            githubContext.searchUsers();
        }
    }, [])
    useEffect(() => {
        if (users.length > 0 && allImages.length<=0) {
            console.log(users);
          console.log(users.length);
          console.log(allImages);
    
          for (let i = 0; i < users.length; i++) {
           
              axios.get(`https://collectionapi.metmuseum.org/public/collection/v1/search?departmentId=${users[i].departmentId}&q=${users[i].displayName}&hasImages=true`).then(res => {
                  console.log(res);
                // do something with response
                if(res!=null)
                return axios.get(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${res.data.objectIDs[0]}`);                               
              }).then(res => {
                // do something with response               
                setAllImages(prevState => [...prevState, res.data.primaryImage]);               
              }).catch(error => console.log(error.response));
            console.log("here");
          }         
        }
        return () => {
          // Anything in here is fired on component unmount.
          
      }
      }, [users])
    if (loading) return <Spinner />
    else
        return (
            <div className="deptFlex">
                {users.map(user => (
                    <UserItem key={user.departmentId} user={user}></UserItem>
                ))}
            </div>
        )
}
const userStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(3,1fr)',
    gridGap: '1rem'
}
export default Users
