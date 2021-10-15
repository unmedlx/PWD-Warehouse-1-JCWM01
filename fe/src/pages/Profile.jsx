import React, { useState } from 'react'
import { useSelector } from 'react-redux';

import '../assets/styles/Profile.css'

import ProfileData from '../components/ProfileData';
import ProfileNavbar from '../components/ProfileNavbar';
import ProfileSidebar from '../components/ProfileSidebar';

const Profile = () => {
    const userGlobal = useSelector((state) => state.users);
    const { fullName, email, userImage, idUser } = userGlobal
    const [show, setShow] = useState(false);
    const reload = () => window.location.reload();

    const handleClose = () => {
        setShow(false);
        reload()
    }
    // const handleShow = () => setShow(true);


    return (
        <>
            <div className="container mt-5">
                <div className="profile-container">


                    <ProfileSidebar />

                    <div className="profile-main">
                        <ProfileNavbar />
                        <div className="profile-main-detail">
                            <h1><strong>Hello, {fullName}</strong></h1>
                            <h6><strong>{email}</strong></h6>
                            <hr className="hr-line" />

                            <ProfileData handleClose={handleClose} />

                        </div>
                    </div>

                </div>
            </div>







        </>
    )
}

export default Profile
