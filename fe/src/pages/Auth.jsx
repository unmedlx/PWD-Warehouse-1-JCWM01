import React, { useState } from "react";
import { Redirect, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "../assets/styles/Auth.css";
import axios from "axios";
import { API_URL } from "../helper";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

function Auth() {
  // Redux //
  const userGlobal = useSelector((state) => state.users);
  const dispatch = useDispatch();
  // State //
  const [state, setState] = useState({
    btnClick: "signIn",
    redirect: false,
  });
  const [message, setMessage] = useState(null);
  const [message1, setMessage1] = useState(null);

  // FORMIK REGISTER //
  const registerInitialValues = {
    fullName: "",
    username: "",
    email: "",
    password: "",
  };
  const registerValidationSchema = Yup.object().shape({
    fullName: Yup.string().required("Full Name Is Required"),
    username: Yup.string().required("Username Is Required"),
    email: Yup.string()
      .email("Wrong Email Format")
      .min(3)
      .required("Email Is Required"),
    password: Yup.string().min(6).required("Password Is Required"),
  });

  // FORMIK LOGIN //
  const loginInitialValues = {
    email: "",
    password: "",
  };
  const loginValidationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Format Email Salah")
      .min(3)
      .required("Email Is Required "),
    password: Yup.string().min(6).required("Password Is Required"),
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
    setMessage("Loading...");
    //Data Register
    let { fullName, username, email, password } = data;
    //Execute register
    axios
      .post(API_URL + "/users/register", {
        fullName,
        username,
        email,
        password,
      })
      .then((res) => {
        localStorage.setItem("token_shutter", res.data.token);
        dispatch({
          type: "USER_LOGIN",
          payload: res.data.dataUser,
        });
        setMessage("Register success  ✔ ");
        setMessage1("Check Your Email To Verify Your Account ");
        setTimeout(() => setState({ redirect: true }), 3000);
      })
      .catch((err) => {
        setMessage(null);
        console.log(err);
      });
  };

  // LOGIN //
  const login = (data) => {
    setMessage("Loading...");

    //Data Login
    let { email, password } = data;
    //Execute Login
    console.log("axios jalan");
    axios
      .post(API_URL + `/users/login`, {
        email: email,
        password: password,
      })
      .then((res) => {
        // console.log(res);
        if (res.data.success) {
          console.log(res.data.dataUser);
          localStorage.setItem("token_shutter", res.data.token);
          dispatch({
            type: "USER_LOGIN",
            payload: res.data.dataUser,
          });
          setMessage("Login Success ✔");
          setMessage1("Happy Shopping ! :)");

          setTimeout(() => setState({ redirect: true }), 2000);
        } else {
          setMessage(null);
          alert(res.data.message);
        }
      })
      .catch((err) => {
        setMessage(null);
        console.log(err);
      });
  };

  // REDIRECT //
  if (state.redirect) {
    // console.log(userGlobal.idRole);
    if (userGlobal.idRole === 3) {
      return <Redirect to="/" />;
    } else {
      return <Redirect to="/admin" />;
    }
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
                placeholder="Full Name"
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
              <h5 className="h5">{message}</h5>
              <h5 className="h5-light">{message1}</h5>
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
              <Link className="a" to="/forgot-password">
                Forgot your password?
              </Link>
              <button className="button" type="submit">
                Sign In
              </button>
              <h5 className="h5">{message}</h5>
              <h5 className="h5-light">{message1}</h5>
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
