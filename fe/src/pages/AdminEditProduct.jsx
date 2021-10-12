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
  const [file, setFile] = useState();
  const [idWarehouse, setIdWarehouse] = useState(0);
  const [newQuantity, setNewQuantity] = useState({
    quantity: 0,
  });

  const uploadHandler = (e) => {
    let uploaded = e.target.files[0];
    setFile(uploaded);
  };

  const refreshPage = () => {
    window.location.reload();
  };

  const fetchProducts = () => {
    axios
      .get(
        `${API_URL}/adminstocks/${props.match.params.idProduct}?idUser=${userGlobal.idUser}`
      )
      .then((response) => {
        console.log(response.data[0]);
        setCurrentProduct(response.data[0]);
        setNewQuantity(response.data[0].quantity);
      })
      .catch((err) => {
        alert(err);
      });
    console.log(userGlobal);
  };

  const fetchWarehouse = () => {
    axios
      .get(`${API_URL}/warehouses?idUser=${userGlobal.idUser}`)
      .then((response) => {
        setIdWarehouse(response.data[0].idWarehouse);
        console.log(response.data[0].idWarehouse);
      })
      .catch((err) => {
        alert(err);
      });
  };

  const saveButtonHandler = () => {
    let formData = new FormData();
    let obj = {
      productName: currentProduct.productName,
      price: parseInt(currentProduct.price),
      description: currentProduct.description,
      idCategory: parseInt(currentProduct.idCategory),
    };
    formData.append("file", file);
    formData.append("data", JSON.stringify(obj));

    axios
      .patch(`${API_URL}/products/${currentProduct.idProduct}`, formData)
      .then((response) => {
        alert(
          `Successfuly edited product with idProduct ${currentProduct.idProduct}`
        );
        setFile();

        axios
          .patch(
            `${API_URL}/adminstocks/${currentProduct.idProduct}?idWarehouse=${idWarehouse}`,
            {
              idProduct: parseInt(currentProduct.idProduct),
              idWarehouse: parseInt(idWarehouse),
              quantity: parseInt(currentProduct.quantity),
            }
          )
          .then((response) => {
            console.log(`Edited in userstocks`);
          })
          .catch((err) => {
            alert(err);
          });

        axios
          .patch(
            `${API_URL}/userstocks/${currentProduct.idProduct}?idWarehouse=${idWarehouse}`,
            {
              idProduct: parseInt(currentProduct.idProduct),
              idWarehouse: parseInt(idWarehouse),
              quantity: parseInt(currentProduct.quantity),
            }
          )
          .then((response) => {
            console.log(`Edited in adminstocks`);
            refreshPage();
          })
          .catch((err) => {
            alert(err);
          });
      })
      .catch((err) => {
        alert(err);
      });
  };

  const saveButtonHandlerNoImage = () => {
    axios
      .patch(`${API_URL}/products/noImage/${currentProduct.idProduct}`, {
        productName: currentProduct.productName,
        price: parseInt(currentProduct.price),
        description: currentProduct.description,
        idCategory: parseInt(currentProduct.idCategory),
      })
      .then((response) => {
        alert(
          `Successfuly edited product with idProduct ${currentProduct.idProduct}`
        );

        axios
          .patch(
            `${API_URL}/adminstocks/${currentProduct.idProduct}?idWarehouse=${idWarehouse}`,
            {
              idProduct: parseInt(currentProduct.idProduct),
              idWarehouse: parseInt(idWarehouse),
              quantity: parseInt(currentProduct.quantity),
            }
          )
          .then((response) => {
            console.log(`Edited in userstocks`);
          })
          .catch((err) => {
            alert(err);
          });

        axios
          .patch(
            `${API_URL}/userstocks/${currentProduct.idProduct}?idWarehouse=${idWarehouse}`,
            {
              idProduct: parseInt(currentProduct.idProduct),
              idWarehouse: parseInt(idWarehouse),
              quantity: parseInt(currentProduct.quantity),
            }
          )
          .then((response) => {
            console.log(`Edited in adminstocks`);
            refreshPage();
          })
          .catch((err) => {
            alert(err);
          });
      })
      .catch((err) => {
        alert(err);
      });
  };

  const deleteButtonHandler = () => {
    const confirmDelete = window.confirm(
      `Delete ${currentProduct.productName}?`
    );
    if (confirmDelete) {
      axios
        .delete(`${API_URL}/products/${currentProduct.idProduct}`)
        .then(() => {
          axios
            .delete(
              `${API_URL}/adminstocks/${currentProduct.idProduct}?idWarehouse=${idWarehouse}`
            )
            .then(() => {})
            .catch(() => {
              alert(`Server error`);
            });

          axios
            .delete(
              `${API_URL}/userstocks/${currentProduct.idProduct}?idWarehouse=${idWarehouse}`
            )
            .then(() => {
              alert(`${currentProduct.productName} is deleted`);
              refreshPage();
            })
            .catch(() => {
              alert(`Server error`);
            });
        })
        .catch(() => {
          alert(`Server error`);
        });
    } else {
      alert(`Cancelled`);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchWarehouse();
  }, []);

  const inputHandler = (event) => {
    const value = event.target.value;
    const name = event.target.name;

    setCurrentProduct({ ...currentProduct, [name]: value });
    // setNewQuantity({ ...newQuantity, [name]: value });
    console.log(name);
    console.log(value);
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
                  name="quantity"
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
                      currentProduct.category === "Baju" ? "checked" : null
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
                      currentProduct.category === "Celana" ? "checked" : null
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
                    checked={
                      currentProduct.category === "Jaket" ? "checked" : null
                    }
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
                      currentProduct.category === "Topi" ? "checked" : null
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
                  onChange={uploadHandler}
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
                  onClick={deleteButtonHandler}
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
                  // disabled={!file}
                  onClick={file ? saveButtonHandler : saveButtonHandlerNoImage}
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
