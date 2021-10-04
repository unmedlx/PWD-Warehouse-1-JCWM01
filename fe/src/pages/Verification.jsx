import axios from "axios";
import React from "react";
import { Redirect } from "react-router-dom";

class Verification extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: "Loading...",
      redirect: false,
    };
  }

  componentDidMount() {
    console.log("apakah jalan?");

    axios
      .patch(
        `http://localhost:6000/users/verification`,
        {},
        {
          headers: {
            Authorization: `Bearer ${this.props.match.params.token}`,
          },
        }
      )
      .then((res) => {
        this.setState({ message: "Your Account Verified ✔" });
        setTimeout(
          () => this.setState({ message: "redirecting to home page.." }),
          1500
        );
        setTimeout(() => this.setState({ redirect: true }), 3000);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to="/" />;
    }
    return (
      <div className="container p-5">
        <h2>{this.state.message}</h2>
      </div>
    );
  }
}

export default Verification;
