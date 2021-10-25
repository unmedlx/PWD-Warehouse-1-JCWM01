import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Badge } from "react-bootstrap";
import moment from "moment";

import "../../assets/styles/Typography.css";

import AdminSidebar from "../AdminSidebar";
import AdminPaymentReciept from "../Admin/AdminPaymentReciept";

const SuperAdminViewTransactionList = ({ data, currentPage }) => {
  const warehouseGlobal = useSelector((state) => state.warehouses);
  const [showProof, setShowProof] = useState(false);
  const handleShowProof = () => setShowProof(true);
  const reload = () => {};

  const handleCloseProof = () => {
    setShowProof(false);
    reload();
  };

  let badgeStatus;
  if (data.idStatus === 1) {
    badgeStatus = <Badge bg="danger">{data.status}</Badge>;
  } else if (data.idStatus === 2) {
    badgeStatus = <Badge bg="secondary">{data.status}</Badge>;
  } else if (data.idStatus === 3) {
    badgeStatus = <Badge bg="info">{data.status}</Badge>;
  } else if (data.idStatus >= 4 && data.idStatus <= 5) {
    badgeStatus = <Badge bg="warning">{data.status}</Badge>;
  } else if (data.idStatus >= 6 && data.idStatus <= 7) {
    badgeStatus = <Badge bg="primary">{data.status}</Badge>;
  } else if (data.idStatus === 8) {
    badgeStatus = <Badge bg="success">{data.status}</Badge>;
  } else if (data.idStatus === 9) {
    badgeStatus = <Badge bg="danger">{data.status}</Badge>;
  }

  let paymentBadge;
  if (data.buktiPembayaran && data.idStatus > 3) {
    paymentBadge = <Badge bg="success">Confirmed</Badge>;
  } else if (data.idStatus === 2) {
    paymentBadge = <Badge bg="secondary">Waiting for Verification</Badge>;
  } else if (data.idStatus === 1) {
    paymentBadge = <Badge bg="danger">Waiting for Payment</Badge>;
  }
  return (
    <>
      <div style={{ marginLeft: -60 }}>
        <AdminSidebar warehouse={warehouseGlobal.warehouse} />
      </div>
      <div className="row transaction-card">
        <div className="col-3">
          <p className="subtitle-600 m-0">{data.invoiceNumber}</p>
          <p className="subtitle-500 m-0">
            {moment(data.transactionDate).format("MMMM Do YYYY, h:mm:ss a")}
          </p>
          {badgeStatus}
        </div>
        <div className="col-2">
          <div className="row">
            <p className="m-0 p-0 text-small subtitle-600">
              {data.recipientName}
            </p>
          </div>
          <div className="row">
            <p className="m-0 p-0 text-small">{data.phoneNumber}</p>
          </div>
          <div className="row">
            <p className="m-0 p-0 text-small subtitle-500">
              {data.kecamatan}, {data.kota}
            </p>
          </div>
          <div className="row">
            <p className="m-0 p-0 text-small subtitle-600">{data.provinsi}</p>
          </div>
        </div>
        <div className="col-2">
          <div className="row">
            <p className="p-0 m-0 text-small ">{data.courier}</p>
          </div>
          <div className="row">
            <p className="m-0 p-0 text-small">{data.courierService}</p>
          </div>
        </div>
        <div className="col-2">
          <div className="row">
            <div className="row">
              <p className="m-0 p-0 text-small subtitle-500">
                {data.sumquantity} item(s)
              </p>
            </div>
            <div className="row">
              <p className="m-0 p-0 text-small subtitle-600">
                Rp. {data.subtotalPrice}
              </p>
            </div>
          </div>
        </div>
        <div className="col-2">
          <div>
            <button onClick={handleShowProof}>Payment</button>
          </div>
          {paymentBadge}
        </div>
        <div className="col-1">
          <p className="m-0 p-0 subtitle-500 italic">{data.warehouse}</p>
        </div>
      </div>

      <hr />
      <AdminPaymentReciept
        show={showProof}
        handleClose={handleCloseProof}
        data={data}
        currentPage={currentPage}
      />
    </>
  );
};

export default SuperAdminViewTransactionList;
