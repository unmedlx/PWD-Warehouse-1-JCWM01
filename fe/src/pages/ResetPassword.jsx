import React, { useState } from "react";
import { useParams, Redirect } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../constants/API";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import {Spinner} from "react-bootstrap"


function ResetPassword() {
  //STATE//
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState("");
  const [redirect, setRedirect] = useState(false);
  const [loading, setLoading] = useState(false);


  // FORMIK PASSWORD //
  const passwordInitialValues = {
    password: "",
  };
  const passwordValidationSchema = Yup.object().shape({
    password: Yup.string().min(6).required("Password Is Required"),
    confirmPassword: Yup.string().min(6).when("password", {
        is: (val) => (val && val.length > 0 ? true : false),
        then: Yup.string().oneOf(
          [Yup.ref("password")],
          "Both Password Need To Be The Same"
        ),
      })
      .required("Confirm Password Required"),
  });

  // TOKEN FROM URL //
  const params = useParams();

 // SUBMIT NEW PASSWORD //
  const submitPassword = (data) => {
    setLoading(true);
    //Token
    const Token = params.token;
    //Send To API
    axios.patch(`${API_URL}/auth/reset-password`,
        {
          newPassword: data.password,
        },
        {
          headers: {
            authorization: `Bearer ${Token}`,
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        setMessage(res.data.message);
        setSuccess(true);
        setTimeout(() => setRedirect(true), 3000);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
        alert(`${err.message}, Token Expired`);
        setRedirect(true);
      });
  };

  //REDIRECT//
  if (redirect) {
    return <Redirect to="/authentication" />;
  }

  //RENDER//
  return (
    <div className="body">
        {success ? (
          <div className="d-flex flex-column justify-content-center align-items-center">
              <h1 className="h1">{message}</h1>
              <h4>Now You Can Login With Your New Password</h4>
              { loading && 
                    <Spinner animation="border" className="my-1" />
              }
          </div>
        ) : (
          <Formik initialValues={passwordInitialValues} onSubmit={submitPassword} validationSchema={passwordValidationSchema}>
              <div className="forgot-container">
                  <Form className="form">
                      <h1 className="h1">Submit Your New Password</h1>
                      <span className="span">new password for your account</span>
                      <ErrorMessage name="password" component="span" className="error"/>
                      <Field
                        name="password"
                        type="password"
                        placeholder="new password"
                        autoComplete="off"
                      />
                      <ErrorMessage name="confirmPassword" component="span" className="error" />
                      <Field
                        name="confirmPassword"
                        type="password"
                        placeholder="Confirm Password"
                        autoComplete="off"
                      />
                      <button className="button" type="submit">
                        Submit
                      </button>
                      { loading && 
                        <Spinner animation="border" className="my-1" />
                      }
                  </Form>
              </div>
          </Formik>
        )}
    </div>
  );
}

export default ResetPassword;
