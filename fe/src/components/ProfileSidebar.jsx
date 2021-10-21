import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { API_URL } from '../helper';
import { Link } from 'react-router-dom';

import '../assets/styles/Typography.css'
import ImageModals from '../components/ImageModals';

const ProfileSidebar = () => {
    const userGlobal = useSelector((state) => state.users);
    const { userImage } = userGlobal
    const [show, setShow] = useState(false);

    const handleShow = () => setShow(true);


    const handleClose = () => {
        setShow(false);
        // reload()
    }



    return (
        <>
            <div className="profile-sidebar">
                <div className="profile-picture-container">
                    <img src={`${API_URL}` + userImage} alt="Trulli" className="profilePicture" />
                </div>
                <button className="button-profile mt-3" onClick={handleShow}>Change Photo Profile</button>
                <button className="button-profile mt-3"  >
                    <Link to="/change-password" style={{ textDecoration: 'none', color: 'white' }}>
                        Change Password
                    </Link>
                </button>
                <div className="profile-photo-desc mt-3">
                    <p className="text-smallest subtitle-500">Maximum image size is 5 Megabytes. File extention that supported are: .JPG .JPEG .PNG</p>
                </div>
            </div>

            <ImageModals show={show} handleClose={handleClose} userImage={userImage} />
        </>
    )
}

export default ProfileSidebar
