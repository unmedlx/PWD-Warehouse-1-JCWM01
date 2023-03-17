import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import "../assets/styles/Auth.css";
import "../assets/styles/Typography.css";
import axios from "axios";
import { API_URL } from "../constants/API";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Spinner } from "react-bootstrap";

function Auth() {
  // Redux //
  const dispatch = useDispatch();
  // State //
  const [state, setState] = useState({
    btnClick: true,
    redirect: false,
  });
  const [loading, setLoading] = useState(false);
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
      .required("Email Is Required"),
    password: Yup.string().min(6).required("Password Is Required"),
    confirmPassword: Yup.string()
      .min(6)
      .when("password", {
        is: (val) => (val && val.length > 0 ? true : false),
        then: Yup.string().oneOf(
          [Yup.ref("password")],
          "Both Password Need To Be The Same"
        ),
      })
      .required("Confirm Password Required"),
  });

  // FORMIK LOGIN //
  const loginInitialValues = {
    email: "",
    password: "",
  };
  const loginValidationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Format Email Salah")
      .required("Email Is Required "),
    password: Yup.string().min(6).required("Password Is Required"),
  });

  // Change Form //
  const signInPage = () => {
    setState({ btnClick: true });
    setLoading(false);
    setMessage1(null);
  };
  const signUpPage = () => {
    setState({ btnClick: false });
    setLoading(false);
    setMessage1(null);
  };

  // REGISTER //
  const register = (data) => {
    setLoading(true);
    //Data Register
    let { fullName, username, email, password } = data;
    //Execute register
    console.log(fullName, username, email, password);
    axios
      .post(`${API_URL}/auth/register`, {
        fullName,
        username,
        email,
        password,
      })
      .then((res) => {
        if (res.data.success) {
          setMessage1(res.data.message);
          setTimeout(() => (window.location = "/"), 4500);
        } else {
          setLoading(false);
          setMessage1(res.data.message);
        }
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
        // setMessage1(err);
      });
  };

  // LOGIN //
  const login = (data) => {
    setLoading(true);
    //Data Login
    let { email, password } = data;
    //Execute Login
    axios
      .post(`${API_URL}/auth/login`, { email, password })
      .then((res) => {
        if (res.data.success) {
          localStorage.setItem("token_shutter", res.data.token);
          if (res.data.dataUser.idRole === 1) {
            dispatch({
              type: "USER_LOGOUT",
            });
            dispatch({
              type: "ADMIN_LOGIN",
              payload: res.data.dataUser,
            });
            window.location = "/warehouse-list";
          } else if (res.data.dataUser.idRole === 2) {
            dispatch({
              type: "USER_LOGOUT",
            });
            dispatch({
              type: "ADMIN_LOGIN",
              payload: res.data.dataUser,
            });
            window.location = "/sales-report";
          } else {
            dispatch({
              type: "ADMIN_LOGOUT",
            });
            dispatch({
              type: "USER_LOGIN",
              payload: res.data.dataUser,
            });
          }
          setLoading(false);
          setMessage1("Happy Shopping ! :)");
        } else {
          setLoading(false);
          setMessage1(res.data.message);
        }
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

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
              <h1 className="title ">Create Account</h1>
              <span className="span">
                Enter your personal details and start journey with us
              </span>
              <Field
                name="fullName"
                type="text"
                placeholder="Full Name"
                autoComplete="off"
                className="input"
              />
              <ErrorMessage
                name="fullName"
                component="span"
                className="error"
              />
              <Field
                name="username"
                type="text"
                placeholder="Username"
                autoComplete="off"
                className="input"
              />
              <ErrorMessage
                name="username"
                component="span"
                className="error"
              />
              <Field
                name="email"
                type="email"
                placeholder="Email"
                autoComplete="off"
                className="input"
              />
              <ErrorMessage name="email" component="span" className="error" />
              <Field
                name="password"
                type="password"
                placeholder="Password"
                autoComplete="off"
                className="input"
              />
              <ErrorMessage
                name="password"
                component="span"
                className="error"
              />
              <Field
                name="confirmPassword"
                type="password"
                placeholder="Confirm Password"
                autoComplete="off"
                className="input"
              />
              <ErrorMessage
                name="confirmPassword"
                component="span"
                className="error"
              />
              <button className="button" type="submit">
                Sign Up
              </button>
              <h5 className="h5-light mt-3">{message1}</h5>
              {loading && <Spinner animation="border" className="mt-3" />}
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
              <h1 className="title subtitle">Sign in</h1>
              <span className="span">login with your account info</span>
              <Field
                name="email"
                type="email"
                placeholder="Email"
                autoComplete="off"
                className="input"
              />
              <ErrorMessage name="email" component="span" className="error" />
              <Field
                name="password"
                type="password"
                placeholder="Password"
                autoComplete="off"
                className="input"
              />
              <ErrorMessage
                name="password"
                component="span"
                className="error"
              />
              <Link className="a" to="/forgot-password">
                Forgot your password?
              </Link>
              <button className="button" type="submit">
                Sign In
              </button>
              <h5 className="h5-light mt-3">{message1}</h5>
              {loading && <Spinner animation="border" className="mt-3" />}
            </Form>
          </div>
        </Formik>

        {/* OVERLAY PANEL */}
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h1 className="title">Welcome Back!</h1>
              <p className="p">
                To keep connected with us please login with your personal info
              </p>
              <button onClick={signInPage} className="ghost button" id="signIn">
                Sign In
              </button>
            </div>

            <div className="overlay-panel overlay-right">
              <h1 className="title">Hello, Friend!</h1>
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
