import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import '../../assets/styles/Checkout.css'
import { Badge } from 'react-bootstrap';

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
            <h4>Shipping Information</h4>

            <div className="shipping-information-container">
                <div>
                    <label htmlFor="selectAddress">Select your address</label>
                    <select className="custom-select" name="selectAddress" onChange={(e) => handleSelectedId(e)}>
                        {renderAddress()}
                    </select>
                </div>
                <div className="shipping-card row">
                    <div>
                        <div className="status">
                            {
                                chooseAddress.isDefault == 1 &&
                                <p><Badge bg="#32b280">Primary</Badge></p>
                            }
                        </div>
                        <div className="row">
                            <div className="col-4">
                                <h4 className="recipient-name">{chooseAddress.recipientName} Ajeng Aulia Maharani</h4>
                                <h6 className="phoneNumber">{chooseAddress.phoneNumber}08081029</h6>
                            </div>
                            <div className="col-2 address-field">
                                <p>Street</p>
                                <p>Province</p>
                                <p>ZIP</p>
                            </div>
                            <div className=" col-5">
                                <p>{chooseAddress.jalan}</p>
                                <p>{chooseAddress.kecamatan}, {chooseAddress.kota}, {chooseAddress.provinsi}</p>
                                <p>{chooseAddress.zip}</p>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <div className="checkout-detail mt-2">
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
                </div > */}
            </div>
            <button className="button nav-button" onClick={Previous} type="submit">Previous</button>
            <button className="button nav-button" onClick={Continue} type="submit">Next</button>
        </div >
    )
}

export default ShippingInformation
