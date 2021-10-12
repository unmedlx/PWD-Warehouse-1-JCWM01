import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import '../../assets/styles/Checkout.css'

const CheckoutDetails = ({ nextStep, handleChange }) => {
    const cartsGlobal = useSelector((state) => state.carts);

    const getTotal = () => {
        let total = 0
        let arrCarts = Object.values(cartsGlobal)
        console.log(arrCarts.length);

        for (let i = 0; i < arrCarts.length; i++) {
            total = total + arrCarts[i].subtotal
        }
        return total
    }

    const renderCheckoutItem = () => {
        let arrCarts = Object.values(cartsGlobal)

        return arrCarts.map((cart) => {
            return (
                <>
                    <div className="checkout-detail">
                        <div div className="checkout-item" >
                            <div className="col-1 me-5"><img className="img-fluid" src={cart.productImage} /></div>
                            <div className="col">
                                <div className="row text-muted">{cart.category}</div>
                                <div className="row">{cart.productName}</div>
                            </div>
                            <div className="col text-center"> <p className="m-0">{cart.quantity}</p></div>
                            <div className="col">Rp. {cart.price} </div>
                            <div className="col">Rp. {cart.subtotal} </div>
                        </div >
                    </div >
                    <hr />
                </>
            )
        })

    }

    return (
        <div className="mt-5 ms-4">
            {/* <h3>Checkout Detail</h3> */}

            <div className="checkout-detail-container">
                <hr />

                {renderCheckoutItem()}
            </div>
            <div className="checkout-detail mt-2">
                <div div className="checkout-item" >
                    <div className="col-1 me-5"></div>
                    <div className="col">
                        <div className="row text-muted"></div>
                        <div className="row"></div>
                    </div>
                    <div className="col text-center"> <p className="m-0"></p></div>
                    <div className="col">Total </div>
                    <div className="col">Rp.{getTotal()} </div>
                </div >
            </div >
            <button>Back to Cart</button>
            <button onClick={nextStep}>Next</button>


        </div >
    )
}

export default CheckoutDetails
