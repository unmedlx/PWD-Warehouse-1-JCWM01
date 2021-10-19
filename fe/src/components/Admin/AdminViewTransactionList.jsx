import React, { useState } from 'react'
import { Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import moment from "moment";

import '../../assets/styles/Typography.css'

import AdminPaymentReciept from '../Admin/AdminPaymentReciept';

const AdminViewTransactionList = ({ data }) => {
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
                <div className="col">
                    <p className="subtitle-600 m-0">{data.invoiceNumber}</p>
                    <p className="subtitle-500 m-0">{moment(data.transactionDate).format('MMMM Do YYYY, h:mm:ss a')}</p>
                    {badgeStatus}
                </div>
                <div className="col">
                    <div className="row">
                        <p className="m-0 p-0 text-small subtitle-600">
                            {data.recipientName}
                        </p>
                    </div>
                    <div className="row">
                        <p className="m-0 p-0 text-small">{data.phoneNumber}</p>
                    </div>
                    <div className="row">
                        <p className="m-0 p-0 text-small subtitle-500">{data.kecamatan}, {data.kota}</p>
                    </div>
                    <div className="row">
                        <p className="m-0 p-0 text-small subtitle-600">{data.provinsi}</p>
                    </div>
                </div>
                <div className="col">
                    <div className="row">
                        <p className="p-0 m-0 text-small ">
                            {data.courier}
                        </p>
                    </div>
                    <div className="row">
                        <p className="m-0 p-0 text-small">{data.courierService}</p>
                    </div>

                </div>
                <div className="col-1">
                    <div className="row">
                        <div className="row">
                            <p className="m-0 p-0 text-small subtitle-500">{data.sumquantity} item(s)</p>
                        </div>
                        <div className="row">
                            <p className="m-0 p-0 text-small subtitle-600">Rp. {data.subtotalPrice}</p>
                        </div>
                    </div>
                </div>
                <div className="col-1">
                    <button onClick={handleShowProof}>Payment</button>
                </div>
                <div className="col">
                    <button>tes</button>
                    <button>tes</button>
                    <button>tes</button>
                    <button>tes</button>
                    <button>tes</button>
                </div>
            </div>

            <hr />
            <AdminPaymentReciept show={showProof} handleClose={handleCloseProof} idStatus={data.idStatus} idTransaction={data.idTransaction} buktiPembayaran={data.buktiPembayaran} />
        </>
    )
}

export default AdminViewTransactionList
