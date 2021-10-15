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
  const [stock, setStock] = useState([]);
  const [additionalInfo, setAdditionalInfo] = useState({
    quantity: parseInt(props.quantity),
  });

  const dispatch = useDispatch();

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

  const fetchStock = () => {
    axios
      .get(`${API_URL}/userstocks/${props.idProduct}`)
      .then((response) => {
        setStock(response.data[0]);
        console.log(response.data[0]);
      })
      .catch((err) => {
        alert(err);
      });
  };

  const qtyButtonHandler = (action) => {
    if (action === "increment" && additionalInfo.quantity < stock.sumQuantity) {
      setAdditionalInfo({ quantity: additionalInfo.quantity + 1 });
      dispatch({
        type: "UPDATE_CART",
        payload: {
          idProduct: props.idProduct,
          idUser: userGlobal.idUser,
          quantity: additionalInfo.quantity + 1,
          productName: props.productName,
          price: props.price,
          productImage: props.productImage,
        },
      });
    } else if (action === "decrement" && additionalInfo.quantity > 1) {
      setAdditionalInfo({ quantity: additionalInfo.quantity - 1 });
      dispatch({
        type: "UPDATE_CART",
        payload: {
          idProduct: props.idProduct,
          idUser: userGlobal.idUser,
          quantity: additionalInfo.quantity - 1,
          productName: props.productName,
          price: props.price,
          productImage: props.productImage,
        },
      });
    }
  };

  const inputHandler = (event) => {
    const value = event.target.value;
    const name = event.target.name;

    setCartData({ ...cartData, [name]: value });
  };

  useEffect(() => {
    fetchStock();
  }, []);

  return (
    <div className="card-body">
      <article className="itemlist">
        <div className="d-flex flex-row align-items-center justify-content-between">
          <div
            style={{ maxWidth: 150 }}
            className="col-lg-4 col-sm-4 col-8 flex-grow-1 col-name d-flex flex-column justify-content-center"
          >
            <div className="left my-2">
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

          <div className="d-flex flex-row justify-content-evenly aling-items-center">
            <div style={{ marginLeft: -40 }} className="d-flex flex-row">
              {stock.sumQuantity}
            </div>

            <div
              style={{ marginLeft: 135 }}
              className="d-flex flex-row justify-content-evenly aling-items-center "
            >
              <span className="d-flex flex-row align-items-center">
                <button
                  onClick={() => qtyButtonHandler("decrement")}
                  className="btn btn-outline-success me-4"
                >
                  -
                </button>
                {additionalInfo.quantity}
                <button
                  onClick={() => qtyButtonHandler("increment")}
                  className="btn btn-outline-success ms-4"
                >
                  +
                </button>
              </span>
            </div>
          </div>

          <div className="">
            {" "}
            <span>Rp. {cartData.price * additionalInfo.quantity}</span>{" "}
          </div>
        </div>
        <div style={{ marginLeft: 640 }} className="">
          <button onClick={deleteButtonHandler} className="btn btn-danger">
            Delete
          </button>
        </div>
      </article>
    </div>
  );
}
