import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

function Admin() {

  const dispatch = useDispatch();
  const logout = () => {
    localStorage.removeItem("token_shutter");
    dispatch({
      type: "USER_LOGOUT",
    });
    dispatch({
      type: "ADMIN_LOGOUT",
    });
    alert("logout success");
  };

  // Dispatch data transaction all user ke dalam ongoingTransaction

  return (
    <div>
      <h1 className="h1 form">INI ADMIN PAGE</h1>
      <Link to="/auth-admin">
        <button className="btn btn-success mx-4">Auth</button>
      </Link>

      <Link to="/admin-product-list">
        <button className="btn btn-warning mx-4">Product List</button>
      </Link>
      <Link to="/add-product">
        <button className="btn btn-success">Add Product</button>
        {/* <button className="btn btn-warning mx-4">Our Products</button> */}
      </Link>
      <Link to="/edit-product/:idProduct">
        <button className="btn btn-warning mx-4">Edit</button>
      </Link>
      <Link to="/admin-warehouse">
        <button className="btn btn-warning mx-4">Warehouse</button>
      </Link>
      <button className="btn btn-danger" onClick={logout}>
        Logout
      </button>
    </div>
  );
}

export default Admin;
