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
  const [warehouse, setWarehouse] = useState({});
  const [paging, setPaging] = useState({
    previousPage: 0,
    nextPage: 0,
    currentPage: 1,
    productsCount: 0,
    maxPage: 1,
  });
  const [filtering, setFiltering] = useState({
    byStatus: "",
    sort: "",
  });

  const fetchWarehouse = () => {
    axios
      .get(`${API_URL}/warehouses?idUser=${adminGlobal.idUser}`)
      .then((response) => {
        setWarehouse({
          idWarehouse: response.data[0].idWarehouse,
          warehouse: response.data[0].warehouse,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchRequests = () => {
    const { idWarehouse } = adminGlobal;
    axios
      .get(
        `${API_URL}/wh-stocks?idWarehouse=${idWarehouse}&page=${paging.currentPage}&filterStatus=${filtering.byStatus}&sortBy=${filtering.sort}`
      )
      .then((response) => {
        setRequests(response.data.data);
        setPaging({
          ...paging,
          nextPage: response.data.next_page || paging.nextPage,
          previousPage: response.data.previous_page || paging.previousPage,
          productsCount: response.data.products_count || paging.productsCount,
          maxPage: response.data.max_page || paging.maxPage,
        });
        renderRequests();
      })
      .catch((err) => {
        alert(err);
      });
  };

  const acceptRequest = (data) => {
    console.log(data.idRequest, data.idTransaction, adminGlobal.idWarehouse);
    axios
      .post(`${API_URL}/wh-stocks/accept`, {
        idWarehouse: adminGlobal.idWarehouse,
        idRequest: data.idRequest,
        idTransaction: data.idTransaction,
      })
      .then((res) => {
        alert(res.data.message);
        fetchRequests();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const sendRequest = () => {
    console.log("aku pengen request dengan idWarehouse", warehouse.idWarehouse);
    axios
      .post(`${API_URL}/wh-stocks/request`, {
        idWarehouse: adminGlobal.idWarehouse,
      })
      .then((res) => {
        alert(res.data.message);
        renderRequests();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const renderRequests = () => {
    return requests.map((val) => {
      return (
        <RequestCard
          idRequest={val.idRequest}
          idTransaction={val.idTransaction}
          productName={val.productName}
          Sender={val.Sender}
          idSender={val.idSender}
          Receiver={val.Receiver}
          idProduct={val.idProduct}
          quantity={val.quantity}
          dateRequest={val.dateRequest}
          status={val.status}
          idWarehouse={adminGlobal.idWarehouse}
          acceptBtn={acceptRequest}
        />
      );
    });
  };

  useEffect(() => {
    fetchRequests();
    renderRequests();
    fetchWarehouse();
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
    setPaging({ currentPage: 1 });
  };

  return (
    <div style={{ padding: "60px" }} className="">
      <div className="content-header">
        <h2 className=" h1">Request List Warehouse {warehouse.warehouse}</h2>
      </div>

      <div className="mb-4">
        <header className="mt-3 p-3">
          <div className="row gx-3">
            <div className="col-lg-4 col-md-6 me-auto">
              <button className="button rounded-pill" onClick={sendRequest}>
                Send Request
              </button>
            </div>

            <div style={{ marginTop: 7 }} className="col-lg-2 col-6 col-md-3">
              <select
                name="byStatus"
                className="form-select box-shadow"
                onChange={inputHandler}
              >
                <option value="">All Status</option>
                <option value="requesting-stock">Requesting</option>
                <option value="incoming-request">Incoming Request</option>
                <option value="accepted">Accepted</option>
              </select>
            </div>

            <div style={{ marginTop: 7 }} className="col-lg-2 col-6 col-md-3">
              <select
                name="sort"
                className="form-select box-shadow"
                onChange={inputHandler}
              >
                <option value="">Sort by</option>
                <option value="goingin">Going In</option>
                <option value="goingout">Going Out</option>
              </select>
            </div>
          </div>
        </header>
      </div>

      <div className="table-responsive">
        <table className="table ">
          <thead>
            <tr>
              <th>Request</th>
              <th>Transaction</th>
              <th>Requester</th>
              <th>Stock Sender</th>
              <th>Product</th>
              <th>Quantity</th>
              <th>Date</th>
              <th>Status/Action</th>
            </tr>
          </thead>
          <tbody>{renderRequests()}</tbody>
        </table>
      </div>

      {/* FOOTER */}
      <div className="d-flex flex-row justify-content-center align-items-center">
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

      {/* <div className="d-flex flex-row justify-content-center align-items-center">
        <button
          onClick={prevPageHandler}
          className="btn btn-success rounded-pill"
          disabled={paging.currentPage === 1}
        >
          {"<"}
        </button>
        <div className="text-center px-4">
          Page {paging.currentPage} of {paging.maxPage}
        </div>
        <button
          onClick={nextPageHandler}
          className="btn btn-success rounded-pill"
          disabled={paging.currentPage == paging.maxPage}
        >
          {">"}
        </button>
      </div> */}
    </div>
  );
}
