import React from 'react'
import { Link } from 'react-router-dom';
import styles from './NewProfileNavbar.module.css'
import { FaUserAlt, FaBook, FaBuilding } from 'react-icons/fa'

const ProfileNavbar = ({ activeComponent }) => {
    return (
        <div className={styles["profile-tab"]}>
            <Link to="/profile" className={(activeComponent === 0 ? styles["profile-tab-a-active"] : styles["profile-tab-a"])}>PROFILE</Link>
            <Link to="/address" className={(activeComponent === 1 ? styles["profile-tab-a-active"] : styles["profile-tab-a"])}>ADDRESS</Link>
            <Link to="/transaction" className={(activeComponent === 2 ? styles["profile-tab-a-active"] : styles["profile-tab-a"])}>TRANSACTION</Link>
        </div>
    )
}

export default ProfileNavbar
