import React, { useState } from 'react'
import { Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import moment from "moment";

import '../../assets/styles/Typography.css'

import AdminPaymentReciept from '../Admin/AdminPaymentReciept';
import { useDispatch } from 'react-redux';
import { addUserStock, changeStatus, deleteAdminStock, fetchAdminViewTransaction, returnUserStock } from '../../redux/actions/Transaction';

const AdminViewTransactionList = ({ data, currentPage }) => {
    const dispatch = useDispatch()
    const [showProof, setShowProof] = useState(false);
    const [showDetail, setShowDetail] = useState(false);
    const handleShowProof = () => setShowProof(true);
    const reload = () => { }

    const handleCloseProof = () => {
        setShowProof(false);
        reload()

    }

    const deliver = async () => {
        dispatch(changeStatus(data.idTransaction, 7))
        // Delete data di adminStock
        dispatch(deleteAdminStock(data.idWarehouse, data.idTransaction))
        dispatch(fetchAdminViewTransaction(data.idWarehouse, currentPage, 0, "", ""))
    }
    const done = async () => {
        dispatch(changeStatus(data.idTransaction, 8))
        dispatch(fetchAdminViewTransaction(data.idWarehouse, currentPage, 0, "", ""))
    }
    const cancel = async () => {
        dispatch(changeStatus(data.idTransaction, 9))
        dispatch(returnUserStock(data.idWarehouse, data.idTransaction))
        dispatch(fetchAdminViewTransaction(data.idWarehouse, currentPage, 0, "", ""))
    }


    let badgeStatus;
    if (data.idStatus === 1) {
        badgeStatus = (
            <Badge bg="danger">{data.status}</Badge>
        );
    } else if (data.idStatus === 2) {
        badgeStatus = (
            <Badge bg="secondary">{data.status}</Badge>
        );
    } else if (data.idStatus === 3) {
        badgeStatus = (
            <Badge bg="info">{data.status}</Badge>
        );
    } else if (data.idStatus >= 4 && data.idStatus <= 5) {
        badgeStatus = (
            <Badge bg="warning">{data.status}</Badge>
        );
    } else if (data.idStatus >= 6 && data.idStatus <= 7) {
        badgeStatus = (
            <Badge bg="primary">{data.status}</Badge>
        );
    } else if (data.idStatus === 8) {
        badgeStatus = (
            <Badge bg="success">{data.status}</Badge>
        );
    } else if (data.idStatus === 9) {
        badgeStatus = (
            <Badge bg="danger">{data.status}</Badge>
        );
    }

    let paymentBadge;
    if (data.buktiPembayaran && data.idStatus > 3) {
        paymentBadge = (
            <Badge bg="success">Confirmed</Badge>
        )
    } else if (data.idStatus === 2) {
        paymentBadge = (
            <Badge bg="secondary">Waiting for Verification</Badge>
        )
    } else if (data.idStatus === 1) {
        paymentBadge = (
            <Badge bg="danger">Waiting for Payment</Badge>
        )
    }
    return (
        <>
            <div className="row transaction-card">
                <div className="col-3">
                    <p className="subtitle-600 m-0">{data.invoiceNumber}</p>
                    <p className="subtitle-500 m-0">{moment(data.transactionDate).format('MMMM Do YYYY, h:mm:ss a')}</p>
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
                        <p className="m-0 p-0 text-small subtitle-500">{data.kecamatan}, {data.kota}</p>
                    </div>
                    <div className="row">
                        <p className="m-0 p-0 text-small subtitle-600">{data.provinsi}</p>
                    </div>
                </div>
                <div className="col-2">
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
                <div className="col-2">
                    <div>
                        <button onClick={handleShowProof}>Payment</button>
                    </div>
                    {paymentBadge}
                </div>
                <div className="col-2">
                    <button>
                        <Link className="link-transaction" to={`/admin-transaction-detail/${data.idTransaction}`}>
                            See
                        </Link>
                    </button>
                    {data.idStatus >= 7 ?
                        <button onClick={deliver} disabled>Deliver</button>
                        : <button onClick={deliver}>Deliver</button>
                    }
                    {data.idStatus >= 8 ?
                        <button onClick={done} disabled>Done</button>
                        : <button onClick={done}>Done</button>
                    }
                    {data.idStatus >= 8 ?
                        <button onClick={cancel} disabled>Cancel</button>
                        : <button onClick={cancel}>Cancel</button>
                    }
                </div>
            </div>

            <hr />
            <AdminPaymentReciept show={showProof} handleClose={handleCloseProof} data={data} currentPage={currentPage} />
        </>
    )
}

export default AdminViewTransactionList
