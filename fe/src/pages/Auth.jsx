import React, { useState, useEffect } from "react";
import "../assets/styles/Auth.css";
import axios from "axios";
import { URL_API } from "../helper";

function Auth() {
  const [state, setState] = useState({
    btnClick: "",
    fullName: "",
    username: "",
    email: "",
    password: "",
    loginEmail: "",
    loginPassword: "",
  });

  const signInPage = () => {
    setState({ btnClick: "signUp" });
    console.log(state.btnClick);
  };

  const signUpPage = () => {
    setState({ btnClick: null });
    console.log(state.btnClick);
  };

  const handleChange = (input) => {
    const value = input.target.value;
    // console.log(value);
    setState({
      ...state,
      [input.target.name]: value,
    });
  };

  const register = () => {
    //Data Register
    let { fullName, username, email, password } = state;
    //Check The Form
    if (
      fullName == undefined ||
      username == undefined ||
      email == undefined ||
      password == undefined
    ) {
      alert("Fill in all the form");
      return;
    } else {
      //Execute register
      axios
        .post(URL_API + "/users/register", {
          fullName,
          username,
          email,
          password,
        })
        .then((res) => {
          alert("Register success  ✔ , check your email to verify");
        })
        .catch((err) => console.log(err));
    }
  };

  const login = () => {
    //Data Login
    let { loginEmail, loginPassword } = state;
    //Check Form
    if (loginEmail == undefined || loginPassword == undefined) {
      alert("Fill in all the form");
      return;
    } else {
      //Execute Login
      axios
        .post(URL_API + `/users/login`, {
          email: loginEmail,
          password: loginPassword,
        })
        .then((res) => {
          localStorage.setItem("token_shutter", res.data.token);
          alert("Login Success ✔");
          setState({ ...state, loginEmail: "", loginPassword: "" });
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <div
      className={`container ${state.btnClick ? "" : "right-panel-active"}`}
      id="container"
    >
      <div className="form-container sign-up-container">
        <div className="form">
          <h1>Create Account</h1>
          <span>Enter your personal details and start journey with us</span>
          <input
            name="fullName"
            value={state.fullName}
            onChange={handleChange}
            type="text"
            placeholder="Name"
          />
          <input
            name="username"
            value={state.username}
            onChange={handleChange}
            type="text"
            placeholder="Username"
          />
          <input
            name="email"
            value={state.email}
            onChange={handleChange}
            type="email"
            placeholder="Email"
          />
          <input
            name="password"
            value={state.password}
            onChange={handleChange}
            type="password"
            placeholder="Password"
          />
          <button onClick={register}>Sign Up</button>
        </div>
      </div>

      <div className="form-container sign-in-container">
        <div className="form">
          <h1>Sign in</h1>
          <span>login with your account info</span>
          <input
            name="loginEmail"
            value={state.loginEmail}
            onChange={handleChange}
            type="email"
            placeholder="Email"
          />
          <input
            name="loginPassword"
            value={state.loginPassword}
            onChange={handleChange}
            type="password"
            placeholder="Password"
          />
          <a href="#">Forgot your password?</a>
          <button onClick={login}>Sign In</button>
        </div>
      </div>

      <div className="overlay-container">
        <div className="overlay">
          <div className="overlay-panel overlay-left">
            <h1>Welcome Back!</h1>
            <p>
              To keep connected with us please login with your personal info
            </p>
            <button onClick={signInPage} className="ghost" id="signIn">
              Sign In
            </button>
          </div>

          <div className="overlay-panel overlay-right">
            <h1>Hello, Friend!</h1>
            <p>Enter your personal details and start journey with us</p>
            <button onClick={signUpPage} className="ghost" id="signUp">
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Auth;
