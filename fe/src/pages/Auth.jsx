import React from "react";
import "../assets/styles/Auth.css";
import axios from "axios";

class Auth extends React.Component {
  state = {
    isBtnClick: "",
    fullName: "",
    username: "",
    email: "",
    password: "",
  };

  signInBtn = () => {
    this.setState({ isBtnClick: "signUp" });
    console.log(this.state.isBtnClick);
  };

  signUpBtn = () => {
    this.setState({ isBtnClick: null });
    console.log(this.state.isBtnClick);
  };

  inputHandler = (event) => {
    const value = event.target.value;
    const name = event.target.name;
    this.setState({ [name]: value });
  };

  btnRegister = () => {
    let { fullName, username, email, password } = this.state;
    console.log(fullName, username, email, password);

    if (fullName == "" || username == "" || email == "" || password == "") {
      alert("Fill in all the form");
    }
    console.log("axios jalan");
    axios
      .post(
        "http://localhost:6000/users/register",
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

  render() {
    return (
      <div>
        <div
          className={`container ${
            this.state.isBtnClick ? "" : "right-panel-active"
          }`}
          id="container"
        >
          <div className="form-container sign-up-container">
            <form action="#">
              <h1>Create Account</h1>
              <span>or use your email for registration</span>
              <input
                name="fullName"
                onChange={this.inputHandler}
                type="text"
                placeholder="Name"
              />
              <input
                name="username"
                onChange={this.inputHandler}
                type="text"
                placeholder="Username"
              />
              <input
                name="email"
                onChange={this.inputHandler}
                type="email"
                placeholder="Email"
              />
              <input
                name="password"
                onChange={this.inputHandler}
                type="password"
                placeholder="Password"
              />
              <button onClick={this.btnRegister}>Sign Up</button>
            </form>
          </div>

          <div className="form-container sign-in-container">
            <form action="#">
              <h1>Sign in</h1>
              <div className="social-container">
                <a href="#" className="social">
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a href="#" className="social">
                  <i className="fab fa-google-plus-g"></i>
                </a>
                <a href="#" className="social">
                  <i className="fab fa-linkedin-in"></i>
                </a>
              </div>
              <span>or use your account</span>
              <input type="email" placeholder="Email" />
              <input type="password" placeholder="Password" />
              <a href="#">Forgot your password?</a>
              <button>Sign In</button>
            </form>
          </div>
          <div className="overlay-container">
            <div className="overlay">
              <div className="overlay-panel overlay-left">
                <h1>Welcome Back!</h1>
                <p>
                  To keep connected with us please login with your personal info
                </p>
                <button onClick={this.signInBtn} className="ghost" id="signIn">
                  Sign In
                </button>
              </div>

              <div className="overlay-panel overlay-right">
                <h1>Hello, Friend!</h1>
                <p>Enter your personal details and start journey with us</p>
                <button onClick={this.signUpBtn} className="ghost" id="signUp">
                  Sign Up
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Auth;
