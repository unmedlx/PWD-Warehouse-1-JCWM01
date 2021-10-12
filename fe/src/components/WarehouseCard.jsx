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
      <Link style={{ textDecoration: "none" }}>
        <figure class="el-wrapper border-1">
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
          <figcaption style={{}} class="card-body text-center mt-3">
            <h6 class="card-title m-0">{props.kota}</h6>
          </figcaption>
        </figure>
      </Link>
    </div>
  );
}
