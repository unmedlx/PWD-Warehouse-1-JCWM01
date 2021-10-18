import React from 'react'
import { Link } from 'react-router-dom';
import '../assets/styles/ProfileNavbar.css'

const ProfileNavbar = () => {
    return (
        <div className="profile-tab">
            <Link to="/profile"><a className="navbar-item">PROFILE</a></Link>
            <Link to="/address"><a className="navbar-item">ADDRESS</a></Link>
            <Link to="/transaction"><a className="navbar-item">TRANSACTION</a></Link>
        </div>
    )
}

export default ProfileNavbar
