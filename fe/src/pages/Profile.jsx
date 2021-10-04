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
                        <button className="btn btn-warning mt-3" onClick={handleShow}>Change Photo Profile</button>
                        <div className="profile-photo-desc mt-3">
                            <p>Besar file: maksimum 10.000.000 bytes (10 Megabytes). Ekstensi file yang diperbolehkan: .JPG .JPEG .PNG</p>
                        </div>
                    </div>

                    <div className="profile-main">
                        <div className="profile-tab">
                            <div><p>PROFILE</p></div>
                            <div><p>HISTORY</p></div>
                            <div><p>ADDRESS</p></div>
                            <div><p>TRANSACTION</p></div>
                        </div>

                        <div className="profile-main-detail">
                            <h6><strong>Ubah Biodata Diri</strong></h6>
                            <p>Name</p>
                            <p>Tanggal Lahir</p>
                            <p>Jenis Kelamin</p>

                            <h6><strong>Ubah Kontak</strong></h6>
                            <p>Name</p>
                            <p>Email</p>
                        </div>
                    </div>

                </div>
            </div>


            <ImageModals show={show} handleClose={handleClose} />




        </>
    )
}

export default Profile
