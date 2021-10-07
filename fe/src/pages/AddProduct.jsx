import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { API_URL } from "../constants/API";
import axios from "axios";
import { Link, Redirect } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import "../assets/styles/AdminDashboard.css";

export default function AddProduct() {
  const [addProduct, setAddProduct] = useState({
    productName: "",
    price: parseInt(0),
    description: "",
    idCategory: parseInt(0),
  });

  const [file, setFile] = useState();

  const refreshPage = () => {
    window.location.reload();
  };

  const uploadHandler = (e) => {
    let uploaded = e.target.files[0];
    setFile(uploaded);
  };

  const saveButtonHandler = () => {
    let formData = new FormData();

    let obj = {
      productName: addProduct.productName,
      price: parseInt(addProduct.price),
      description: addProduct.description,
      idCategory: parseInt(addProduct.idCategory),
    };

    formData.append("file", file);
    formData.append("data", JSON.stringify(obj));

    axios
      .post(`${API_URL}/products`, formData)
      .then((response) => {
        alert(response.data.message);
        setAddProduct({
          productName: "",
          price: parseInt(0),
          description: "",
          idCategory: parseInt(0),
        });
        setFile();
      })
      .catch((err) => {
        alert(err);
      });
  };

  const addAnotherButtonHandler = () => {
    let formData = new FormData();

    let obj = {
      productName: addProduct.productName,
      price: parseInt(addProduct.price),
      description: addProduct.description,
      idCategory: parseInt(addProduct.idCategory),
    };

    formData.append("file", file);
    formData.append("data", JSON.stringify(obj));

    axios
      .post(`${API_URL}/products`, formData)
      .then((response) => {
        alert(response.data.message);
        setAddProduct({
          productName: "",
          price: parseInt(0),
          description: "",
          idCategory: parseInt(0),
        });
        setFile();
        refreshPage();
      })
      .catch((err) => {
        alert(err);
      });
  };

  const inputHandler = (event) => {
    const value = event.target.value;
    const name = event.target.name;

    setAddProduct({ ...addProduct, [name]: value });
  };

  return (
    <div style={{ height: "90%", width: "80%" }} className="card mb-4 scroll">
      <div className="card-body p-5 ">
        <div className="content-main " style={{ maxWidth: "920px" }}>
          <div className="content-header">
            <h2 className="content-title">Add product</h2>
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
                  className="form-control"
                  rows="4"
                  name="description"
                ></textarea>
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
                  onChange={uploadHandler}
                />
              </div>
            </div>
          </div>
          <hr className="my-4" />

          <div className="d-flex justify-content-end gap-2">
            <Link to="/product-list">
              <button
                style={{
                  color: "white",
                  fontWeight: "bold",
                }}
                type="button"
                className="btn btn-danger"
              >
                Cancel
              </button>
            </Link>

            <Link to="/product-list">
              <button
                style={{
                  backgroundColor: "#32b280",
                  color: "white",
                  fontWeight: "bold",
                }}
                type="button"
                className="btn"
                disabled={
                  !(
                    addProduct.productName &&
                    addProduct.price &&
                    file &&
                    addProduct.description &&
                    addProduct.idCategory
                  )
                }
                onClick={saveButtonHandler}
              >
                Save
              </button>
            </Link>

            <button
              style={{
                backgroundColor: "#32b280",
                color: "white",
                fontWeight: "bold",
              }}
              type="button"
              className="btn"
              disabled={
                !(
                  addProduct.productName &&
                  addProduct.price &&
                  file &&
                  addProduct.description &&
                  addProduct.idCategory
                )
              }
              onClick={addAnotherButtonHandler}
            >
              Save and add another
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
