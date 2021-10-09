import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { API_URL } from "../constants/API";

import "bootstrap/dist/css/bootstrap.css";
import "../assets/styles/AdminDashboard.css";

import AdminProductCard from "../components/AdminProductCard";

export default function AdminProductList() {
  const [filtering, setFiltering] = useState({
    byName: "",
    byCategory: "",
    sort: "",
  });

  const inputHandler = (event) => {
    const value = event.target.value;
    const name = event.target.name;

    setFiltering({ ...filtering, [name]: value });
  };

  return (
    <div style={{ padding: "60px", backgroundColor: "white" }} className="">
      <div className="content-header">
        <h2 className="content-title">Products list </h2>
        <div>
          <a href="#" className="button-cart">
            <i className="material-icons md-plus"></i> Create new
          </a>
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
                onChange={inputHandler}
              />
            </div>

            <div style={{ marginTop: 7 }} className="col-lg-2 col-6 col-md-3">
              <select
                name="byCategory"
                className="form-select box-shadow"
                onChange={inputHandler}
              >
                <option value="">All category</option>
                <option value="Baju">Baju</option>
                <option value="Celana">Celana</option>
                <option value="Jaket">Jaket</option>
                <option value="Topi">Topi</option>
              </select>
            </div>

            <div style={{ marginTop: 7 }} className="col-lg-2 col-6 col-md-3">
              <select
                name="sort"
                className="form-select box-shadow"
                onChange={inputHandler}
              >
                <option value="">Sort by</option>
                <option value="lowPrice">Lowest price</option>
                <option value="highPrice">Highest price</option>
                <option value="az">A to Z</option>
                <option value="za">Z to A</option>
              </select>
            </div>
          </div>
        </header>
      </div>
      <AdminProductCard />
      <AdminProductCard />
      <AdminProductCard />
      <AdminProductCard />
      <AdminProductCard />
      <AdminProductCard />
      <AdminProductCard />
      <AdminProductCard />
      <AdminProductCard />
      <AdminProductCard />
      <AdminProductCard />
      <AdminProductCard />
      <div
        style={{ marginTop: 12, marginLeft: 1065 }}
        className="col-lg-2 col-6 col-md-3"
      >
        <div className="d-flex flex-row justify-content-between align-items-center">
          <button
          // //   onClick={prevPageHandler}
          //   className="btn btn-success"
          //   disabled={paging.currentPage === 1}
          >
            {"<"}
          </button>
          <div className="text-center px-4">
            Page {1} of {10}
          </div>
          <button
          //   onClick={nextPageHandler}
          //   className="btn btn-success"
          //   disabled={paging.currentPage === paging.maxPage}
          >
            {">"}
          </button>
        </div>
      </div>
    </div>
  );
}
