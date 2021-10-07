import React from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

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
        setTimeout(() => setMessage("Your Account Verified ✔"), 1500);
        setTimeout(() => setMessage("redirecting to home page.."), 2500);
        setTimeout(() => setRedirect(true), 3000);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    verify();
  });

  // REDIRECT //
  if (redirect) {
    return <Redirect to="/" />;
  }

  // RENDER //
  return (
    <div className="body">
      <h1 className="h1">{message}</h1>
    </div>
  );
}

export default Verification;
