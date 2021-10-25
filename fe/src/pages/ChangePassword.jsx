import React, { useState } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { API_URL } from '../helper';
import '../assets/styles/Auth.css'
import { Redirect } from 'react-router';

const ChangePassword = () => {
    const [redirect, setRedirect] = useState(false)
    // FORMIK PASSWORD //
    const passwordInitialValues = {
        password: "",
        oldPassword: ""
    };

    const passwordValidationSchema = Yup.object().shape({
        oldPassword: Yup.string().min(6).required("Old Password Is Required"),
        password: Yup.string().min(6).required("Password Is Required"),
        confirmPassword: Yup.string()
            .min(6)
            .when("password", {
                is: (val) => (val && val.length > 0 ? true : false),
                then: Yup.string().oneOf(
                    [Yup.ref("password")],
                    "Both Password Need To Be The Same"
                ),
            })
            .required("Confirm Password Required"),
    });



    const submitPassword = (data) => {
        const userLocalStorage = localStorage.getItem("token_shutter");
        console.log(data);
        axios.patch(`${API_URL}/users/change-password`,
            { data },
            {
                headers: {
                    authorization: `Bearer ${userLocalStorage}`,
                },
            }
        )
            .then((res) => {
                console.log(res);
                alert(res.data.message)
                setRedirect(true)
            })
            .catch((err) => {
                console.log(err);
            })

    }
    if (redirect) {
        return <Redirect to="/profile" />
    }


    return (
        <div className="body">

            <Formik
                initialValues={passwordInitialValues}
                onSubmit={submitPassword}
                validationSchema={passwordValidationSchema}

            >

                <div className="forgot-container p-4">
                    <Form className="form">
                        <h1 className="title">Submit Your New Password</h1>
                        <span className="span">New password for your account</span>

                        <ErrorMessage name="oldPassword" component="span" className="error" />
                        <Field name="oldPassword" type="password" placeholder="Old password" autoComplete="off" className="input" />

                        <ErrorMessage name="password" component="span" className="error" />
                        <Field name="password" type="password" placeholder="New password" autoComplete="off" className="input"/>

                        <ErrorMessage name="confirmPassword" component="span" className="error" />
                        <Field name="confirmPassword" type="password" placeholder="Confirm New Password" autoComplete="off" className="input"/>

                        <button className="button mt-2" type="submit">
                            Submit
                        </button>

                    </Form>

                </div>

            </Formik>

        </div>

    )
}

export default ChangePassword
