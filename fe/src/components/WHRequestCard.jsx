import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import moment from "moment";

export default function AdminProductCard(props) {
  let status;
  let color;
  // Conditioning By Status //
  if (props.status === "Requesting Stock" && props.idWarehouse === props.idSender) {
    status = (
      <div className="d-flex flex-column">
        <span
          className="badge rounded-pill alert-warning my-1"
          style={{ backgroundColor: "orange", color: "black" }}
        >
          Incoming Request
        </span>
        <button
          className="badge rounded-pill alert-primary my-1"
          onClick={() => props.acceptBtn({ idRequest: props.idRequest, idTransaction: props.idTransaction, })}
        >
          Accept
        </button>
      </div>
    );
    color = { backgroundColor: "lightyellow" };
  } else if (props.status === "Requesting Stock") {
    status = (
      <span className="badge rounded-pill alert-primary">{props.status}</span>
    );
    color = { backgroundColor: "lightblue" };
  } else if (props.status === "Accepted") {
    status = (
      <span className="badge rounded-pill alert-success">{props.status}</span>
    );
  }

  // Render Row //
  return (
    <tr style={color}>
      <td>
        <h6>ID: {props.idRequest}</h6>
      </td>
      <td>
        <h6>ID: {props.idTransaction}</h6>
      </td>
      <td>{props.Receiver}</td>
      <td>{props.Sender}</td>
      <td>
        <div className="d-flex flex-column justify-content-center">
          <div>{props.productName}</div>
          <span style={{ fontSize: "10px" }}>ID: {props.idProduct}</span>
        </div>
      </td>
      <td>{props.quantity} pcs</td>
      <td>{moment(props.dateRequest).format("DD-MMMM-YYYY, h:mm a")}</td>
      <td>{status}</td>
    </tr>
  );
}
