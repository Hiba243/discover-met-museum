import React, { useContext,useEffect } from 'react'
import UserItem from './UserItem'
import { Spinner } from '../components/layout/Spinner'
import GithubContext from '../context/github/githubContext'

const Users = () => {
    const githubContext = useContext(GithubContext);
    const {loading,users}=githubContext;
    useEffect(() => {
        if(!loading){
            githubContext.searchUsers();
        }
    }, [])
    if (loading) return <Spinner />
    else
        return (
            <div style={userStyle}>
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
