import React, { useEffect, useState } from 'react'
import '../../assets/styles/Checkout.css'
import axios from 'axios'
import { API_URL } from '../../constants/API'

const PreviewOrder = ({ nextStep, prevStep, handleChange, total, shippingInformation }) => {
    const [closestWarehouse, setclosestWarehouse] = useState({})
    const [dataCourier, setdataCourier] = useState()
    const [isLoading, setisLoading] = useState(true)
    const [selectedCourier, setselectedCourier] = useState()

    const Continue = () => {
        handleChange(selectedCourier)
        nextStep();
    }
    const Previous = e => {
        e.preventDefault();
        prevStep();
    }


    const getClosestWarehouse = async () => {
        // console.log(shippingInformation);
        await axios.post(`${API_URL}/address/closest-address/`, shippingInformation)
            .then((res) => {
                setclosestWarehouse(res.data)
                console.log(res.data);
            })
            .catch((err) => {
                console.log(err);
            })

        // setstate ini akan menunggu await
    }

    const getDeliveryRate = (e) => {
        let courier = e.target.value
        if (courier) {
            axios.post(`${API_URL}/transaction/delivery-rate`, {
                originCity: shippingInformation.kota,
                destinationCity: closestWarehouse.kota,
                courier: courier
            })
                .then((res) => {
                    setdataCourier(res.data.results.rajaongkir.results[0]);
                    // setisLoading(false);
                    console.log(res.data.results.rajaongkir.results[0]);
                })
                .catch((err) => {
                    console.log(err);
                })
        } else {
            console.log("Pilih COurier");
        }
    }

    const renderDelivery = () => {
        return dataCourier.costs.map((courier) => {
            courier.name = dataCourier.name
            courier.code = dataCourier.code
            courier.warehouse = closestWarehouse.warehouse
            courier.idWarehouse = closestWarehouse.idWarehouse
            return (
                <div onClick={() => { getSelectedCourier(courier) }}>
                    <h5>{courier.service}</h5>
                    <p>{courier.description}</p>
                    <p>{courier.cost[0].value}</p>
                </div>
            )
        })
    }

    const getSelectedCourier = (courier) => {
        setselectedCourier(courier)
        setisLoading(false)
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
                {selectedCourier &&
                    <div>
                        {selectedCourier.cost[0].value}
                    </div>
                }
                <div>
                    {shippingInformation.recipientName}
                    {shippingInformation.kota},
                    {shippingInformation.provinsi}
                </div>
                <div>
                    {closestWarehouse.warehouse}
                </div>

                <label htmlFor="deliveryRate">Courier</label>
                <select name="" id="deliveryRate" onChange={(e) => getDeliveryRate(e)}>
                    <option value="">Choose Courier</option>
                    <option value="jne">JNE</option>
                    <option value="pos">POS Indonesia</option>
                    <option value="tiki">TIKI</option>
                </select>
                {
                    dataCourier &&
                    <div>
                        {renderDelivery()}
                    </div>
                }
            </div>
            <button onClick={Previous} type="submit">Previous</button>
            <button onClick={Continue} type="submit" disabled={isLoading}>Next</button>
        </div >

    )
}

export default PreviewOrder