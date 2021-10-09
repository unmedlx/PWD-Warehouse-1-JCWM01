import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { API_URL } from "../constants/API";
import axios from "axios";
import { Link } from "react-router-dom";

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
                  src={
                    props.productImage.includes("/images/IMG")
                      ? API_URL + props.productImage
                      : props.productImage
                  }
                  className="img-sm img-thumbnail"
                  alt="productImage"
                />
              </div>
              <div className="info">
                <h6 className="mb-0">{props.productName}</h6>
              </div>
            </a>
          </div>
          <div className="col-lg-2 col-sm-2 col-4 col-price">
            {" "}
            <span>Rp. {props.price}</span>{" "}
          </div>
          <div className="col-lg-2 col-sm-2 col-4 col-status">
            <span className="badge rounded-pill alert-success">
              {props.category}
            </span>
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
                <Link
                  to={`/product-detail/${props.idProduct}`}
                  class="p-name dropdown-item"
                >
                  View product detail page
                </Link>
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
