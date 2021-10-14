import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { API_URL } from "../constants/API";
import axios from "axios";
import { Link } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "../assets/styles/AdminDashboard.css";

export default function CartProductCard(props) {
  const userGlobal = useSelector((state) => state.users);
  const [cartData, setCartData] = useState({
    productImage: props.productImage,
    productName: props.productName,
    price: props.price,
    quantity: props.quantity,
    idProduct: props.idProduct,
  });
  const reload = () => window.location.reload();

  const deleteButtonHandler = () => {
    const confirmDelete = window.confirm(
      `Delete ${cartData.productName} from cart?`
    );
    if (confirmDelete) {
      axios
        .delete(
          `${API_URL}/carts/${cartData.idProduct}?idUser=${userGlobal.idUser}`
        )
        .then(() => {
          alert(`Deleted from cart`);
          reload();
        })
        .catch(() => {
          alert(`Server error`);
        });
    } else {
      alert(`Cancelled`);
    }
  };

  const inputHandler = (event) => {
    const value = event.target.value;
    const name = event.target.name;

    setCartData({ ...cartData, [name]: value });
  };
  return (
    <div className="card-body">
      <article className="itemlist">
        <div className="row align-items-center">
          <div className="col col-check flex-grow-0"></div>
          <div className="col-lg-4 col-sm-4 col-8 flex-grow-1 col-name">
            <div className="left">
              <img
                src={
                  cartData.productImage.includes("/images/IMG")
                    ? API_URL + cartData.productImage
                    : cartData.productImage
                }
                className="img-sm img-thumbnail"
                alt="productImage"
              />
            </div>
            <div className="info">
              <h6 className="mb-0">{cartData.productName}</h6>
            </div>
          </div>
          <div
            style={{ marginRight: 0 }}
            className="col-lg-2 col-sm-2 col-4 col-price"
          >
            {" "}
            <span>Rp. {cartData.price * cartData.quantity}</span>{" "}
          </div>

          <div className="col">
            <input
              type="number"
              placeholder="1"
              className="form-control box-shadow"
              name="quantity"
              value={cartData.quantity}
              onChange={inputHandler}
            />
          </div>

          <div className="col">
            <button onClick={deleteButtonHandler} className="btn btn-danger">
              Delete
            </button>
          </div>
        </div>
      </article>
    </div>
  );
}
