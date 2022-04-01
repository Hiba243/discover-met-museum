import React, { Fragment } from 'react'
import Navbar from '../layout/Navbar';
const About = () => {
    return (
        <div className='bg-color'>
            <Navbar />
            <div className="about">
                <h1>About</h1>
                <div>
                    <p>Discover the Met Museum</p>
                    <p>Version 1.0.0</p>
                </div>
            </div>
        </div>
    )
}
export default About;