import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../constants/API";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import {Spinner} from "react-bootstrap"


function ForgotPassword() {
  // STATE //
  const [redirect, setRedirect] = useState(false);
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [disable, setDisable] = useState(false)


  // FORMIK EMAIL //
  const emailInitialValues = {
    email: "",
  };
  const emailValidationSchema = Yup.object().shape({
    email: Yup.string().email("Wrong Email Format").min(3).required("Your Account Email Is Required"),
  });

  //SUBMIT EMAIL//
  const submitEmail = (data) => {
    setLoading(true);
    setMessage(null);
    //Send to API
    axios.post(`${API_URL}/auth/forgot-password`, {
        email: data.email,
      })
      .then((res) => {
        if (res.data.success) {
            setMessage("Check Your Email To Reset Password");
            setDisable(true)
            alert(res.data.message);
            setTimeout(() => setMessage("Redirecting To SignIn... "), 3000);
            setTimeout(() => setRedirect(true), 3000);
        } else {
            setLoading(false);
            setMessage(res.data.message);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //REDIRECT//
  if (redirect) {
    return <Redirect to="/authentication" />;
  }

  //RENDER//
  return (
    <div className="body">
        <Formik initialValues={emailInitialValues} onSubmit={submitEmail} validationSchema={emailValidationSchema}>
            <div className="forgot-container">
                <Form className="form">
                    <h1 className="title">Submit Your Email</h1>
                    <span className="span">Your Account Email</span>
                    <ErrorMessage name="email" component="span" className="error" />
                    <Field
                      name="email"
                      type="email"
                      placeholder="Email"
                      autoComplete="off"
                      className="input"
                    />
                    <button disabled={disable} className="button" type="submit">
                      Submit
                    </button>
                    <h5 className="h5">{message}</h5>
                    { loading && 
                        <Spinner animation="border" className="my-1" />
                    }
                </Form>
            </div>
        </Formik>
    </div>
  );
}

export default ForgotPassword;
