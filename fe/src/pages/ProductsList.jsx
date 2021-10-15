import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { API_URL } from "../constants/API";
import { Link } from "react-router-dom";
import axios from "axios";

import "bootstrap/dist/js/bootstrap.min.js";
import "bootstrap/dist/css/bootstrap.css";

import ProductCard from "../components/ProductCard";
import CartModal from "../components/CartModal";

export default function ProductsList() {
  const [show, setShow] = useState(false);
  const reload = () => window.location.reload();
  const handleClose = () => {
    setShow(false);
    return cartGlobal.cartList.map((val) => {
      axios
        .patch(`${API_URL}/carts/${val.idProduct}?idUser=${val.idUser}`, {
          quantity: val.quantity,
        })
        .then(() => {})
        .catch(() => {
          alert(`Server error`);
        });
    });
    // reload();
  };
  const handleShow = () => setShow(true);

  const cartGlobal = useSelector((state) => state.cart);
  const userGlobal = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);
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

  const fetchCart = () => {
    axios
      .get(`${API_URL}/carts?idUser=${userGlobal.idUser}`)
      .then((response) => {
        dispatch({
          type: "FILL_CART",
          payload: response.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

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
    fetchCart();
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
    <>
      <button
        style={{ marginLeft: 1145, fontWeight: "bold" }}
        className="btn btn-success col-lg-1 col-6 col-md-3 my-5 position-relative"
        onClick={handleShow}
      >
        CART
        <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
          {cartGlobal.cartList.length}
          <span class="visually-hidden">Cart quantity</span>
        </span>
      </button>
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
                name="byName"
                onChange={inputHandler}
              />
            </div>

            <div className="col-lg-2 col-6 col-md-3">
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

            <div className="col-lg-2 col-6 col-md-3">
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

        <div className="col-10 d-flex ">
          <div className="d-flex flex-wrap flex-row justify-content-evenly mb-1">
            {renderProducts()}
          </div>
        </div>

        <div className="my-4 d-flex flex-column justify-content-center align-items-center">
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
      <CartModal show={show} handleClose={handleClose} />
    </>
  );
}
