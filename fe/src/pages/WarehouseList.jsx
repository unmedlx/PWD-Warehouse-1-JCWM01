import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
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
      return <WarehouseCard warehouse={val.warehouse} kota={val.kota} />;
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
          {/* <span className="badge rounded-pill alert-success me-2">
            {warehouse.warehouse ? warehouse.warehouse : "lol"}
          </span>{" "} */}
          Warehouse list{" "}
        </h2>
        <div>
          <Link to={`/add-product`} class="p-name button-cart">
            <i className="material-icons md-plus"></i> Add new warehouse
          </Link>
        </div>
      </div>
      <div className="mb-4">
        <header className="mt-3 p-3">
          <div className="row gx-3">
            <div className="col-lg-4 col-md-6 me-auto">
              <input
                type="text"
                placeholder="Search..."
                className="form-control box-shadow"
                name="byName"
                // onChange={inputHandler}
              />
            </div>

            <div style={{ marginTop: 7 }} className="col-lg-2 col-6 col-md-3">
              <select
                name="byCategory"
                className="form-select box-shadow"
                // onChange={inputHandler}
              >
                <option value="">All category</option>
                <option value="Baju">Baju</option>
                <option value="Celana">Celana</option>
                <option value="Jaket">Jaket</option>
                <option value="Topi">Topi</option>
              </select>
            </div>
          </div>
        </header>
      </div>
      <div className="col-12 d-flex">
        <div className="d-flex flex-wrap flex-row justify-content-evenly mb-1">
          {renderWarehouseData()}
        </div>
      </div>
    </div>
  );
}
