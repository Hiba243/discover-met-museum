import React,{useContext} from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import ArtContext from '../../context/metart/artContext'
const Navbar = ({ title ,style}) => {
    const artContext=useContext(ArtContext);
    if(!artContext.loading)
    return (
        <nav className="navbar">
            <Link to="/"><p>{title}</p></Link>
            <ul className='nav-flex'>
            <li>
                    <Link to="/choosedept">Departments</Link>
                </li>
                <li>
                    <Link to="/about">About</Link>
                </li>
            </ul>
        </nav>
    )
    else return ''

}

Navbar.defaultProps = {
    title: 'Discover the Met Museum'
}
Navbar.propTypes = {
    title: PropTypes.string.isRequired
}
export default Navbar;