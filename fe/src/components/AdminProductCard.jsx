import React from "react";
import { API_URL } from "../constants/API";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "../assets/styles/AdminDashboard.css";

export default function AdminProductCard(props) {
  let badge;
  if (props.category === "Baju") {
    badge = (
      <span className="badge rounded-pill alert-success">{props.category}</span>
    );
  } else if (props.category === "Celana") {
    badge = (
      <span className="badge rounded-pill alert-primary">{props.category}</span>
    );
  } else if (props.category === "Jaket") {
    badge = (
      <span className="badge rounded-pill alert-warning">{props.category}</span>
    );
  } else if (props.category === "Topi") {
    badge = (
      <span className="badge rounded-pill alert-danger">{props.category}</span>
    );
  }
  return (
    <div className="card-body">
      <article className="itemlist">
        <div className="row align-items-center">
          <div className="col col-check flex-grow-0"></div>
          <div className="col-lg-4 col-sm-4 col-8 flex-grow-1 col-name">
            <Link className="itemside" to={`/edit-product/${props.idProduct}`}>
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
            </Link>
          </div>
          <div
            style={{ marginRight: 200 }}
            className="col-lg-2 col-sm-2 col-4 col-price"
          >
            {" "}
            <span>Rp. {props.price}</span>{" "}
          </div>
          <div className="col-lg-2 col-sm-2 col-4 col-status">{badge}</div>

          <div className="col-lg-1 col-sm-2 col-4 col-action">
            <div className="dropdown float-end">
              <a href="#" data-bs-toggle="dropdown" className="btn btn-light">
                {"• • •"}
                <i className="material-icons md-more_horiz"></i>{" "}
              </a>
              <div className="dropdown-menu">
                <Link
                  to={`/edit-product/${props.idProduct}`}
                  className="dropdown-item"
                >
                  Product's settings
                </Link>
              </div>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}
