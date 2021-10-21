import React from 'react'
import { Link } from 'react-router-dom'

import '../../assets/styles/UserNavbar.css'

const UserNavbar = () => {
    return (
        <div className="navbar-container">
            <div className="logo-container">
                <h4 className="subtitle">Brange</h4>
            </div>
            <nav className="nav-link-container">
                <ul className="nav-links m-0 p-0">
                    <li><a href="" className="nav-link subtitle-600">Home</a></li>
                    <li><a href="/product-list" className="nav-link subtitle-600">Products</a></li>
                    <li><a href="" className="nav-link subtitle-600">About</a></li>
                </ul>
            </nav>
            <div className="auth">
                <div>
                    <Link to="/authentication" className="auth-link">
                        <button className="button-auth" >
                            Sign Up
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default UserNavbar
