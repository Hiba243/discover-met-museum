import React, { Component } from 'react'

export default class Navbar extends Component {
    static defaultProps = {
        title: 'Github Finder'
    }
    render() {
        return (
            <nav className="navbar bg-primary">
                <h1>{this.props.title}</h1>
            </nav>
        )
    }
}
