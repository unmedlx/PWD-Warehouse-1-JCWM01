
import { useSelector, useDispatch } from 'react-redux';

import '../assets/styles/Profile.css'
import '../assets/styles/Typography.css'


import ProfileData from '../components/ProfileData';
import ProfileNavbar from '../components/ProfileNavbar';
import ProfileSidebar from '../components/ProfileSidebar';
import OngoingTransaction from '../components/Transaction/OngoingTransaction';
import React, { useState, useEffect } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'

import axios from 'axios';
import { API_URL } from '../helper';
import { EditDataProfile } from '../redux/actions/users';



const Profile = () => {
    const dispatch = useDispatch()
    const userGlobal = useSelector((state) => state.users);
    const { fullName, username, email, gender, dateOfBirth } = userGlobal

    const profileDataInitialValues = {
        //diisi dari redux
        username: username,
        dateOfBirth: dateOfBirth,
        email: email,
        gender: gender,
        fullName: fullName
    }

    const profileDataValidationSchema = Yup.object().shape({
        username: Yup.string().required("Username is required"),
        email: Yup.string().email("Email must be a valid email").required("Email is required"),
        gender: Yup.number(),
        fullName: Yup.string().required("Full name is required")
    })

    //Mauskkan data ke database
    const onSubmit = (data) => {
        const userLocalStorage = localStorage.getItem("token_shutter")

        dispatch(
            EditDataProfile(data, userLocalStorage)
        )
    }

    return (
        <>
            <div className="container mt-5">
                <div className="profile-container">
                    <ProfileSidebar />

                    <div className="profile-main">
                        <ProfileNavbar />
                        <div className="profile-main-detail">
                            <h1 className="subtitle">Hello, {fullName}</h1>
                            <h6 className="subtitle-600">{email}</h6>
                            <hr className="hr-line" />

                            {/* <ProfileData handleClose={handleClose} /> */}
                            <>
                                <p><strong>Biodata Diri</strong></p>
                                <Formik initialValues={profileDataInitialValues}
                                    onSubmit={onSubmit}
                                    validationSchema={profileDataValidationSchema}
                                    enableReinitialize={true}
                                >
                                    <Form>
                                        <div className="profile-main-data">

                                            <div className="input-container">
                                                <ErrorMessage name="username" component="span" className="error-message" />
                                                <Field type="text" autocomplete="off" className="form-control box-shadow" name="username" placeholder="Username" disabled />
                                            </div>
                                            <div className="input-container">
                                                <ErrorMessage name="dateOfBirth" component="span" className="error-message" />
                                                <Field type="date" autocomplete="off" className="form-control box-shadow" name="dateOfBirth" placeholder="Date of Birth" />
                                            </div>
                                            <div className="input-container">
                                                <ErrorMessage name="email" component="span" className="error-message" />
                                                <Field type="text" autocomplete="off" className="form-control box-shadow" name="email" placeholder="Email" />
                                            </div>
                                            <div className="input-container">
                                                <ErrorMessage name="gender" component="span" className="error-message" />
                                                <Field as="select" autocomplete="off" className="form-control box-shadow" name="gender" placeholder="Gender">
                                                    <option value="1">Male</option>
                                                    <option value="2" selected>Female</option>
                                                    <option value="3">Rather not to mention</option>
                                                </Field>
                                            </div>
                                            <div className="input-container">
                                                <ErrorMessage name="fullName" component="span" className="error-message" />
                                                <Field type="text" autocomplete="off" className="form-control box-shadow" name="fullName" placeholder="Fullname" />
                                            </div>
                                        </div>
                                        <button type="submit" className="button">Edit Data</button>
                                    </Form>
                                </Formik>

                            </>

                            <OngoingTransaction />
                        </div>
                    </div>

                </div>
            </div>







        </>
    )
}

export default Profile
