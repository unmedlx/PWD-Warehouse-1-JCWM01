import React from 'react'

const ProfileNavbar = ({ profileNav, setProfileNav }) => {
    return (
        <div className="profile-tab">
            <div><a onClick={() => setProfileNav(1)}>PROFILE</a></div>
            <div><a onClick={() => setProfileNav(2)}>ADDRESS</a></div>
        </div>
    )
}

export default ProfileNavbar
