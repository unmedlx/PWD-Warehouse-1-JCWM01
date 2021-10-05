import axios from 'axios';
import React, { useState, useEffect } from 'react'


import '../assets/styles/Profile.css'
import ImageModals from '../components/ImageModals';
import ProfileAddress from '../components/ProfileAddress';
import ProfileData from '../components/ProfileData';
import ProfileNavbar from '../components/ProfileNavbar';
import { API_URL } from '../helper';


const Profile = () => {
    const [show, setShow] = useState(false);
    const [profileNav, setProfileNav] = useState(1)


    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const fetchDataUser = () => {
        axios.get(`${API_URL}/users/1`)
            .then(res => {
                console.log(res.data[0]);
            })
            .catch(err => {
                console.log(err);
            })
    }

    useEffect(() => {
        fetchDataUser() //data sama alamat
    }, [])

    return (
        <>

            <div className="container mt-5">
                <div className="profile-container">

                    <div className="profile-sidebar">
                        <div className="">
                            <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" alt="Trulli" className="profilePicture" />
                        </div>
                        <button className="btn btn-dark mt-3" onClick={handleShow}>Change Photo Profile</button>
                        <div className="profile-photo-desc mt-3">
                            <p>Besar file: maksimum 10.000.000 bytes (10 Megabytes). Ekstensi file yang diperbolehkan: .JPG .JPEG .PNG</p>
                        </div>
                        <button className="btn btn-light mt-3">Change Password</button>
                    </div>

                    <div className="profile-main">
                        <ProfileNavbar profileNav={profileNav} setProfileNav={setProfileNav} />
                        <div className="profile-main-detail">
                            <h1><strong>Hello, Nadhif Rafifaiz</strong></h1>
                            <h6><strong>nadhifrafifaiz@gmail.com</strong></h6>
                            <hr />
                            {profileNav == 1 ?
                                <ProfileData />
                                : profileNav == 2 ?
                                    <>
                                        <ProfileAddress />
                                        <ProfileData />
                                    </>
                                    : null
                            }

                        </div>
                    </div>

                </div>
            </div>


            <ImageModals show={show} handleClose={handleClose} />




        </>
    )
}

export default Profile
