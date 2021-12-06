import React, { useState } from "react";
import { useSelector } from "react-redux";
import { API_URL } from "../../../helper";
import { Link } from "react-router-dom";

import styles from './NewProfileSidebar.module.css'
import "../../../assets/styles/Typography.css"


import ImageModals from "../../ImageModals";
import ProfileNavbar from "../../ProfileNavbar";


const ProfileSidebar = () => {
    const userGlobal = useSelector((state) => state.users);
    const { userImage } = userGlobal;
    const [show, setShow] = useState(false);

    const handleShow = () => setShow(true);

    const handleClose = () => {
        setShow(false);
        // reload()
    };

    return (
        <>
            <div className={styles['profile-sidebar']}>
                <img
                    src={`${API_URL}` + userImage}
                    alt="Trulli"
                    className={styles["profile-picture"]}
                />

                <h3 className="subtitle">{userGlobal.fullName}</h3>
                <h6>{userGlobal.email}</h6>
                <button className={styles["button-profile"]} onClick={handleShow}>
                    Change Photo Profile
                </button>
                <button className={styles["button-profile"]} >
                    <Link
                        to="/change-password"
                        style={{ textDecoration: "none", color: "white" }}
                    >
                        Change Password
                    </Link>
                </button>

            </div>

            <ImageModals
                show={show}
                handleClose={handleClose}
                userImage={userImage}
            />
        </>
    );
};

export default ProfileSidebar;
