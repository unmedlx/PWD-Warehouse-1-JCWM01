import React, { useState } from 'react'


import '../assets/styles/Profile.css'
import ImageModals from '../components/ImageModals';


const Profile = () => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

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
                        <div className="profile-tab">
                            <div><p>PROFILE</p></div>
                            <div><p>HISTORY</p></div>
                            <div><p>ADDRESS</p></div>
                            <div><p>TRANSACTION</p></div>
                        </div>

                        <div className="profile-main-detail">
                            <h1><strong>Hello, Nadhif Rafifaiz</strong></h1>
                            <h6><strong>nadhifrafifaiz@gmail.com</strong></h6>
                            <hr />
                            <p><strong>Biodata Diri</strong></p>
                            <div className="profile-main-data">
                                <div className="input-container">
                                    <input type="text" className="input-field" placeholder="Username" value={"nadhif_rafifaiz"} disabled />
                                </div>
                                <div className="input-container">
                                    <input type="text" className="input-field" placeholder="Date of Birth" />
                                </div>
                                <div className="input-container">
                                    <input type="text" className="input-field" placeholder="Email" />
                                </div>
                                <div className="input-container">
                                    <input type="text" className="input-field" placeholder="Gender" />
                                </div>
                                <div className="input-container">
                                    <input type="text" className="input-field" placeholder="Fullname" />
                                </div>
                            </div>

                            <button className="btn btn-warning">Edit Data</button>




                        </div>
                    </div>

                </div>
            </div>


            <ImageModals show={show} handleClose={handleClose} />




        </>
    )
}

export default Profile
