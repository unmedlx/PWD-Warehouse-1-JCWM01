import React, { useState } from "react";
import { useParams, Redirect } from "react-router-dom";
import axios from "axios";
import { URL_API } from "../helper/index";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

function ResetPassword() {
  //STATE//
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState("");
  const [redirect, setRedirect] = useState(false);

  // FORMIK password //
  const passwordInitialValues = {
    password: "",
  };
  const passwordValidationSchema = Yup.object().shape({
    password: Yup.string().min(6).required("Password Required"),
    confirmPassword: Yup.string()
      .min(6)
      .when("password", {
        is: (val) => (val && val.length > 0 ? true : false),
        then: Yup.string().oneOf(
          [Yup.ref("password")],
          "Both password need to be the same"
        ),
      })
      .required("Confirm Password Required"),
  });

  //Token
  const params = useParams();
  const Token = params.token;

  const submitPassword = (data) => {
    axios
      .patch(
        URL_API + "/users/reset-pass",
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
        setTimeout(() => setRedirect(true), 4000);

        // alert(res.data.message);
      })
      .catch((err) => {
        alert(err.message);
        console.log(err);
        setRedirect(true);
      });
  };

  //REDIRECT//
  if (redirect) {
    return <Redirect to="/authentication" />;
  }

  return (
    <div className="body">
      {success ? (
        <div>
          <h1 className="h1">{message}</h1>
          <h4>Now You Can Login With Your New Password</h4>
        </div>
      ) : (
        <Formik
          initialValues={passwordInitialValues}
          onSubmit={submitPassword}
          validationSchema={passwordValidationSchema}
        >
          <div className="forgot-container">
            <Form className="form">
              <h1 className="h1">Submit Your New Password</h1>
              <span className="span">new password for your account</span>
              <ErrorMessage
                name="password"
                component="span"
                className="error"
              />
              <Field
                name="password"
                type="password"
                placeholder="new password"
                autoComplete="off"
              />
              <ErrorMessage
                name="confirmPassword"
                component="span"
                className="error"
              />
              <Field
                name="confirmPassword"
                type="password"
                placeholder="Confirm Password"
                autoComplete="off"
              />
              <button className="button" type="submit">
                Submit
              </button>
            </Form>
          </div>
        </Formik>
      )}
    </div>
  );
}

export default ResetPassword;
