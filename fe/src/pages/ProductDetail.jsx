import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"

import axios from "axios"
import { API_URL } from "../constants/API"
import "bootstrap/dist/css/bootstrap.css"

export default function ProductDetail(props) {
  const [productDetail, setProductDetail] = useState([])

  const [additionalInfo, setAdditionalInfo] = useState({
    quantity: 1,
    productNotFound: false,
  })

  const fetchProducts = () => {
    axios
      .get(`${API_URL}/products/${props.match.params.idProduct}`)
      .then((response) => {
        if (response.data.length) {
          setProductDetail(response.data[0])
        } else {
          setAdditionalInfo({ productNotFound: true })
        }
      })
      .catch((err) => {
        alert(err)
      })
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  const qtyButtonHandler = (action) => {
    if (action === "increment") {
      setAdditionalInfo({ quantity: additionalInfo.quantity + 1 })
    } else if (action === "decrement" && additionalInfo.quantity > 1) {
      setAdditionalInfo({ quantity: additionalInfo.quantity - 1 })
    }
  }

  const addToCartHandler = () => {
    return
  }

  return (
    <div className="container">
      {additionalInfo.productNotFound ? (
        <div>Product with ID {props.params.idProduct} does not exist</div>
      ) : (
        <div className="row mt-3">
          <div className="col-6">
            <img
              style={{ width: "100%" }}
              src={productDetail.productImage}
              alt=""
            />
          </div>
          <div className="col-6 d-flex flex-column justify-content-center">
            <h4>{productDetail.productName}</h4>
            <h5>Rp. {productDetail.price}</h5>
            <p>{productDetail.description}</p>
            <div className="d-flex flex-row align-items-center">
              <button
                onClick={() => qtyButtonHandler("decrement")}
                className="btn btn-outline-primary me-4"
              >
                -
              </button>

              {additionalInfo.quantity}

              <button
                onClick={() => qtyButtonHandler("increment")}
                className="btn btn-outline-primary ms-4"
              >
                +
              </button>
            </div>
            <button
              onClick={addToCartHandler}
              className="btn btn-outline-success mt-3"
            >
              Add to cart
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
