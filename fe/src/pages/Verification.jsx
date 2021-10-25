import React from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {API_URL} from "../constants/API"

function Verification() {
  // STATE //
  const [message, setMessage] = useState(
    "We Verify Your Account, Please Wait..."
  );
  const [redirect, setRedirect] = useState(false);

  // TOKEN STUFF //
  const params = useParams();

  // VERIFICATION //
  const verify = () => {
    axios.patch(`${API_URL}/auth/verification`,
        {},
        {
          headers: {
            authorization: `Bearer ${params.token}`,
          },
        }
      )
      .then((res) => {
        setTimeout(() => setMessage("Your Account Verified ✔"), 1500);
        setTimeout(() => setMessage("Redirecting..."), 2500);
        setTimeout(() => setRedirect(true), 3000);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    verify();
  },[]);

  // REDIRECT //
  if (redirect) {
    return <Redirect to="/authentication" />;
  }

  // RENDER //
  return (
    <div className="body">
        <h1 className="title">{message}</h1>
    </div>
  );
}

export default Verification;
