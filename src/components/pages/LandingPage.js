import React from 'react'
import { Link } from 'react-router-dom'
const LandingPage = () => {
    return (
        <div className='home-landing'>
            <h1 className="landing-page-heading home-heading">Welcome to the Meteropolitan Museum of New York</h1>
            <Link to="/choosedept"><button>Begin Tour</button></Link>
        </div>
    )
}
export default LandingPage