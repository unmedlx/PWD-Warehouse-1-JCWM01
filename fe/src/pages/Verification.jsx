import React from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function Verification() {
  const [message, setMessage] = useState("Loading...");
  const [redirect, setRedirect] = useState(false);
  //Get Token From url
  const params = useParams();

  const verify = () => {
    console.log(params.token);
    axios
      .patch(
        `http://localhost:3001/users/verification`,
        {},
        {
          headers: {
            authorization: `Bearer ${params.token}`,
          },
        }
      )
      .then((res) => {
        setMessage("Your Account Verified ✔");
        setTimeout(() => setMessage("redirecting to home page.."), 1500);
        setTimeout(() => setRedirect(true), 3000);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    verify();
  });

  if (redirect) {
    return <Redirect to="/" />;
  }

  return (
    <div className="container p-5">
      <h2>{message}</h2>
      <p>{params.token}</p>
    </div>
  );
}

export default Verification;
