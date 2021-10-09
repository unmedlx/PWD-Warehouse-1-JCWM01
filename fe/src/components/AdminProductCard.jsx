import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { API_URL } from "../constants/API";
import axios from "axios";

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "../assets/styles/AdminDashboard.css";

export default function AdminProductCard(props) {
  return (
    <div className="card-body">
      <article className="itemlist">
        <div className="row align-items-center">
          <div className="col col-check flex-grow-0"></div>
          <div className="col-lg-4 col-sm-4 col-8 flex-grow-1 col-name">
            <a className="itemside" href="#">
              <div className="left">
                <img
                  src="https://purepng.com/public/uploads/large/white-tshirt-n0j.png"
                  className="img-sm img-thumbnail"
                  alt="productImage"
                />
              </div>
              <div className="info">
                <h6 className="mb-0">Kaos Putih Polos</h6>
              </div>
            </a>
          </div>
          <div className="col-lg-2 col-sm-2 col-4 col-price">
            {" "}
            <span>Rp. 299000</span>{" "}
          </div>
          <div className="col-lg-2 col-sm-2 col-4 col-status">
            <span className="badge rounded-pill alert-success">Baju</span>
          </div>
          <div className="col-lg-2 col-sm-2 col-4 col-date">
            <span>5 pcs</span>
          </div>
          <div className="col-lg-1 col-sm-2 col-4 col-action">
            <div className="dropdown float-end">
              <a href="#" data-bs-toggle="dropdown" className="btn btn-light">
                {"• • •"}
                <i className="material-icons md-more_horiz"></i>{" "}
              </a>
              <div className="dropdown-menu">
                <a className="dropdown-item" href="#">
                  View product detail page
                </a>
                <a className="dropdown-item" href="#">
                  Edit product
                </a>
                <a className="dropdown-item text-danger" href="#">
                  Delete product
                </a>
              </div>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}
