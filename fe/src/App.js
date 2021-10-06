import "bootstrap/dist/css/bootstrap.css";
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import Verification from "./pages/Verification";
import Profile from './pages/Profile';
import { BrowserRouter, Switch, Route } from "react-router-dom";
// import { useSelector } from "react-redux";

function App() {
  // const userGlobal = useSelector((state) => state.users);
  // const { fullName, username, email } = userGlobal;
  // console.log(fullName, username, email,);

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
