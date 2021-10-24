import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from 'axios'
import { API_URL } from '../helper/index'


function Admin() {
  const dispatch = useDispatch();
  const adminGlobal = useSelector((state) => state.admins);
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

  const fetchWarehouse = () => {
    axios.get(`${API_URL}/warehouses?idUser=${adminGlobal.idUser}`)
      .then((response) => {
        console.log(response.data[0].idWarehouse);
        
        dispatch({
          type: "ADMIN_WAREHOUSE",
          payload: response.data[0].idWarehouse
        })

      })
      .catch((err) => {
        console.log(err);
      });
  };



  useEffect(() => {
    fetchWarehouse()
  }, [])

  useEffect(() => {
    fetchWarehouse()
  }, [])

  return (
    <div>
      <h1 className="h1 form">INI ADMIN PAGE</h1>
      <Link to="/auth-admin">
        <button className="btn btn-success mx-4">Auth</button>
      </Link>
      <Link to="/admin-product-list">
        <button className="btn btn-warning mx-4">Product List</button>
      </Link>
      <Link to="/edit-product/:idProduct">
        <button className="btn btn-warning mx-4">Edit</button>
      </Link>
      <Link to="/admin-warehouse">
        <button className="btn btn-warning mx-4">Warehouse</button>
      </Link>
      <Link to="/admin-transaction">
        <button className="btn btn-warning mx-4">Transaction</button>
      </Link>
      <button className="btn btn-danger" onClick={logout}>
        Logout
      </button>
    </div >
  );
}

export default Admin;
