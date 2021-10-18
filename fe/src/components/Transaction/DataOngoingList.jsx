import React, { useEffect, useState } from 'react'
import { Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import moment from "moment";

import '../../assets/styles/DetailTransaction.css'



import PaymentReceiptModal from './PaymentReceiptModal'

const DataOngoingList = ({ data }) => {
    const [showProof, setShowProof] = useState(false);
    const [showDetail, setShowDetail] = useState(false);
    const handleShowProof = () => setShowProof(true);


    const handleCloseProof = () => {
        setShowProof(false);

    }
    let badgeStatus;
    if (data.idStatus == 1) {
        badgeStatus = (
            <Badge bg="warning">{data.status}</Badge>
        );
    } else if (data.idStatus == 2) {
        badgeStatus = (
            <Badge bg="primary">{data.status}</Badge>
        );
    } else if (data.idStatus >= 3 || data.idStatus <= 7) {
        badgeStatus = (
            <Badge bg="info">{data.status}</Badge>
        );
    } else if (data.idStatus == 8) {
        badgeStatus = (
            <Badge bg="success">{data.status}</Badge>
        );
    } else if (data.idStatus == 9) {
        badgeStatus = (
            <Badge bg="danger">{data.status}</Badge>
        );
    }


    return (
        <>
            <div className="row transaction-card">
                <div className="col-4">
                    <h5 className="subtitle-600 m-0">{data.invoiceNumber}</h5>
                    <h6 className="subtitle-500 m-0">{moment(data.transactionDate).format('MMMM Do YYYY, h:mm:ss a')}</h6>
                    {badgeStatus}
                </div>

                <div className="col-3">
                    <div className="row">

                        {data.courier}

                    </div>
                    <div className="row">
                        <p className="m-0 p-0">{data.courierService}</p>
                    </div>
                </div>

                <div className="col-5">
                    <div className="row">
                        <div className="row">
                            <div className="col">
                                <p className="m-0">{data.sumquantity} item(s)</p>
                            </div>
                            <div className="col">
                                <p className="m-0 p-0">Rp. {data.subtotalPrice}</p>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                                Delivery Cost
                            </div>
                            <div className="col">
                                <p className="m-0 p-0">Rp. {data.deliveryCost}</p>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                                Total
                            </div>
                            <div className="col">
                                <p className="m-0 p-0">Rp. {data.deliveryCost + data.subtotalPrice}</p>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            <div className="row mt-2">
                <div className="col-7">

                </div>
                <div className="col-5">
                    <button className="button-transaction" onClick={handleShowProof}>Payment Proof</button>
                    <button className="button-transaction">
                        <Link className="link-transaction" to={`/transaction/detail/${data.idTransaction}`}>
                            Transaction Details
                        </Link>
                    </button>
                </div>

            </div>
            <hr />
            <PaymentReceiptModal show={showProof} handleClose={handleCloseProof} idTransaction={data.idTransaction} buktiPembayaran={data.buktiPembayaran} />
        </>
    )
}

export default DataOngoingList
