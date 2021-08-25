import React from 'react'
import PropTypes from 'prop-types' 

const UserItem = ({user:{login,avatar_url,html_url}}) => {
    return (
        <div className="card text-center">
            <img src={avatar_url} className=""></img>
            <p>{login}</p>
            <button><a href={html_url}>More</a></button>
        </div>
    )
};

export default UserItem
