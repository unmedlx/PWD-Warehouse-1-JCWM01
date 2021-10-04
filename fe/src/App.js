import Home from "./pages/Home";
import "bootstrap/dist/css/bootstrap.css";
import NavBar from "./components/NavBar";
import Auth from "./pages/Auth";
import Verification from "./pages/Verification";
// React router
import { BrowserRouter, Switch, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      {/* <NavBar /> */}
      <Switch>
        <Route component={Auth} path="/register" />
        <Route component={Verification} path="/verification/:token" />
        <Route component={Home} path="/" />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
