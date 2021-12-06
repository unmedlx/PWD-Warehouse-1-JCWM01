import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';

import '../assets/styles/Profile.css'
import ImageModals from '../components/ImageModals';
import ProfileAddress from '../components/ProfileAddress';
// import ProfileSidebar from '../components/ProfileSidebar';

import ProfileNavbar from '../components/Profile/NewProfileNavbar/NewProfileNavbar';
import ProfileSidebar from '../components/Profile/NewProfileSidebar/NewProfileSidebar';


const Address = () => {
    const [activeComponent, setActiveComponent] = useState(0)
    const userGlobal = useSelector((state) => state.users);
    const addressGlobal = useSelector((state) => state.addresses);
    const { userImage } = userGlobal
    const [show, setShow] = useState(false);

    const reload = () => window.location.reload();

    const handleClose = () => {
        setShow(false);
        reload()
    }
    useEffect(() => {
        setActiveComponent(1)
    }, [])

    return (
        <>
            <div className="container mt-5">
                <div className="profile-container">
                    <ProfileSidebar />

                    <div className="profile-main">

                        <ProfileNavbar activeComponent={activeComponent} />
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
