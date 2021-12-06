
import { useSelector, useDispatch } from 'react-redux';
import '../assets/styles/Profile.css'
import '../assets/styles/Typography.css'
import OngoingTransaction from '../components/Transaction/OngoingTransaction';
import React, { useEffect, useState } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import moment from 'moment'
import { EditDataProfile } from '../redux/actions/users';



import styles from '../components/Profile/NewProfileSidebar/NewProfileSidebar.module.css'

import ProfileNavbar from '../components/Profile/NewProfileNavbar/NewProfileNavbar';
import ProfileSidebar from '../components/Profile/NewProfileSidebar/NewProfileSidebar';
// import ProfileSidebar from '../components/ProfileSidebar';


const Profile = () => {
    const dispatch = useDispatch()
    const [activeComponent, setActiveComponent] = useState(0)
    const userGlobal = useSelector((state) => state.users);
    const { fullName, username, email, gender, dateOfBirth } = userGlobal


    const profileDataInitialValues = {
        //diisi dari redux
        username: username,
        dateOfBirth: moment(dateOfBirth).format('YYYY-MM-DD'),
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

    useEffect(() => {
        setActiveComponent(0)
    }, [])

    return (
        <>
            <div className="container mt-5">
                <div className="profile-container">
                    <ProfileSidebar />

                    <div className="profile-main">
                        <ProfileNavbar activeComponent={activeComponent} />
                        <div className="profile-main-detail">
                            <h2 className="subtitle">Profile</h2>
                            <hr className="hr-line" />


                            <p><strong>Edit Profile</strong></p>
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
                                    <button type="submit" className={styles['button-edit-data']}>Edit Data</button>
                                </Form>
                            </Formik>



                            <OngoingTransaction />


                        </div>
                    </div>

                </div>
            </div>







        </>
    )
}

export default Profile
