import React, { useState } from 'react'
import { Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import moment from "moment";

import '../../assets/styles/Typography.css'
import '../../assets/styles/AdminTransaction.css'

import AdminPaymentReciept from '../Admin/AdminPaymentReciept';
import { useDispatch } from 'react-redux';
import { changeStatus, deleteAdminStock, fetchAdminViewTransaction, returnUserStock } from '../../redux/actions/transaction';
import { FaTimes, FaRegEye, FaRegThumbsUp, FaTruck, FaMoneyBillWave } from 'react-icons/fa'

const AdminViewTransactionList = ({ data, currentPage }) => {
    const dispatch = useDispatch()
    const [showProof, setShowProof] = useState(false);
    const handleShowProof = () => setShowProof(true);

    const handleCloseProof = () => {
        setShowProof(false);
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
                <div className="col-2">
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
                        <button onClick={handleShowProof} className="payment-button"><FaMoneyBillWave className="payment-svg" /> Payment</button>
                    </div>
                    {paymentBadge}
                </div>
                <div className="col-1">
                    <div className="row">
                        <div className="col">
                            <button className="payment-action" >
                                <Link className="link-transaction" to={`/admin-transaction-detail/${data.idTransaction}`}>
                                    <FaRegEye className="payment-action-svg" />
                                </Link>
                            </button>
                            {data.idStatus >= 7 || data.idStatus === 2 || data.idStatus === 4 ?
                                <button className="payment-action" onClick={deliver} disabled><FaTruck className="payment-action-svg" /></button>
                                : <button className="payment-action" onClick={() => {
                                    const isDeliver = window.confirm(
                                        `Deliver transaction ${data.invoiceNumber} ?`
                                    )
                                    if (isDeliver === true) {
                                        deliver()
                                    }
                                }}
                                >
                                    <FaTruck className="payment-action-svg" /></button>
                            }
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            {data.idStatus >= 8 || data.idStatus === 2 || data.idStatus === 4 ?
                                <button className="payment-action" onClick={done} disabled><FaRegThumbsUp className="payment-action-svg" /></button>
                                : <button className="payment-action" onClick={() => {
                                    const isDone = window.confirm(
                                        `Finished transaction ${data.invoiceNumber} ?`
                                    )
                                    if (isDone === true) {
                                        done()
                                    }
                                }}><FaRegThumbsUp className="payment-action-svg" /></button>
                            }
                            {data.idStatus >= 8 || data.idStatus === 2 || data.idStatus === 4 ?
                                <button className="payment-action" onClick={cancel} disabled><FaTimes className="payment-action-svg" /></button>
                                : <button className="payment-action" onClick={() => {
                                    const isCancel = window.confirm(
                                        `Cancel transaction ${data.invoiceNumber} ?`
                                    )
                                    if (isCancel === true) {
                                        cancel()
                                    }
                                }}><FaTimes className="payment-action-svg" /></button>
                            }
                        </div>
                    </div>
                </div>
            </div>

            <hr />
            <AdminPaymentReciept show={showProof} handleClose={handleCloseProof} data={data} currentPage={currentPage} />
        </>
    )
}

export default AdminViewTransactionList
