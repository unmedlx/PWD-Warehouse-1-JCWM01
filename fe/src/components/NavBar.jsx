import React from "react";

class NavBar extends React.Component {
  render() {
    return (
      <div>
        <nav class="navbar navbar-expand-lg navbar-dark bg-success">
          <button
            class="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarTogglerDemo01"
            aria-controls="navbarTogglerDemo01"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse mx-2" id="navbarTogglerDemo01">
            <a class="navbar-brand " href="/">
              Ecommerce Warehouse
            </a>
            <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
              <li class="nav-item active">
                <a class="nav-link" href="#">
                  Home
                </a>
              </li>
              <li class="nav-item active">
                <a class="nav-link" href="#">
                  Promo
                </a>
              </li>
              <li class="nav-item active">
                <a class="nav-link" href="#">
                  About
                </a>
              </li>
            </ul>
          </div>
          <button class="btn btn-outline-warning mx-2 " type="submit">
            Cart
          </button>
        </nav>
      </div>
    );
  }
}

export default NavBar;
