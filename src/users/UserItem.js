import React from 'react' 
import {Link} from 'react-router-dom'

const UserItem = ({user:{login,avatar_url,html_url}}) => {
    return (
        <div className="card text-center">
            <img src={avatar_url} className="" alt="avatar"></img>
            <p>{login}</p>
            <button><Link to={`/user/${login}`}>More</Link></button>
        </div>
    )
};

export default UserItem
