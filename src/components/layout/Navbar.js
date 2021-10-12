import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const Navbar = ({ title }) => {

    return (
        <nav className="navbar">
            <Link to="/"><p>{title}</p></Link>
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/about">About</Link>
                </li>
            </ul>
        </nav>
    )

}

Navbar.defaultProps = {
    title: 'Met Museum Tour'
}
Navbar.propTypes = {
    title: PropTypes.string.isRequired
}
export default Navbar;