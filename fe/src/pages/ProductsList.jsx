import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { API_URL } from "../constants/API";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.css";

import ProductCard from "../components/ProductCard";

export default function ProductsList() {
  const [products, setProducts] = useState([]);

  const [paging, setPaging] = useState({
    previousPage: 0,
    nextPage: 0,
    currentPage: 1,
    productsCount: 1,
    maxPage: 1,
  });

  const [filtering, setFiltering] = useState({
    byName: "",
    byCategory: "",
  });

  const [sorting, setSorting] = useState("");

  const fetchProducts = () => {
    axios
      .get(
        `${API_URL}/products?page=${paging.currentPage}&productName=${filtering.byName}&category=${filtering.byCategory}&sortBy=${sorting}`
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

  const renderProducts = () => {
    return products.map((val) => {
      return (
        <ProductCard
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
    renderProducts();
  }, [paging.currentPage]);

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

  return (
    <div className="d-flex flex-column justify-content-center align-items-center">
      <header
        style={{ width: 1122, backgroundColor: "#f7f7f7" }}
        className="mt-3"
      >
        <div className="row gx-3">
          <div className="col-lg-4 col-md-6 me-auto">
            <input
              type="text"
              placeholder="Search..."
              className="form-control box-shadow"
            />
          </div>

          <div className="col-lg-2 col-6 col-md-3">
            <select className="form-select box-shadow">
              <option>All category</option>
              <option>Baju</option>
              <option>Celana</option>
              <option>Jaket</option>
              <option>Topi</option>
            </select>
          </div>

          <div className="col-lg-2 col-6 col-md-3">
            <select className="form-select box-shadow ">
              <option>Sort by</option>
              <option>Lowest price</option>
              <option>Highest price</option>
              <option>A to Z</option>
              <option>Z to A</option>
            </select>
          </div>
        </div>
      </header>

      <div className="col-10 d-flex ">
        <div className="d-flex flex-wrap flex-row justify-content-evenly mb-1">
          {renderProducts()}
        </div>
      </div>

      <div className="my-4 d-flex flex-column justify-content-center align-items-center">
        <p>Total found: {paging.productsCount} products</p>
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
