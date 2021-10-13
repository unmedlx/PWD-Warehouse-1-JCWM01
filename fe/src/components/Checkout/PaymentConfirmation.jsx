import React from 'react'

const PaymentConfirmation = ({ nextStep, prevStep, handleChange, total, shippingInformation, previewOrder }) => {
    console.log(previewOrder.service);
    const Continue = () => {
        // handleChange(selectedCourier)
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
                {previewOrder.service}

                <button onClick={Previous} type="submit">Previous</button>
                <button type="submit">Finish</button>
            </div >
        </div >
    )
}

export default PaymentConfirmation
