import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../constants/API";
import { Link } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "../assets/styles/AdminDashboard.css";

import WarehouseCard from "../components/WarehouseCard";

export default function WarehouseList() {
  const [warehouseData, setWarehouseData] = useState([]);

  const fetchWarehouseData = () => {
    axios
      .get(`${API_URL}/warehouses/warehouseList`)
      .then((response) => {
        setWarehouseData(response.data);
        console.log(response.data);
        renderWarehouseData();
      })
      .catch((err) => {
        alert(err);
      });
  };

  const renderWarehouseData = () => {
    return warehouseData.map((val) => {
      return (
        <WarehouseCard
          warehouse={val.warehouse}
          kota={val.kota}
          fullName={val.fullName}
          email={val.email}
          provinsi={val.provinsi}
          username={val.username}
        />
      );
    });
  };

  useEffect(() => {
    fetchWarehouseData();
    renderWarehouseData();
  }, []);
  return (
    <div style={{ padding: "60px" }} className="">
      <div className="content-header">
        <h2 className="content-title d-flex flex-row align-items-center">
          Warehouse list
        </h2>
        <div>
          <Link to={`/add-warehouse`} class="p-name button-cart">
            <i className="material-icons md-plus"></i> Add new warehouse
          </Link>
        </div>
      </div>
      <div className="col-12 d-flex">
        <div className="d-flex flex-wrap flex-row justify-content-evenly mb-1">
          {renderWarehouseData()}
        </div>
      </div>
    </div>
  );
}
