import React from "react";
import axios from "axios";
import { URL_API } from "../helper/index";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

function ForgotPassword() {
  // FORMIK Email //
  const emailInitialValues = {
    email: "",
  };
  const emailValidationSchema = Yup.object().shape({
    email: Yup.string().email("Format Email Salah").min(3).required(),
  });

  const submitEmail = (data) => {
    console.log(data.email);

    axios
      .post(URL_API + "/users/forgot-pass", {
        email: data.email,
      })
      .then((res) => {
        if (res.data.success) {
          alert(res.data.message);
        } else {
          alert(res.data.message);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="body">
      <Formik
        initialValues={emailInitialValues}
        onSubmit={submitEmail}
        validationSchema={emailValidationSchema}
      >
        <div className="form-container sign-in-container">
          <Form className="form">
            <h1 className="h1">Submit Your Email</h1>
            <span className="span">email for your account</span>
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
          </Form>
        </div>
      </Formik>
    </div>
  );
}

export default ForgotPassword;
