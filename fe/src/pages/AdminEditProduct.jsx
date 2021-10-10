import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { API_URL } from "../constants/API";
import axios from "axios";
import { Link, Redirect } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import "../assets/styles/AdminDashboard.css";

export default function AdminEditProduct(props) {
  const userGlobal = useSelector((state) => state.users);
  const [currentProduct, setCurrentProduct] = useState([]);
  const [newProduct, setNewProduct] = useState({
    productName: "",
    price: 0,
    description: "",
    idCategory: 0,
  });
  const [file, setFile] = useState();

  const fetchProducts = () => {
    axios
      .get(
        `${API_URL}/adminstocks/${props.match.params.idProduct}?idUser=${userGlobal.idUser}`
      )
      .then((response) => {
        console.log(response.data[0]);
        setCurrentProduct(response.data[0]);
      })
      .catch((err) => {
        alert(err);
      });
    console.log(userGlobal);
  };

  const deleteProduct = () => {
    axios
      .delete(`${API_URL}/products/${props.match.params.idProduct}}`)
      .then((response) => {})
      .catch((err) => {
        alert(err);
      });
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const inputHandler = (event) => {
    const value = event.target.value;
    const name = event.target.name;
  };
  return (
    <div style={{ height: "90%", width: "80%" }} className="card mb-4 scroll">
      <div className="card-body p-5 ">
        <div className="content-main " style={{ maxWidth: "920px" }}>
          <div className="content-header">
            <h2 className="content-title">Edit product</h2>
          </div>
          <hr className="my-4" />
          <div className="row">
            <div className="col-md-4 ">
              <h5>1. General info</h5>
            </div>
            <div className="col-md-8">
              <div className="mb-4">
                <label className="form-label">Product title</label>
                <input
                  onChange={inputHandler}
                  type="text"
                  value={currentProduct.productName}
                  placeholder="Type here"
                  className="form-control"
                  name="productName"
                />
              </div>
              <div className="mb-4">
                <label className="form-label">Description</label>
                <textarea
                  onChange={inputHandler}
                  placeholder="Type here"
                  value={currentProduct.description}
                  className="form-control"
                  rows="4"
                  name="description"
                ></textarea>
              </div>
              <div className="mb-4">
                <label className="form-label">Stock</label>
                <input
                  onChange={inputHandler}
                  type="number"
                  placeholder="0"
                  className="form-control"
                  name="stock"
                  value={currentProduct.quantity}
                />
              </div>
            </div>
          </div>
          <hr className="my-4" />
          <div className="row">
            <div className="col-md-4">
              <h5>2. Pricing</h5>
            </div>
            <div className="col-md-8">
              <div className="mb-4" style={{ maxWidth: "250px" }}>
                <label className="form-label">Rp.</label>
                <input
                  onChange={inputHandler}
                  name="price"
                  value={currentProduct.price}
                  type="number"
                  placeholder="0"
                  className="form-control"
                />
              </div>
            </div>
          </div>
          <hr className="my-4" />
          <div className="row">
            <div className="col-md-4">
              <h5>3. Category</h5>
            </div>
            <div className="col-md-8">
              <div className="mb-4">
                <label
                  className="mb-2 form-check form-check-inline"
                  style={{ width: "45%" }}
                >
                  <input
                    onChange={inputHandler}
                    className="form-check-input"
                    name="idCategory"
                    type="radio"
                    value="1"
                    checked={
                      currentProduct.category == "Baju" ? "checked" : null
                    }
                  />
                  <span className="form-check-label"> Baju </span>
                </label>
                <label
                  className="mb-2 form-check form-check-inline"
                  style={{ width: "45%" }}
                >
                  <input
                    onChange={inputHandler}
                    className="form-check-input"
                    name="idCategory"
                    type="radio"
                    value="2"
                    checked={
                      currentProduct.category == "Celana" ? "checked" : null
                    }
                  />
                  <span className="form-check-label"> Celana </span>
                </label>
                <label
                  className="mb-2 form-check form-check-inline"
                  style={{ width: "45%" }}
                >
                  <input
                    onChange={inputHandler}
                    className="form-check-input"
                    name="idCategory"
                    type="radio"
                    value="3"
                    // checked={
                    // //   currentProduct.category == "Jaket" ? "checked" : null
                    // }
                  />
                  <span className="form-check-label"> Jaket </span>
                </label>
                <label
                  className="mb-2 form-check form-check-inline"
                  style={{ width: "45%" }}
                >
                  <input
                    onChange={inputHandler}
                    className="form-check-input"
                    name="idCategory"
                    type="radio"
                    value="4"
                    checked={
                      currentProduct.category == "Topi" ? "checked" : null
                    }
                  />
                  <span className="form-check-label"> Topi </span>
                </label>
              </div>
            </div>
          </div>
          <hr className="mb-4 mt-0" />
          <div className="row">
            <div className="col-md-4">
              <h5>4. Media</h5>
            </div>
            <div className="col-md-8">
              <div className="mb-4">
                <label className="form-label">Image</label>
                <input
                  name="productImage"
                  className="form-control"
                  type="file"
                  accept=".jpg, .jpeg, .png, .JPG, .PNG, .JPEG"
                  //   onChange={uploadHandler}
                />
              </div>
            </div>
          </div>
          <hr className="my-4" />

          <div className="d-flex flex-row justify-content-between">
            <div className="d-flex justify-content-start gap-2">
              <Link to="/admin-product-list">
                <button
                  style={{
                    color: "white",
                    fontWeight: "bold",
                  }}
                  type="button"
                  className="btn btn-danger"
                >
                  Delete product
                </button>
              </Link>
            </div>
            <div className="d-flex justify-content-end gap-2">
              <Link to="/admin-product-list">
                <button
                  style={{
                    color: "white",
                    fontWeight: "bold",
                  }}
                  type="button"
                  className="btn btn-secondary"
                >
                  Cancel
                </button>
              </Link>

              <Link to="/admin-product-list">
                <button
                  style={{
                    backgroundColor: "#32b280",
                    color: "white",
                    fontWeight: "bold",
                  }}
                  type="button"
                  className="btn"
                  // disabled={
                  //   !(
                  //     addProduct.productName &&
                  //     addProduct.price &&
                  //     file &&
                  //     addProduct.description &&
                  //     addProduct.idCategory
                  //   )
                  // }
                  // onClick={saveButtonHandler}
                >
                  Save
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
