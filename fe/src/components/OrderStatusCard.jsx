import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.css";

export default function OrderStatusCard(props) {
  return (
    <div className="">
      <div
        className="card card-body shades mb-4 d-flex flex-row justify-content-evenly align-items-center"
        style={{ height: 160, width: 400 }}
      >
        <div className="d-flex flex-row ">
          <span className="display-3">{props.jumlahOrder}</span>
          <span className="align-self-end">order{"(s)"}</span>
        </div>

        <div className="text">
          <h6 className="">{props.status}</h6>
        </div>
      </div>
    </div>
  );
}
