import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { API_URL } from "../constants/API";
import axios from "axios";
import { Link } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "../assets/styles/AdminDashboard.css";

export default function DemographicCard(props) {
  return (
    <article className="itemlist">
      <div className="d-flex flex-row align-items-center justify-content-between p-4">
        <div className="info">
          <h6 className="mb-0">{props.kota}</h6>
        </div>

        <div>
          {" "}
          <span>Total revenue: Rp. {props.revenueKota}</span>{" "}
        </div>
      </div>
    </article>
  );
}
