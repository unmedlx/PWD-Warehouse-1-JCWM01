import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.css";
import "../assets/styles/AdminDashboard.css";
import { API_URL } from "../constants/API";

export default function WarehouseCard(props) {
  return (
    <div className="mx-3 d-flex flex-row flex-wrap">
      {/* <Link style={{ textDecoration: "none" }}> */}
      <figure class="el-wrappers border-1">
        <div
          style={{
            height: 150,
            color: "white",
            fontWeight: "bold",
            fontSize: 80,
            backgroundColor: "#32b280",
          }}
          class="card-header d-flex flex-row align-items-center justify-content-center text-center"
        >
          {props.warehouse}
        </div>
        <figcaption
          style={{ fontWeight: "bold" }}
          class="card-body text-justify "
        >
          <h6
            style={{ fontWeight: "bold" }}
            class="card-title m-0 my-3 d-flex flex-wrap"
          >
            <span
              style={{ marginRight: 29 }}
              className="badge rounded-pill alert-success "
            >
              Kota
            </span>{" "}
            {props.kota}
          </h6>
          <h6
            style={{ fontWeight: "bold" }}
            class="card-title m-0 my-3 d-flex flex-wrap"
          >
            <span className="badge rounded-pill alert-success me-2">
              Provinsi
            </span>{" "}
            {props.provinsi}
          </h6>
          <h6
            style={{ fontWeight: "bold" }}
            class="card-title m-0 my-3 d-flex flex-wrap"
          >
            <span
              style={{ marginRight: 17 }}
              className="badge rounded-pill alert-success "
            >
              Admin
            </span>{" "}
            {props.fullName}
          </h6>

          <h6
            style={{ fontWeight: "bold" }}
            class="card-title m-0 my-3 d-flex flex-wrap"
          >
            <span
              style={{ marginRight: 24 }}
              className="badge rounded-pill alert-success mb-2"
            >
              Email
            </span>{" "}
            {props.email}
          </h6>
        </figcaption>
      </figure>
      {/* </Link> */}
    </div>
  );
}
