import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import axios from 'axios'
import { API_URL } from '../../helper';
import '../../assets/styles/Checkout.css'
import '../../assets/styles/DetailTransaction.css'
import { useDispatch, useSelector } from 'react-redux';
import { fetchDetailTransaction, fetchTransactionById } from '../../redux/actions/Transaction';
import moment from "moment";
import { Badge } from 'react-bootstrap'
import { FaTimes } from 'react-icons/fa'

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
            return (
                <>
                    <div className="checkout-detail">
                        <div div className="checkout-item" >
                            <div className="col-1 me-5 text-center"><img className="img-fluid" src={transaction.productImage} /></div>
                            <div className="col text-center">
                                <div className="row">{transaction.productName}</div>
                                <div className="row text-muted">{transaction.category}</div>
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

    return (
        <div className="body-transaction-detail">
            <div className="container-transaction-detail">
                <div className="detail-header d-flex justify-content-between px-4 pt-4">
                    <p className="detail-header-text subtitle italic">{invoiceNumber}</p>
                    <Link class="close" to="/profile"><FaTimes /></Link>
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
                                    idStatus == 1 ?
                                        <Badge bg="primary">
                                            {status}
                                        </Badge>
                                        :
                                        <Badge bg="warning">
                                            {status}
                                        </Badge>
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
                        {/* <button className="button nav-button">Back to Cart</button>
                        <button className="button nav-button" onClick>Next</button> */}
                    </div>

                </div>
            </div >
        </div>
    )
}

export default DetailTransaction
