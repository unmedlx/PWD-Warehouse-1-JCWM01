import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import axios from "axios";
import { API_URL } from "../constants/API";
import "bootstrap/dist/css/bootstrap.css";
import "../assets/styles/ProductDetail.css";

export default function ProductDetail(props) {
  const [productDetail, setProductDetail] = useState([]);
  const [image, setImage] = useState("");

  const [additionalInfo, setAdditionalInfo] = useState({
    quantity: 1,
    productNotFound: false,
  });

  const fetchProducts = () => {
    axios
      .get(`${API_URL}/products/${props.match.params.idProduct}`)
      .then((response) => {
        if (response.data.length) {
          setProductDetail(response.data[0]);
          setImage(response.data[0].productImage);
        } else {
          setAdditionalInfo({ productNotFound: true });
        }
      })
      .catch((err) => {
        alert(err);
      });
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const qtyButtonHandler = (action) => {
    if (action === "increment") {
      setAdditionalInfo({ quantity: additionalInfo.quantity + 1 });
    } else if (action === "decrement" && additionalInfo.quantity > 1) {
      setAdditionalInfo({ quantity: additionalInfo.quantity - 1 });
    }
  };

  const addToCartHandler = () => {
    return;
  };

  return (
    <div
      style={{ height: 650 }}
      className="d-flex justify-content-center align-items-center"
    >
      {additionalInfo.productNotFound ? (
        <div className="d-flex flex-column align-items-center justify-content-center">
          <div className="my-4 display-6">
            Product with ID {props.match.params.idProduct} does not exist
          </div>
          <Link to="/product-list">
            <button className="btn btn-success">
              Click here to return to products list
            </button>
          </Link>
        </div>
      ) : (
        <div>
          <div className="card d-flex flex-row justify content evenly align-items-center">
            <div className="d-flex align-self-start justify-content-start">
              <Link
                style={{ textDecoration: "none", color: "#32b28080" }}
                className="h2 mt-3 ms-4"
                to="/product-list"
              >
                {"❮"}
              </Link>
            </div>
            <div class="photo">
              <img
                src={image.includes("/images/IMG") ? API_URL + image : image}
                alt="productImage"
              ></img>
            </div>
            <div class="description">
              <h2>{productDetail.productName}</h2>
              <h4>{productDetail.category}</h4>
              <h1>Rp. {productDetail.price}</h1>
              <p>{productDetail.description}</p>

              <div className="d-flex flex-row align-items-center">
                <span
                  style={{ marginTop: -30 }}
                  className="d-flex flex-row align-items-center"
                >
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
                <button className="button-cart">Add to Cart</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
