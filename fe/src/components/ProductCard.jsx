import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.css";
import "../assets/styles/ProductCard.css";
import { API_URL } from "../constants/API";

export default function ProductCard(props) {
  const userGlobal = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(parseInt(1));
  const reload = () => window.location.reload();

  const addToCartHandler = () => {
    axios
      .get(`${API_URL}/carts/${props.idProduct}?idUser=${userGlobal.idUser}`)
      .then((response) => {
        console.log(response);
        if (response.data.length) {
          axios
            .patch(
              `${API_URL}/carts/${response.data[0].idProduct}?idUser=${userGlobal.idUser}`,
              {
                quantity: response.data[0].quantity + 1,
              }
            )
            .then(() => {
              alert(`${props.productName} added to the cart`);

              axios
                .get(`${API_URL}/carts/${userGlobal.idUser}`)
                .then((response) => {
                  dispatch({
                    type: "FILL_CART",
                    payload: response.data,
                  });
                  reload();
                })
                .catch((err) => {
                  console.log(err);
                });
            })
            .catch(() => {
              alert(`Server error`);
            });
        } else {
          axios
            .post(`${API_URL}/carts`, {
              idProduct: props.idProduct,
              idUser: userGlobal.idUser,
              quantity: quantity,
            })
            .then(() => {
              alert(`${props.productName} added to the cart`);

              axios
                .get(`${API_URL}/carts/${userGlobal.idUser}`)
                .then((response) => {
                  dispatch({
                    type: "FILL_CART",
                    payload: response.data,
                  });
                  reload();
                })
                .catch((err) => {
                  console.log(err);
                });
            })
            .catch(() => {
              alert(`Server error`);
            });
        }
      });
  };
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

              <span
                style={{ cursor: "pointer" }}
                onClick={addToCartHandler}
                class="cart"
              >
                <span class="price">Rp. {props.price}</span>
                <span class="add-to-cart">
                  <span style={{ marginLeft: -3 }} class="txt fw-bolder">
                    Add to cart
                  </span>
                </span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
