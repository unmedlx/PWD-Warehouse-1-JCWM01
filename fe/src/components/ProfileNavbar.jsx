import React from 'react'
import { Link } from 'react-router-dom';
import '../assets/styles/ProfileNavbar.css'

const ProfileNavbar = () => {
    return (
        <div className="profile-tab">
            <Link to="/profile"><a>PROFILE</a></Link>
            <Link to="/address"><a>ADDRESS</a></Link>
            <Link to="/transaction"><a>TRANSACTION</a></Link>
        </div>
    )
}

export default ProfileNavbar
