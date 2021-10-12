import React from 'react'
import '../../assets/styles/Checkout.css'

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
            <h3>Checkout Detail</h3>

            <div className="shipping-information-container">
                <div className="checkout-detail mt-2">

                </div >
                <div>

                </div>
            </div>
            <button onClick={Previous} type="submit">Previous</button>
            <button onClick={Continue} type="submit">Next</button>
        </div >

    )
}

export default PreviewOrder