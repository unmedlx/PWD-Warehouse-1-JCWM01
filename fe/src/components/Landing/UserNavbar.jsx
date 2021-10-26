import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { NavDropdown } from "react-bootstrap";
import { FaUserAlt, FaBook, FaSignOutAlt } from "react-icons/fa";

import "../../assets/styles/Landing/UserNavbar.css";
import { userLogout } from "../../redux/actions/users";

const UserNavbar = () => {
  const dispatch = useDispatch();
  const userGlobal = useSelector((state) => state.users);

  const logout = () => {
    dispatch(userLogout());
  };

  return (
    <div className="navbar-container">
      <div className="logo-container">
        <h4 className="subtitle logo-name">Brange.</h4>
      </div>
      <nav className="nav-link-container">
        <ul className="nav-links m-0 p-0">
          <li>
            <a href="/" className="nav-link-cta subtitle-600">
              Home
            </a>
          </li>
          <li>
            <a href="/product-list" className="nav-link-cta subtitle-600">
              Products
            </a>
          </li>
          <li>
            <a href="" className="nav-link-cta subtitle-600">
              About
            </a>
          </li>
        </ul>
      </nav>
      <div className="auth">
        <div>
          {userGlobal.idUser > 0 ? (
            <NavDropdown
              title={`Hello, ${userGlobal.username}`}
              id=""
              className="subtitle-600"
            >
              <NavDropdown.Item href="/profile" className="navbar-items">
                {" "}
                <FaUserAlt className="me-2 drop-icon" />
                Profile
              </NavDropdown.Item>
              {/* <NavDropdown.Item href="/cart" className="navbar-items"><FaCartArrowDown className="me-2 drop-icon" />Cart</NavDropdown.Item> */}
              <NavDropdown.Item href="/transaction" className="navbar-items">
                <FaBook className="me-2 drop-icon" />
                Transaction
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={() => logout()}>
                <FaSignOutAlt className="me-2 drop-icon" />
                Logout
              </NavDropdown.Item>
            </NavDropdown>
          ) : (
            <Link to="/authentication" className="auth-link">
              <button className="button-auth">Sign Up</button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserNavbar;
