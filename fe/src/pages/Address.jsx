import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import '../assets/styles/Profile.css'
import ImageModals from '../components/ImageModals';
import ProfileAddress from '../components/ProfileAddress';
import ProfileSidebar from '../components/ProfileSidebar';
import { API_URL } from '../helper';


const Address = () => {
    const userGlobal = useSelector((state) => state.users);
    const addressGlobal = useSelector((state) => state.addresses);
    const { fullName, email, userImage, idUser } = userGlobal
    const [show, setShow] = useState(false);

    const reload = () => window.location.reload();

    const handleClose = () => {
        setShow(false);
        reload()
    }

    return (
        <>
            <div className="container mt-5">
                <div className="profile-container">
                    <ProfileSidebar />

                    <div className="profile-main">
                        {/* <ProfileNavbar /> */}

                        <div className="profile-main-detail">
                            <h2 className="subtitle">Address</h2>
                            {/* <h6 className="subtitle-600">{email}</h6> */}
                            <hr className="hr-line" />

                            <ProfileAddress addressGlobal={addressGlobal} />
                        </div>
                    </div>

                </div>
            </div>


            <ImageModals show={show} handleClose={handleClose} userImage={userImage} />




        </>
    )
}

export default Address
