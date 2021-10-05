import React, { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { Link } from "react-router-dom"
import axios from "axios"
import "bootstrap/dist/css/bootstrap.css"
import "../assets/styles/ProductCard.css"

export default function ProductCard(props) {
  return (
    <div className="d-flex flex-row flex-wrap">
      <div class="page-inner">
        <div class="row">
          <div class="el-wrapper">
            <div class="box-up">
              <img
                class="img"
                src={props.productImage}
                alt="productImage"
              ></img>

              <div class="img-info">
                <div class="info-inner">
                  <Link
                    to={`/product-detail/${props.idProduct}`}
                    class="p-name"
                  >
                    {props.productName}
                  </Link>
                  <Link
                    to={`/product-detail/${props.idProduct}`}
                    class="p-company"
                  >
                    {props.description}
                  </Link>
                </div>
              </div>
            </div>

            <div class="box-down">
              <div class="h-bg">
                <div class="h-bg-inner"></div>
              </div>

              <Link onClick={"#"} class="cart" to="#">
                <span class="price">Rp. {props.price}</span>
                <span class="add-to-cart">
                  <span class="txt fw-bolder">Add to cart</span>
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
