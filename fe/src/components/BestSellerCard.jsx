import React from "react";

import { API_URL } from "../constants/API";

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "../assets/styles/AdminDashboard.css";

export default function BestSellerCard(props) {
  return (
    <article className="itemlist">
      <div className="d-flex flex-row align-items-center justify-content-between p-4">
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

        <div>
          {" "}
          <span>Sold: {props.soldQuantity} pcs</span>{" "}
        </div>
      </div>
    </article>
  );
}
