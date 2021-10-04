import React, { useState, useEffect } from "react";
import "../assets/styles/Auth.css";
import axios from "axios";

function AuthFunction() {
  const [state, setState] = useState({
    btnClick: "",
    fullName: "",
    username: "",
    email: "",
    password: "",
  });

  // const [btnClick, setBtnClick] = useState("");
  // const [fullName, setFullName] = useState("");
  // const [username, setUsername] = useState("");
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  // state = {
  //   isBtnClick: "",
  //   fullName: "",
  //   username: "",
  //   email: "",
  //   password: "",
  // };

  const signInBtn = () => {
    setBtnClick("signUp");
    console.log(btnClick);
  };

  const signUpBtn = () => {
    setBtnClick(null);
    console.log(btnClick);
  };

  const handleChange = (input) => {
    const value = input.target.value;
    setState({
      ...state,
      [input.target.name]: value,
    });
  };

  // const inputHandler = (event) => {
  //   const value = event.target.value;
  //   const name = event.target.name;
  //   this.setState({ [name]: value });
  // };

  const btnRegister = () => {
    let { fullName, username, email, password } = state;
    console.log(fullName, username, email, password);

    if (fullName == "" || username == "" || email == "" || password == "") {
      alert("Fill in all the form");
    }
    console.log("axios jalan");
    axios
      .post(
        "http://localhost:3001/users/register",
        {
          fullName,
          username,
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json;charset=UTF-8",
            "Access-Control-Allow-Origin": "*",
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        alert("Register success, check your email to verify");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <div
        className={`container ${state.btnClick ? "" : "right-panel-active"}`}
        id="container"
      >
        <div className="form-container sign-up-container">
          <div className="form">
            <h1>Create Account</h1>
            <span>or use your email for registration</span>
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
            <button onClick={btnRegister}>Sign Up</button>
          </div>
        </div>

        <div className="form-container sign-in-container">
          <div className="form">
            <h1>Sign in</h1>

            <span>or use your account</span>
            <input type="email" placeholder="Email" />
            <input type="password" placeholder="Password" />
            <a href="#">Forgot your password?</a>
            <button>Sign In</button>
          </div>
        </div>
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h1>Welcome Back!</h1>
              <p>
                To keep connected with us please login with your personal info
              </p>
              <button onClick={signInBtn} className="ghost" id="signIn">
                Sign In
              </button>
            </div>

            <div className="overlay-panel overlay-right">
              <h1>Hello, Friend!</h1>
              <p>Enter your personal details and start journey with us</p>
              <button onClick={signUpBtn} className="ghost" id="signUp">
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuthFunction;
