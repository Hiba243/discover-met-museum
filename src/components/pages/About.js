import React from 'react'
import Navbar from '../layout/Navbar';
const About = () => {
    return (
        <div className='bg-color'>
            <Navbar />
            <div className="about">
                <h1>About</h1>
                <div>
                    <p>View the art from Met Museum of New York. Developed by Hiba Fatima using React, react-gallery-carousel and the met collection API.</p>
                    <br/>
                    <p>Version 1.0.0</p>
                </div>
            </div>
        </div>
    )
}
export default About;