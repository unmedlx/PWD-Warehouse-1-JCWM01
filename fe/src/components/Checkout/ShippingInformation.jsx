import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import '../../assets/styles/Checkout.css'

const ShippingInformation = ({ nextStep, prevStep, handleChange }) => {
    const addressGlobal = useSelector((state) => state.addresses);
    const [chooseAddress, setchooseAddress] = useState([])

    const Continue = () => {
        handleChange(chooseAddress)
        nextStep();
    }
    const Previous = e => {
        e.preventDefault();
        prevStep();
    }

    const handleSelectedId = (e) => {
        const selectedId = e.target.value
        let arrAddress = Object.values(addressGlobal)
        const result = arrAddress.filter(address =>
            address.idAddress == selectedId
        )
        setchooseAddress(result[0])

    }

    const renderAddress = () => {
        let arrAddress = Object.values(addressGlobal)
        return arrAddress.map((address) => {
            return <option value={address.idAddress}>{address.recipientName}</option>
        })
    }

    const fetchPrimaryAddress = () => {
        let arrAddress = Object.values(addressGlobal)
        setchooseAddress(arrAddress[0]);
    }

    useEffect(() => {
        fetchPrimaryAddress()
    }, [])

    return (
        <div className="mt-5 ms-4">
            <h3>Checkout Detail</h3>

            <div className="shipping-information-container">
                <div className="checkout-detail mt-2">
                    <div div className="shipping-information-item" >
                        <div className="col">
                            <div className="row">{chooseAddress.recipientName}</div>
                            <div className="row">{chooseAddress.phoneNumber}</div>
                        </div>
                        <div className="col">
                            <div className="row text-muted">{chooseAddress.jalan}</div>
                            <div className="row">{chooseAddress.kecamatan}, {chooseAddress.kota}, {chooseAddress.provinsi}</div>
                        </div>
                    </div >
                </div >
                <div>
                    <label htmlFor="selectAddress">Select</label>
                    <select name="selectAddress" onChange={(e) => handleSelectedId(e)}>
                        {renderAddress()}
                    </select>
                </div>
            </div>
            <button onClick={Previous} type="submit">Previous</button>
            <button onClick={Continue} type="submit">Next</button>
        </div >
    )
}

export default ShippingInformation
