import React from 'react'
import '../../assets/styles/Checkout.css'
import axios from 'axios'

const PreviewOrder = ({ nextStep, prevStep, handleChange, total, shippingInformation }) => {

    const Continue = () => {
        // handleChange(chooseAddress)
        nextStep();
    }
    const Previous = e => {
        e.preventDefault();
        prevStep();
    }



    return (
        <div className="mt-5 ms-4">
            <h3>Preview Order</h3>
            <div className="shipping-information-container">
                <div className="checkout-detail mt-2">
                    {total}
                </div >
                <div>
                    {shippingInformation.recipientName}
                </div>
            </div>
            <button onClick={Previous} type="submit">Previous</button>
            <button onClick={Continue} type="submit">Next</button>
        </div >

    )
}

export default PreviewOrder