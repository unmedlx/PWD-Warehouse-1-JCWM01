import React from 'react'
import { Link } from 'react-router-dom';
import '../assets/styles/ProfileNavbar.css'
import { FaUserAlt, FaBook, FaBuilding } from 'react-icons/fa'

const ProfileNavbar = () => {
    return (
        <div className="profile-tab">
            <Link to="/profile"><a className="navbar-item"><FaUserAlt className="me-2" />PROFILE</a></Link>
            <Link to="/address"><a className="navbar-item"><FaBuilding className="me-2" />ADDRESS</a></Link>
            <Link to="/transaction"><a className="navbar-item"><FaBook className="me-2" />TRANSACTION</a></Link>
        </div>
    )
}

export default ProfileNavbar
