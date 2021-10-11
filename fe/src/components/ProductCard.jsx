import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.css";
import "../assets/styles/ProductCard.css";
import { API_URL } from "../constants/API";

export default function ProductCard(props) {
  return (
    <div className="d-flex flex-row flex-wrap">
      <div class="page-inner">
        <div class="row">
          <div class="el-wrapper">
            <Link to={`/product-detail/${props.idProduct}`} class="p-name">
              <div class="box-up">
                <img
                  class="img"
                  src={
                    props.productImage.includes("/images/IMG")
                      ? API_URL + props.productImage
                      : props.productImage
                  }
                  alt="productImage"
                ></img>

                <div class="img-info">
                  <div class="info-inner">{props.productName}</div>
                </div>
              </div>
            </Link>

            <div class="box-down">
              <div class="h-bg">
                <div class="h-bg-inner"></div>
              </div>

              <Link onClick={"#"} class="cart" to="#">
                <span class="price">Rp. {props.price}</span>
                <span class="add-to-cart">
                  <span style={{ marginLeft: -3 }} class="txt fw-bolder">
                    Add to cart
                  </span>
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
