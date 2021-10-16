import React, { useState } from "react";
import { Redirect, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "../assets/styles/Auth.css";
import axios from "axios";
import { API_URL } from "../constants/API";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

function Auth() {
  // Redux //
  const userGlobal = useSelector((state) => state.users);
  const adminGlobal = useSelector((state) => state.admins);
  const dispatch = useDispatch();
  // State //
  const [state, setState] = useState({
    btnClick: true,
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
    email: Yup.string().email("Wrong Email Format").required("Email Is Required"),
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

  // FORMIK LOGIN //
  const loginInitialValues = {
    email: "",
    password: "",
  };
  const loginValidationSchema = Yup.object().shape({
    email: Yup.string().email("Format Email Salah").required("Email Is Required "),
    password: Yup.string().min(6).required("Password Is Required"),
  });

  // Change Form //
  const signInPage = () => {
    setState({ btnClick: true });
    console.log(state.btnClick);
    setMessage(null)
    setMessage1(null)
  };
  const signUpPage = () => {
    setState({ btnClick: false });
    console.log(state.btnClick);
    setMessage(null)
    setMessage1(null)
  };

  // REGISTER //
  const register = (data) => {
    console.log(data);
    setMessage("Loading...");
    //Data Register
    let { fullName, username, email, password } = data;
    //Execute register
    axios.post(API_URL + "/users/register", { fullName, username, email, password, })
      .then((res) => {
        console.log(res.data);
        if (res.data.success) {
          localStorage.setItem("token_shutter", res.data.token);
          dispatch({
            type: "USER_LOGIN",
            payload: res.data.dataUser,
          });
          alert(res.data.message)
          setTimeout(() => setState({ redirect: true }), 3000);
        } else {
          setMessage(res.data.message);
          setMessage1(res.data.message1);
        }
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
    axios.post(`${API_URL}/users/login`, { email, password, })
      .then((res) => {
        if (res.data.success) {
          console.log(res.data.dataUser);
          localStorage.setItem("token_shutter", res.data.token);
          if (res.data.dataUser.idRole == 1) {
            window.location = "/admin"
            dispatch({
              type: "ADMIN_LOGIN",
              payload: res.data.dataUser
            })
            dispatch({
              type: "USER_LOGOUT",
            });
          } else if (res.data.dataUser.idRole == 2) {
            window.location = "/admin"
            dispatch({
              type: "ADMIN_LOGIN",
              payload: res.data.dataUser
            })
            dispatch({
              type: "USER_LOGOUT",
            });
          }else {
            dispatch({
              type: "USER_LOGIN",
              payload: res.data.dataUser,
            })
            dispatch({
              type: "ADMIN_LOGOUT",
            });
          }
          setMessage("Login Success ✔");
          setMessage1("Happy Shopping ! :)");
          // setState({ redirect: true })
        } else {
          setMessage(null);
          setMessage(res.data.message)
          // alert(res.data.message);
        }
      })
      .catch((err) => {
        setMessage(null);
        console.log(err);
      });
  };

  // REDIRECT //
  if (state.redirect) {
    if (adminGlobal.idRole == 2) {
      return <Redirect to="/admin" />;
    } else if (adminGlobal.idRole == 1) {
      return <Redirect to="/admin" />;
    // }else {
    //   return <Redirect to="/" />;
    }
  }

  // RENDER //
  return (
    /* Change Form */
    <div className="body">
      <div className={` auth-container ${state.btnClick ? "" : "right-panel-active"}`}>
        {/* SIGN UP FORM */}
        <Formik initialValues={registerInitialValues} onSubmit={register} validationSchema={registerValidationSchema}>
          <div className="form-container sign-up-container">
            <Form className="form">
              <h1 className="h1">Create Account</h1>
              <span className="span"> Enter your personal details and start journey with us</span>
              <ErrorMessage name="fullName" component="span" className="error" />
              <Field
                name="fullName"
                type="text"
                placeholder="Full Name"
                autoComplete="off"
              />
              <ErrorMessage name="username" component="span" className="error" />
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
              <ErrorMessage name="password" component="span" className="error" />
              <Field
                name="password"
                type="password"
                placeholder="Password"
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
                Sign Up
              </button>
              <h5 className="h5">{message}</h5>
              <h5 className="h5-light">{message1}</h5>
            </Form>
          </div>
        </Formik>

        {/* SIGN IN FORM */}
        <Formik initialValues={loginInitialValues} onSubmit={login} validationSchema={loginValidationSchema} >
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
              <ErrorMessage name="password" component="span" className="error" />
              <Field
                name="password"
                type="password"
                placeholder="Password"
                autoComplete="off"
              />
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
              <p className="p"> To keep connected with us please login with your personal info</p>
              <button onClick={signInPage} className="ghost button" id="signIn">
                Sign In
              </button>
            </div>

            <div className="overlay-panel overlay-right">
              <h1 className="h1">Hello, Friend!</h1>
              <p className="p"> Enter your personal details and start journey with us</p>
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
