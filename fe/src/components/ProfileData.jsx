import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import Axios from 'axios'



const ProfileData = () => {

    const initialValues = {
        username: "",
        dateOfBirth: "",
        email: "",
        gender: 3,
        fullName: ""
    }
    const validationScheme = Yup.object().shape({
        username: Yup.string(),
        dateOfBirth: Yup.string().required(),
        email: Yup.string().min(3).required(),
        gender: Yup.string(),
        fullName: Yup.string().required()
    })

    const onSubmit = (data) => {
        console.log(data);
    }

    return (
        <>
            <p><strong>Biodata Diri</strong></p>
            <Formik initialValues={initialValues}
                onSubmit={onSubmit}
                validationSchema={validationScheme}
            >
                <Form>
                    <div className="profile-main-data">

                        <div className="input-container">
                            <ErrorMessage name="username" component="span" />
                            <Field type="text" autocomplete="off" className="input-field" name="username" placeholder="Username" disabled />
                        </div>
                        <div className="input-container">
                            <ErrorMessage name="dateOfBirth" component="span" />
                            <Field type="date" autocomplete="off" className="input-field" name="dateOfBirth" placeholder="Date of Birth" />
                        </div>
                        <div className="input-container">
                            <ErrorMessage name="email" component="span" />
                            <Field type="text" autocomplete="off" className="input-field" name="email" placeholder="Email" />
                        </div>
                        <div className="input-container">
                            <ErrorMessage name="gender" component="span" />
                            <Field as="select" autocomplete="off" className="input-field" name="gender" placeholder="Gender">
                                <option value="1">Male</option>
                                <option value="2" selected>Female</option>
                                <option value="3">Rather not to mention</option>
                            </Field>
                        </div>
                        <div className="input-container">
                            <ErrorMessage name="fullName" component="span" />
                            <Field type="text" autocomplete="off" className="input-field" name="fullName" placeholder="Fullname" />
                        </div>
                    </div>
                    <button type="submit" className="btn btn-warning">Edit Data</button>
                </Form>
            </Formik>

        </>
    )
}

export default ProfileData
