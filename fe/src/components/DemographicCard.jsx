import React from "react";

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "../assets/styles/AdminDashboard.css";

export default function DemographicCard(props) {
  return (
    <article className="itemlist">
      <div className="d-flex flex-row align-items-center justify-content-between p-4">
        <div className="info">
          <h6 className="mb-0">{props.kota}</h6>
        </div>

        <div>
          {" "}
          <span>Total revenue: Rp. {props.revenueKota}</span>{" "}
        </div>
      </div>
    </article>
  );
}
