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
                            <div className="col">Rp. {cart.price.toLocaleString()} </div>
                            <div className="col">Rp. {cart.subtotal.toLocaleString()} </div>
                        </div >
                    </div >
                    <hr />
                </>
            )
        })

    }
    const Continue = () => {
        let total = getTotal()
        handleChange(total)
        nextStep();
    }

    return (
        <div className="mt-5 ms-4">
            <h4>Checkout Details</h4>

            <div className="checkout-detail mt-5">
                <div div className="checkout-item" >
                    <div className="col-1 me-5"></div>
                    <div className="col subtitle ">Name</div>
                    <div className="col subtitle text-center">qty</div>
                    <div className="col subtitle">Price</div>
                    <div className="col subtitle">Subtotal</div>
                </div >
            </div >
            <div className="checkout-detail-container">
                <hr />
                {renderCheckoutItem()}
            </div>
            <div className="checkout-detail mt-2">
                <div div className="checkout-item" >
                    <div className="col-1 me-5"></div>
                    <div className="col">
                        <div className="row"></div>
                        <div className="row"></div>
                    </div>
                    <div className="col text-center"> <p className="m-0"></p></div>
                    <div className="col subtitle">Total</div>
                    <div className="col subtitle">Rp.{getTotal().toLocaleString()} </div>
                </div >
            </div >

            <div className="btn-container">
                <button className="button nav-button">Back to Cart</button>
                <button className="button nav-button" onClick={Continue}>Next</button>
            </div>


        </div >
    )
}

export default CheckoutDetails
