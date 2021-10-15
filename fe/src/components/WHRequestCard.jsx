import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { API_URL } from "../constants/API";
import axios from "axios";
import { Link } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "../assets/styles/AdminDashboard.css";

export default function AdminProductCard(props) {
  let status;
  let requestCard
  let color
  if (props.status == "Requesting Stock") {
    status = <span className="badge rounded-pill alert-primary">{props.status}</span>
    color = {backgroundColor: "lightblue"}
 } else if (props.status == "Must Request") {
        status = (
            <div>
                <button className="badge rounded-pill alert-danger">{props.status}</button>
            </div>
        )
        color = {backgroundColor:"lightpink"}
} else if (props.status == "Accepted") {
        status = <span className="badge rounded-pill alert-success">{props.status}</span>
}
   

  return (
    <tr style={color}>
            <td ><h5 >{props.idRequest}</h5></td>
            <td>{props.Receiver}</td>
            <td>{props.Sender}</td>
            <td>{props.productName}</td>
            <td>{props.quantity} pcs</td>
            <td>{props.dateRequest}</td>
            <td>{status}</td>
      {/* <article className="itemlist">
        <div className="row align-items-center">
          <div className="col col-check flex-grow-0">id:{props.idRequest}</div>
          <div className="col-lg-4 col-sm-4 col-8 flex-grow-1 col-name">
              <div className="info">
                <h6 className="mb-0">ID Receiver {props.idReceiver}</h6>
                <h6 className="mb-0">ID Sender {props.idSender}</h6>
              </div>
          </div>
          <div
            style={{ marginRight: 200 }}
            className="col-lg-2 col-sm-2 col-4 col-price"
          >
            <span>id product {props.idProduct}</span>{" "}
            <span>quantity {props.quantity}</span>{" "}
          </div>
          <div className="col-lg-2 col-sm-2 col-4 col-status">{status}</div>

          <div className="col-lg-1 col-sm-2 col-4 col-action">
            
          </div>
        </div>
      </article> */}
    </tr>
  );
}
