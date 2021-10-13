import React, { useEffect, useState } from 'react'
import '../../assets/styles/Checkout.css'
import axios from 'axios'
import { API_URL } from '../../constants/API'

const PreviewOrder = ({ nextStep, prevStep, handleChange, total, shippingInformation }) => {
    const [closestWarehouse, setclosestWarehouse] = useState({})

    const Continue = () => {
        // handleChange(chooseAddress)
        nextStep();
    }
    const Previous = e => {
        e.preventDefault();
        prevStep();
    }


    const getClosestWarehouse = () => {
        console.log(shippingInformation);
        axios.post(`${API_URL}/address/closest-address/`, shippingInformation)
            .then((res) => {
                console.log(res.data);
                setclosestWarehouse(res.data)
            })
            .catch((err) => {
                console.log(err);
            })
    }

    useEffect(() => {
        getClosestWarehouse()
    }, [])



    return (
        <div className="mt-5 ms-4">
            <h3>Preview Order</h3>
            <div className="shipping-information-container">
                <div className="checkout-detail mt-2">
                    {total}
                </div >
                <div>
                    {shippingInformation.recipientName}
                    {shippingInformation.kota},
                    {shippingInformation.provinsi}
                </div>
                <div>
                    {closestWarehouse.warehouse}
                </div>
            </div>
            <button onClick={Previous} type="submit">Previous</button>
            <button onClick={Continue} type="submit">Next</button>
        </div >

    )
}

export default PreviewOrder