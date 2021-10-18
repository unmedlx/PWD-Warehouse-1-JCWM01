import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import axios from 'axios'
import { API_URL } from '../../constants/API';
import { Redirect } from 'react-router-dom'

const PaymentConfirmation = ({ nextStep, prevStep, handleChange, total, shippingInformation, previewOrder }) => {
    console.log(previewOrder);
    const cartsGlobal = useSelector((state) => state.carts);
    const [isFinnished, setisFinnished] = useState(true)
    const [redirect, setredirect] = useState(false)


    const Previous = e => {
        e.preventDefault();
        prevStep();
    }

    const checkoutHandler = async () => {
        let idTransaction = 0
        try {
            // update userStock based on cart
            const changeUserStocksResponse = await axios.patch(`${API_URL}/userstocks`, {
                cartsGlobal
            })

            //Insert Transaction to table transaction
            const addTransactionResponse = await axios.post(`${API_URL}/transaction`, {
                idAddress: shippingInformation.idAddress,
                idUser: shippingInformation.idUser,
                subtotalPrice: total,
                deliveryCost: previewOrder.cost[0].value,
                courier: previewOrder.name,
                courierService: previewOrder.service,
                idWarehouse: previewOrder.idWarehouse
            })
            idTransaction = addTransactionResponse.data.results.insertId

            //insert checkout item
            const addCheckoutItem = await axios.post(`${API_URL}/checkout`, {
                cartsGlobal, idTransaction
            })

            const deleteCartResponse = await axios.delete(`${API_URL}/cart`,
                {
                    data: cartsGlobal
                })
            console.log(deleteCartResponse);

            setredirect(true)


        } catch (error) {
            console.log(error);//send error dari backend
            alert("Stock di warehouse tidak cukup");
        }

    }

    if (redirect) {
        return <Redirect to='/profile' />;
    }

    return (

        <div className="mt-5 ms-4">
            <h4>Payment Confirmation</h4>

            <div className="shipping-information-container">
                <div className="row mt-4">
                    <div className="col-6 preview-order-left">
                        <div className="row">
                            <div>
                                <label>Payment</label>
                                <div className="mt-2 mb-3">
                                    <img src="https://www.bloods-industries.co/wp-content/uploads/2020/12/bca3.png" alt="" />
                                    {/* <p className="subtitle">Bank BCA (Transfer)</p> */}
                                </div>
                            </div>
                            <div className="mb-3">
                                <label>Account Number</label>
                                <h4 className="subtitle"> 80091203928</h4>
                            </div>
                            <div className="mb-3">
                                <label>Account Name</label>
                                <h4 className="subtitle"> A/N Cinta</h4>
                            </div>
                            <div className="mb-3">
                                <label>Total Price</label>
                                <h4 className="subtitle">Rp. {(total + previewOrder.cost[0].value).toLocaleString()}</h4>
                            </div>


                        </div>

                    </div>
                    <div className="col-6 preview-order-right">
                        <div className="row px-4">
                            <h4 className="subtitle">Checkout Agreement</h4>
                            <ul>
                                <li>
                                    <div className="mt-2">
                                        Silahkan melakukan pembayaran ke rekening BANK BCA atas nama CINTA 800 912 03928
                                    </div >
                                </li>
                                <li>
                                    <div className="mt-2">
                                        Harap lakukan konfirmasi dengan mengirimkan bukti transfer pada halaman transaksi
                                    </div >
                                </li>
                                <li>
                                    <div className="mt-2">
                                        Apabila dalam jangka waktu 1 X 24 jam tidak melakukan proses transaksi maka pesanan akan kami batalkan.
                                    </div >
                                </li>
                            </ul>
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" id="flexCheckDefault" onChange={() => setisFinnished(!isFinnished)} />
                                <label className="form-check-label" for="flexCheckDefault">
                                    Saya Setuju
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            </div >

            <button className="button nav-button" onClick={Previous} type="submit">Previous</button>
            <button className="button nav-button" type="submit" onClick={checkoutHandler} disabled={isFinnished}>Finish</button>
        </div >
    )
}

export default PaymentConfirmation
