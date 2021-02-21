import React, {useContext} from 'react'
import {NavLink, useHistory} from 'react-router-dom'
import {AuthContext} from '../context/AuthContext'

export const Navbar = () => {
    const history = useHistory()
    const auth = useContext(AuthContext)

    const logoutHandler = event => {
        event.preventDefault()
        auth.logout()
        history.push('/')
    }

    return (
        <nav className="navbar-fixed grey darken-1" role="navigation">
            <div className="nav-wrapper container"><span className="brand-logo">WeightHack</span>
                <a href="#" data-target="" className="sidenav-trigger"><i className="material-icons">menu</i></a>
                <ul className="right hide-on-med-and-down">
                    <li className="active"><NavLink to="/Dashboard">Личный кабинет</NavLink></li>
                    <li><a href="/" onClick={logoutHandler}>Выйти</a></li>
                </ul>
                <ul id="nav-mobile" className="sidenav">
                    <li className="active"><NavLink to="/Dashboard">Dashboard</NavLink></li>
                    <li><a href="/" onClick={logoutHandler}>Выйти</a></li>
                </ul>
            </div>
        </nav>
    )
}