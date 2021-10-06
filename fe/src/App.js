import "bootstrap/dist/css/bootstrap.css";
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import Verification from "./pages/Verification";
import Profile from './pages/Profile';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from 'react'

function App() {
  const userGlobal = useSelector((state) => state.users);
  const { idUser } = userGlobal;
  const dispatch = useDispatch()
  const [idUserActive, setIdUserActive] = useState(idUser)



  useEffect(() => {
    // console.log(idUser);
    setIdUserActive(idUser)
    const userLocalStorage = localStorage.getItem("token_shutter")
    // console.log(userLocalStorage);
    if (userLocalStorage) {
      console.log(idUserActive);
      axios
        .patch(
          `http://localhost:3001/users/`,
          {},
          {
            headers: {
              authorization: `Bearer ${userLocalStorage}`,
            },
          }
        )
        .then((res) => {
          delete res.data[0].password;
          dispatch({
            type: "USER_LOGIN",
            payload: res.data[0],
          });
        })
        .catch((err) => {
          console.log(err);
        });
    };
  }, [])


  return (
    <BrowserRouter>
      <Switch>
        <Route component={Auth} path="/authentication" />
        <Route component={Verification} path="/verification/:token" />
        <Route component={Profile} path="/profile" />
        <Route component={Home} path="/" />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
