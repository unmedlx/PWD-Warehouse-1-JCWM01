import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios'
import { API_URL } from '../../helper';
import '../../assets/styles/Checkout.css'
import { useDispatch, useSelector } from 'react-redux';
import { fetchDetailTransaction, fetchTransactionById } from '../../redux/actions/Transaction';

const DetailTransaction = () => {
    const dispatch = useDispatch()
    const { data, subtotalPrice,
        deliveryCost,
        courier,
        courierService,
        transactionDate,
        buktiPembayaran,
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
                            <div className="col-1 me-5"><img className="img-fluid" src={transaction.productImage} /></div>
                            <div className="col">
                                <div className="row text-muted">{transaction.category}</div>
                                <div className="row">{transaction.productName}</div>
                            </div>
                            <div className="col text-center"> <p className="m-0">{transaction.quantity}</p></div>
                            <div className="col">Rp. {transaction.price.toLocaleString()} </div>
                            <div className="col">Rp. {(transaction.price * transaction.quantity).toLocaleString()} </div>
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
        <div className="body-checkout">
            <div className="checkout-container-transaction-detail p-5 mt-5">
                <div className="ms-4">
                    <h4>Order #{idTransaction}</h4>
                    <p>{recipientName}</p>
                    <p>{phoneNumber}</p>
                    <p>{jalan}</p>
                    <p>{kecamatan}, {kota}, {provinsi} ({zip})</p>

                    <div className="checkout-detail mt-5">
                        <div div className="checkout-item" >
                            <div className="col-1 me-5"></div>
                            <div className="col subtitle ">Name</div>
                            <div className="col subtitle text-center">qty</div>
                            <div className="col subtitle">Price</div>
                            <div className="col subtitle">Subtotal</div>
                        </div >
                    </div >
                    <div className="checkout-detail-transaction-container">
                        <hr />
                        {renderDetailTransaction()}
                    </div>
                    <div className="checkout-detail mt-5">
                        <div div className="checkout-item" >
                            <div className="col-1 me-5"></div>
                            <div className="col">
                                <div className="row"></div>
                                <div className="row"></div>
                            </div>
                            <div className="col text-center"> <p className="m-0"></p></div>
                            <div className="col subtitle">Total</div>
                            <div className="col subtitle">Rp.{subtotalPrice}</div>
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
