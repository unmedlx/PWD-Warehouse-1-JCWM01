import React from "react";
import { Route, Redirect } from "react-router-dom";

export const MustLoggedInRoute = ({ isLogin, component, ...rest }) => {
  //   console.log(isLogin);
  //   console.log(component);
  //   console.log(rest);
  let Component = component;
  return (
    <Route
      {...rest}
      render={(props) => {
        if (isLogin) {
          return <Component />;
        } else {
          return (
            <Redirect
              to={{
                pathname: "/authentication",
                state: { from: props.location },
              }}
            />
          );
        }
      }}
    />
  );
};

/* 
 Explain:
      isLogin: condition for this protectedRoute ,isinya variabel yang tetap walaupun page di reload
      component: berisi function path/component yang dimasukan ke argumen
     ...rest : berisi object path yang menentukan tujuan page kita
 */

export const AdminRoute = ({ isAdmin: isAdmin, component, ...rest }) => {
  console.log(isAdmin);
  let Component = component;
  return (
    <Route
      {...rest}
      render={(props) => {
        //Conditioning Role
        if (isAdmin !== 3) {
          return <Component />;
        } else {
          return (
            <Redirect
              to={{
                pathname: "/",
                state: { from: props.location },
              }}
            />
          );
        }
      }}
    />
  );
};
