import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { API_URL } from "../constants/API";
import { Link } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "../assets/styles/AdminDashboard.css";

import RequestCard from "../components/WHRequestCard";

export default function WarehouseStock() {
  const adminGlobal = useSelector((state) => state.admins);
  const [requests, setRequests] = useState([]);
  const [warehouse, setWarehouse] = useState("");

  // const [paging, setPaging] = useState({
  //   previousPage: 0,
  //   nextPage: 0,
  //   currentPage: 1,
  //   productsCount: 0,
  //   maxPage: 1,
  // });

  const [filtering, setFiltering] = useState({
    byName: "",
    byCategory: "",
    sort: "",
  });

  const fetchWarehouse = () => {
    axios
      .get(`${API_URL}/warehouses?idUser=${adminGlobal.idUser}`)
      .then((response) => {
        setWarehouse(response.data[0].idWarehouse);
        // console.log(response.data[0].idWarehouse);
      })
      .catch((err) => {
        alert(err);
      });
  };

  const fetchRequests = () => {
    const {idWarehouse} = adminGlobal
    console.log(idWarehouse);
    axios.post(`${API_URL}/wh-stocks/`, {idWarehouse: idWarehouse})
    .then((results) => {
      setRequests(results.data)
      renderRequests()
      console.log(results.data);
    })
    .catch((err) => {
      alert(err)
      console.log(err);
    })
    // axios
    //   .get(
    //     `${API_URL}/products?page=${paging.currentPage}&productName=${filtering.byName}&category=${filtering.byCategory}&sortBy=${filtering.sort}`
    //   )
    //   .then((response) => {
    //     setProducts(response.data.data);

    //     setPaging({
    //       ...paging,
    //       nextPage: response.data.next_page || paging.nextPage,
    //       previousPage: response.data.previous_page || paging.previousPage,
    //       productsCount: response.data.products_count || paging.productsCount,
    //       maxPage: response.data.max_page || paging.maxPage,
    //     });
    //     renderProducts();
    //   })
    //   .catch((err) => {
    //     alert(err);
    //   });
 
  };

  const renderRequests = () => {
    return requests.map((val) => {
      return (
        <RequestCard
          idRequest={val.idRequest}
          productName={val.productName}
          Sender={val.Sender}
          Receiver={val.Receiver}
          idProduct={val.idProduct}
          quantity={val.quantity}
          dateRequest={val.dateRequest}
          status={val.status}
        />
      );
    });
  };

  useEffect(() => {
    fetchRequests();
    renderRequests();
    fetchWarehouse();
  }, []);

  // const nextPageHandler = () => {
  //   setPaging({
  //     currentPage: paging.currentPage + 1,
  //   });
  // };

  // const prevPageHandler = () => {
  //   setPaging({
  //     currentPage: paging.currentPage - 1,
  //   });
  // };

  const inputHandler = (event) => {
    const value = event.target.value;
    const name = event.target.name;

    setFiltering({ ...filtering, [name]: value });
  };

  return (
    <div style={{ padding: "60px", backgroundColor: "white" }} className="">
      <div className="content-header">
        <h2 className="content-title d-flex flex-row align-items-center">
         Request List
        </h2>
       
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
                <option value="">All Status</option>
                <option value="Requesting">Requesting</option>
                <option value="Incoming Request">Incoming Request</option>
                <option value="Accepted">Accepted</option>
              </select>
            </div>

            <div style={{ marginTop: 7 }} className="col-lg-2 col-6 col-md-3">
              <select
                name="sort"
                className="form-select box-shadow"
                onChange={inputHandler}
              >
                <option value="">Sort by</option>
                <option value="az">Going In</option>
                <option value="za">Going Out</option>
              </select>
            </div>
          </div>
        </header>
      </div>

     <div className="table-responsive">
      <table className="table ">
        <thead>
          <tr>
            <th>ID</th>
            <th>Requester</th>
            <th>Stock Sender</th>
            <th>Product</th>
            <th>Quantity</th>
            <th>Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
           {renderRequests()}
        </tbody>
      </table>

     </div>
     
     {/* FOOTER */}
      <div className="d-flex flex-row justify-content-center align-items-center">
        <button
          // onClick={prevPageHandler}
          className="btn btn-success rounded-pill"
          // disabled={paging.currentPage === 1}
        >
          {"<"}
        </button>
        <div className="text-center px-4">
          Page 1 of 1
        </div>
        <button
          // onClick={nextPageHandler}
          className="btn btn-success rounded-pill"
          // disabled={paging.currentPage === paging.maxPage}
        >
          {">"}
        </button>
      </div>
    </div>
  );
}
