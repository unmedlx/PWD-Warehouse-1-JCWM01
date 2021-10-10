import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../constants/API";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

function ForgotPassword() {
  // STATE //
  const [redirect, setRedirect] = useState(false);
  const [message, setMessage] = useState(null);

  // FORMIK EMAIL //
  const emailInitialValues = {
    email: "",
  };
  const emailValidationSchema = Yup.object().shape({
    email: Yup.string().email("Wrong Email Format").min(3).required("Your Account Email Is Required"),
  });

  //SUBMIT EMAIL//
  const submitEmail = (data) => {
    setMessage("Loading...");
    //Send to API
    axios.post(`${API_URL}/users/forgot-password`, {
        email: data.email,
      })
      .then((res) => {
        if (res.data.success) {
          alert(res.data.message);
          setMessage("Check Your Email To Reset Password");
          setTimeout(() => setMessage("Redirecting To SignIn... "), 3000);
          setTimeout(() => setRedirect(true), 3000);
        } else {
          alert(res.data.message);
          setMessage(null);
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
            <h1 className="h1">Submit Your Email</h1>
            <span className="span">Your Account Email</span>
            <ErrorMessage name="email" component="span" className="error" />
            <Field
              name="email"
              type="email"
              placeholder="Email"
              autoComplete="off"
            />
            <button className="button" type="submit">
              Submit
            </button>
            <h5 className="h5">{message}</h5>
          </Form>
        </div>
      </Formik>
    </div>
  );
}

export default ForgotPassword;
