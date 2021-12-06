import React, { useState } from "react";
import { Badge } from "react-bootstrap";
import { Link } from "react-router-dom";
import moment from "moment";

import "../../assets/styles/DetailTransaction.css";
import "../../assets/styles/Typography.css";
import styles from "../../components/Profile/NewProfileSidebar/NewProfileSidebar.module.css"

import PaymentReceiptModal from "./PaymentReceiptModal";

const DataOngoingList = ({ data }) => {
  const [showProof, setShowProof] = useState(false);
  const handleShowProof = () => setShowProof(true);

  const handleCloseProof = () => {
    setShowProof(false);
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

  return (
    <div>
      <div className="row transaction-card">
        <div className="col-4">
          <h5 className="subtitle-600 text-small m-0">{data.invoiceNumber}</h5>
          <h6 className="subtitle-500 text-smaller m-0">
            {moment(data.transactionDate).format("MMMM Do YYYY, h:mm:ss a")}
          </h6>
          {badgeStatus}
        </div>

        <div className="col-3">
          <div className="row">
            <p className="p-0 m-0 subtitle-600 text-smaller">{data.courier}</p>
          </div>
          <div className="row">
            <p className="m-0 p-0 text-smaller">{data.courierService}</p>
          </div>
        </div>

        <div className="col-5">
          <div className="row">
            <div className="row">
              <div className="col">
                <p className="m-0 p-0 subtitle-500 text-smaller">
                  {data.sumquantity} item(s)
                </p>
              </div>
              <div className="col">
                <p className="m-0 p-0 text-smaller">Rp. {data.subtotalPrice}</p>
              </div>
            </div>
            <div className="row">
              <div className="col">
                <p className="m-0 p-0 text-smaller">Delivery Cost</p>
              </div>
              <div className="col">
                <p className="m-0 p-0 text-smaller">Rp. {data.deliveryCost}</p>
              </div>
            </div>
            <div className="row">
              <div className="col">
                <p className="m-0 p-0 subtitle-500 text-small">Total</p>
              </div>
              <div className="col">
                <p className="m-0 p-0 subtitle-500 text-small">
                  Rp. {data.deliveryCost + data.subtotalPrice}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row mt-2 mb-4">
        <div className="col-7"></div>
        <div className="col-5">
          <button className={styles["button-transaction"]} onClick={handleShowProof}>
            Payment Proof
          </button>
          <button className={styles["button-transaction"]}>
            <Link
              className="link-transaction"
              to={`/transaction/detail/${data.idTransaction}`}
            >
              Details
            </Link>
          </button>
        </div>
      </div>
      <hr />
      <PaymentReceiptModal
        show={showProof}
        handleClose={handleCloseProof}
        idTransaction={data.idTransaction}
        buktiPembayaran={data.buktiPembayaran}
      />
    </div>
  );
};

export default DataOngoingList;
