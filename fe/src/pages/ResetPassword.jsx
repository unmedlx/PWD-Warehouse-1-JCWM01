import React from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { URL_API } from "../helper/index";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

function ResetPassword() {
  // FORMIK password //
  const passwordInitialValues = {
    password: "",
  };
  const passwordValidationSchema = Yup.object().shape({
    password: Yup.string().min(6).required(),
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
        alert(res.data.message);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="body">
      <Formik
        initialValues={passwordInitialValues}
        onSubmit={submitPassword}
        validationSchema={passwordValidationSchema}
      >
        <div className="form-container sign-in-container">
          <Form className="form">
            <h1 className="h1">Submit Your Password</h1>
            <span className="span">new password for your account</span>
            <ErrorMessage name="password" component="span" className="error" />
            <Field
              name="password"
              type="password"
              placeholder="new password"
              autoComplete="off"
            />
            <ErrorMessage name="password" component="span" className="error" />
            <Field
              name="password"
              type="password"
              placeholder="new password"
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

export default ResetPassword;
