import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import axios from 'axios'
import { API_URL } from '../../helper';
import '../../assets/styles/Checkout.css'
import '../../assets/styles/DetailTransaction.css'
import { useDispatch, useSelector } from 'react-redux';
import { fetchDetailTransaction, fetchTransactionById } from '../../redux/actions/transaction';
import moment from "moment";
import { Badge } from 'react-bootstrap'
import { FaTimes } from 'react-icons/fa'
import { useHistory } from "react-router-dom";

const DetailTransaction = () => {
    const dispatch = useDispatch()
    const { data, subtotalPrice,
        invoiceNumber,
        deliveryCost,
        courier,
        courierService,
        transactionDate,
        buktiPembayaran,
        idStatus,
        status,
        recipientName,
        phoneNumber,
        kecamatan,
        kota,
        provinsi,
        zip,
        jalan } = useSelector(state => state.detailTransaction)
    let { idTransaction } = useParams();
    const [detailCheckout, setdetailCheckout] = useState({})

    // console.log(buktiPembayar);

    const fetchTransaction = async () => {
        dispatch(fetchDetailTransaction(idTransaction))
        dispatch(fetchTransactionById(idTransaction))
    }

    const renderDetailTransaction = () => {
        return data.map((transaction) => {
            let badge;
            if (transaction.category == "Baju") {
                badge = (
                    <span className="badge rounded-pill alert-success">{transaction.category}</span>
                );
            } else if (transaction.category == "Celana") {
                badge = (
                    <span className="badge rounded-pill alert-primary">{transaction.category}</span>
                );
            } else if (transaction.category == "Jaket") {
                badge = (
                    <span className="badge rounded-pill alert-warning">{transaction.category}</span>
                );
            } else if (transaction.category == "Topi") {
                badge = (
                    <span className="badge rounded-pill alert-danger">{transaction.category}</span>
                );
            }
            return (
                <>
                    <div className="checkout-detail">
                        <div div className="checkout-item" >
                            <div className="col-1 me-5 text-center"><img className="img-fluid" src={transaction.productImage} /></div>
                            <div className="col">
                                <div className="row">{transaction.productName}</div>
                                <div className="row">
                                    <div>
                                        {badge}
                                    </div>
                                </div>
                            </div>
                            <div className="col text-center text-center"> <p className="m-0">{transaction.quantity}</p></div>
                            <div className="col text-center">Rp. {transaction.price.toLocaleString()} </div>
                            <div className="col text-center">Rp. {(transaction.price * transaction.quantity).toLocaleString()} </div>
                        </div >
                    </div >
                    <hr />
                </>
            )
        })
    }


    useEffect(() => {
        fetchTransaction()
    }, [])

    let badgeStatus;
    if (data.idStatus == 1) {
        badgeStatus = (
            <Badge bg="danger">{data.status}</Badge>
        );
    } else if (data.idStatus == 2) {
        badgeStatus = (
            <Badge bg="secondary">{data.status}</Badge>
        );
    } else if (data.idStatus == 3) {
        badgeStatus = (
            <Badge bg="primary">{data.status}</Badge>
        );
    } else if (data.idStatus >= 4 && data.idStatus <= 5) {
        badgeStatus = (
            <Badge bg="warning">{data.status}</Badge>
        );
    } else if (data.idStatus >= 6 && data.idStatus <= 8) {
        badgeStatus = (
            <Badge bg="success">{data.status}</Badge>
        );
    } else if (data.idStatus == 9) {
        badgeStatus = (
            <Badge bg="danger">{data.status}</Badge>
        );
    }
    let history = useHistory();

    return (
        <div className="body-transaction-detail">
            <div className="container-transaction-detail">
                <div className="detail-header d-flex justify-content-between px-4 pt-4">
                    <p className="detail-header-text subtitle italic">{invoiceNumber}</p>
                    <button class="close mb-2" onClick={() => history.goBack()}><FaTimes /></button>
                </div>
                <hr className="m-0 mb-3" />
                <div className="mx-5">
                    <div className="d-flex justify-content-between px-2">
                        <div>
                            <p className="m-0 p-0 subtitle">{recipientName}</p>
                            <p className="m-0 p-0 subtitle-500">{phoneNumber}</p>
                            <p className="m-0 p-0 ">{jalan}</p>
                            <p className="m-0 p-0 ">{kecamatan}, {kota}, {provinsi} ({zip})</p>
                        </div>
                        <div>
                            <p className="m-0 p-0 subtitle">
                                {
                                    badgeStatus
                                }
                            </p>
                            <p className="m-0 p-0 subtitle-600">{courierService}</p>
                            <p className="m-0 p-0">{courier}</p>
                            <p className="subtitle-600 mt-1 me-5">{moment(transactionDate).format('MMMM Do YYYY, h:mm:ss a')}</p>
                            <p className="m-0 p-0"></p>
                        </div>
                    </div>
                    <hr className="ruler" />

                    <div className="checkout-detail mt-5">
                        <div div className="checkout-item" >
                            <div className="col-1 me-5 subtitle-600 text-center">#</div>
                            <div className="col subtitle-600">Name</div>
                            <div className="col subtitle-600 text-center">qty</div>
                            <div className="col subtitle-600 text-center">Price</div>
                            <div className="col subtitle-600 text-center">Amount</div>
                        </div >
                    </div >
                    <div className="checkout-detail-transaction-container">
                        <hr />
                        {renderDetailTransaction()}
                    </div>
                    <div className="checkout-detail mt-5">
                        <div div className="checkout-item" >
                            <div className="col-3 me-5"></div>
                            <div className="col">
                            </div>
                            <div className="col text-center"> <p className="m-0"></p></div>
                            <div className="col subtitle">Subtotal</div>
                            <div className="col subtitle">Rp.{subtotalPrice}</div>
                        </div >
                    </div >
                    <div className="checkout-detail mt-1">
                        <div div className="checkout-item" >
                            <div className="col-3 me-5"></div>
                            <div className="col">
                            </div>
                            <div className="col text-center"> <p className="m-0"></p></div>
                            <div className="col ">Delivery</div>
                            <div className="col">Rp.{deliveryCost}</div>
                        </div >
                    </div >
                    <div className="checkout-detail mt-1">
                        <div div className="checkout-item" >
                            <div className="col-3 me-5"></div>
                            <div className="col">
                            </div>
                            <div className="col text-center"> <p className="m-0"></p></div>
                            <div className="col subtitle">Total</div>
                            <div className="col subtitle">Rp.{deliveryCost + subtotalPrice}</div>
                        </div >
                    </div >

                    <div className="btn-container">
                    </div>

                </div>
            </div >
        </div>
    )
}

export default DetailTransaction
