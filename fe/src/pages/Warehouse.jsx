import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

function Admin() {

  const dispatch = useDispatch();
  

  return (
    <div className=" body">
      <h1 className="h1">WareHouse Dashboard</h1>
      <Link to="/admin-warehouse">
        <button className="btn btn-success my-2">Request</button>
      </Link>
     
      <Link to="/admin-warehouse">
        <button className="btn btn-warning my-2"> Accept Request</button>
      </Link>
      <Link to="/admin-warehouse">
        <button className="btn btn-success my-2">Monitor</button>
      </Link>
      
    </div>
  );
}

export default Admin;
