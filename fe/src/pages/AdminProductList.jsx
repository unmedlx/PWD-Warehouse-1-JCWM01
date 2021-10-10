import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { API_URL } from "../constants/API";
import { Link } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "../assets/styles/AdminDashboard.css";

import AdminProductCard from "../components/AdminProductCard";

export default function AdminProductList() {
  const userGlobal = useSelector((state) => state.users);
  const [products, setProducts] = useState([]);
  const [warehouse, setWarehouse] = useState("");

  const [paging, setPaging] = useState({
    previousPage: 0,
    nextPage: 0,
    currentPage: 1,
    productsCount: 0,
    maxPage: 1,
  });

  const [filtering, setFiltering] = useState({
    byName: "",
    byCategory: "",
    sort: "",
  });

  const fetchProducts = () => {
    axios
      .get(
        `${API_URL}/products?page=${paging.currentPage}&productName=${filtering.byName}&category=${filtering.byCategory}&sortBy=${filtering.sort}`
      )
      .then((response) => {
        setProducts(response.data.data);

        setPaging({
          ...paging,
          nextPage: response.data.next_page || paging.nextPage,
          previousPage: response.data.previous_page || paging.previousPage,
          productsCount: response.data.products_count || paging.productsCount,
          maxPage: response.data.max_page || paging.maxPage,
        });

        renderProducts();
      })
      .catch((err) => {
        alert(err);
      });
  };

  const fetchWarehouse = () => {
    axios
      .get(`${API_URL}/warehouses?idUser=${userGlobal.idUser}`)
      .then((response) => {
        setWarehouse(response.data[0]);
      })
      .catch((err) => {
        alert(err);
      });
  };

  const renderProducts = () => {
    return products.map((val) => {
      return (
        <AdminProductCard
          idProduct={val.idProduct}
          productName={val.productName}
          price={val.price}
          productImage={val.productImage}
          description={val.description}
          idCategory={val.idCategory}
          category={val.category}
        />
      );
    });
  };

  useEffect(() => {
    fetchProducts();
    fetchWarehouse();
    renderProducts();
  }, [paging.currentPage, filtering]);

  const nextPageHandler = () => {
    setPaging({
      currentPage: paging.currentPage + 1,
    });
  };

  const prevPageHandler = () => {
    setPaging({
      currentPage: paging.currentPage - 1,
    });
  };

  const inputHandler = (event) => {
    const value = event.target.value;
    const name = event.target.name;

    setFiltering({ ...filtering, [name]: value });
  };

  return (
    <div style={{ padding: "60px", backgroundColor: "white" }} className="">
      <div className="content-header">
        <h2 className="content-title d-flex flex-row align-items-center">
          <span className="badge rounded-pill alert-success me-2">
            {warehouse.warehouse}
          </span>{" "}
          Products list{" "}
        </h2>
        <div>
          <Link to={`/add-product`} class="p-name button-cart">
            <i className="material-icons md-plus"></i> Create new
          </Link>
        </div>
      </div>

      <div className="mb-4">
        <header className="mt-3 p-3">
          <div className="row gx-3">
            <div className="col-lg-4 col-md-6 me-auto">
              <input
                type="text"
                placeholder="Search..."
                className="form-control box-shadow"
                name="byName"
                onChange={inputHandler}
              />
            </div>

            <div style={{ marginTop: 7 }} className="col-lg-2 col-6 col-md-3">
              <select
                name="byCategory"
                className="form-select box-shadow"
                onChange={inputHandler}
              >
                <option value="">All category</option>
                <option value="Baju">Baju</option>
                <option value="Celana">Celana</option>
                <option value="Jaket">Jaket</option>
                <option value="Topi">Topi</option>
              </select>
            </div>

            <div style={{ marginTop: 7 }} className="col-lg-2 col-6 col-md-3">
              <select
                name="sort"
                className="form-select box-shadow"
                onChange={inputHandler}
              >
                <option value="">Sort by</option>
                <option value="lowPrice">Lowest price</option>
                <option value="highPrice">Highest price</option>
                <option value="az">A to Z</option>
                <option value="za">Z to A</option>
              </select>
            </div>
          </div>
        </header>
      </div>
      {renderProducts()}
      <div
        style={{ marginTop: 12, marginLeft: 1065 }}
        className="col-lg-2 col-6 col-md-3"
      >
        <div className="d-flex flex-row justify-content-between align-items-center">
          <button
            onClick={prevPageHandler}
            className="btn btn-success"
            disabled={paging.currentPage === 1}
          >
            {"<"}
          </button>
          <div className="text-center px-4">
            Page {paging.currentPage} of {paging.maxPage}
          </div>
          <button
            onClick={nextPageHandler}
            className="btn btn-success"
            disabled={paging.currentPage === paging.maxPage}
          >
            {">"}
          </button>
        </div>
      </div>
    </div>
  );
}
