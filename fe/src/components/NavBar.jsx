import React from "react";

class NavBar extends React.Component {
  render() {
    return (
      <div className="d-flex flex-row justify-content-between align-items-center bg-dark text-warning p-3  ">
        <h3>Ecommerce Warehouse</h3>
        <h5>ini cart</h5>
      </div>
    );
  }
}

export default NavBar;
