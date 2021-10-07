import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { useDispatch } from "react-redux";
import "../assets/styles/Auth.css";
import axios from "axios";
import { URL_API } from "../helper";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

function Auth() {
  // State //
  const [state, setState] = useState({
    btnClick: "signIn",
    redirect: false,
  });

  // Redux //
  const dispatch = useDispatch();

  // FORMIK REGISTER //
  const registerInitialValues = {
    fullName: "",
    username: "",
    email: "",
    password: "",
  };
  const registerValidationSchema = Yup.object().shape({
    fullName: Yup.string().required(),
    username: Yup.string().required(),
    email: Yup.string().email("Format Email Salah").min(3).required(),
    password: Yup.string().min(6).required(),
  });

  // FORMIK LOGIN //
  const loginInitialValues = {
    email: "",
    password: "",
  };
  const loginValidationSchema = Yup.object().shape({
    email: Yup.string().email("Format Email Salah").min(3).required(),
    password: Yup.string().min(6).required(),
  });

  // Change Form //
  const signInPage = () => {
    setState({ btnClick: "signUp" });
    console.log(state.btnClick);
  };
  const signUpPage = () => {
    setState({ btnClick: null });
    console.log(state.btnClick);
  };

  // REGISTER //
  const register = (data) => {
    //Data Register
    let { fullName, username, email, password } = data;
    //Execute register
    axios
      .post(URL_API + "/users/register", {
        fullName,
        username,
        email,
        password,
      })
      .then((res) => {
        delete res.data.dataLogin.password;
        localStorage.setItem("token_shutter", res.data.token);
        dispatch({
          type: "USER_LOGIN",
          payload: res.data.dataLogin,
        });
        alert("Register success  ✔ , check your email to verify");
        setState({ redirect: true });
      })
      .catch((err) => console.log(err));
  };

  // LOGIN //
  const login = (data) => {
    //Data Login
    let { email, password } = data;
    //Execute Login
    console.log("axios jalan");
    axios
      .post(URL_API + `/users/login`, {
        email: email,
        password: password,
      })
      .then((res) => {
        // console.log(res);
        if (res.data.success) {
          delete res.data.dataLogin.password;
          localStorage.setItem("token_shutter", res.data.token);
          dispatch({
            type: "USER_LOGIN",
            payload: res.data.dataLogin,
          });
          alert("Login Success ✔");
          setState({ redirect: true });
        } else {
          alert(res.data.messege);
        }
      })
      .catch((err) => console.log(err));
  };

  // REDIRECT //
  if (state.redirect) {
    return <Redirect to="/" />;
  }

  // RENDER //
  return (
    /* Change Form */
    <div className="body">
      <div
        className={` auth-container ${
          state.btnClick ? "" : "right-panel-active"
        }`}
      >
        {/* SIGN UP FORM */}
        <Formik
          initialValues={registerInitialValues}
          onSubmit={register}
          validationSchema={registerValidationSchema}
        >
          <div className="form-container sign-up-container">
            <Form className="form">
              <h1 className="h1">Create Account</h1>
              <span className="span">
                Enter your personal details and start journey with us
              </span>
              <ErrorMessage
                name="fullName"
                component="span"
                className="error"
              />
              <Field
                name="fullName"
                type="text"
                placeholder="Name"
                autoComplete="off"
              />
              <ErrorMessage
                name="username"
                component="span"
                className="error"
              />
              <Field
                name="username"
                type="text"
                placeholder="Username"
                autoComplete="off"
              />
              <ErrorMessage name="email" component="span" className="error" />
              <Field
                name="email"
                type="email"
                placeholder="Email"
                autoComplete="off"
              />
              <ErrorMessage
                name="password"
                component="span"
                className="error"
              />
              <Field
                name="password"
                type="password"
                placeholder="Password"
                autoComplete="off"
              />
              <button className="button" type="submit">
                Sign Up
              </button>
            </Form>
          </div>
        </Formik>

        {/* SIGN IN FORM */}
        <Formik
          initialValues={loginInitialValues}
          onSubmit={login}
          validationSchema={loginValidationSchema}
        >
          <div className="form-container sign-in-container">
            <Form className="form">
              <h1 className="h1">Sign in</h1>
              <span className="span">login with your account info</span>
              <ErrorMessage name="email" component="span" className="error" />
              <Field
                name="email"
                type="email"
                placeholder="Email"
                autoComplete="off"
              />
              <ErrorMessage
                name="password"
                component="span"
                className="error"
              />
              <Field
                name="password"
                type="password"
                placeholder="Password"
                autoComplete="off"
              />
              {/* FORGOT PASSWORD BTN */}
              <a className="a" href="#">
                Forgot your password?
              </a>
              {/*  */}
              <button className="button" type="submit">
                Sign In
              </button>
            </Form>
          </div>
        </Formik>

        {/* OVERLAY PANEL */}
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h1 className="h1">Welcome Back!</h1>
              <p className="p">
                To keep connected with us please login with your personal info
              </p>
              <button onClick={signInPage} className="ghost button" id="signIn">
                Sign In
              </button>
            </div>

            <div className="overlay-panel overlay-right">
              <h1 className="h1">Hello, Friend!</h1>
              <p className="p">
                Enter your personal details and start journey with us
              </p>
              <button onClick={signUpPage} className="ghost button" id="signUp">
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Auth;
