import React, { useState } from 'react'
import { API_URL } from '../helper';
import AddressModal from './AddressModal';
import axios from 'axios';
import '../assets/styles/ProfileAddress.css'
import { Badge } from 'react-bootstrap';

const AddressCard = ({ address }) => {
    const [show, setShow] = useState(false);
    const reload = () => window.location.reload();

    const handleClose = () => {
        setShow(false);
        reload()

    }
    const handleShow = () => setShow(true);

    const deleteBtnHandler = (idAddress) => {
        axios.delete(`${API_URL}/address/${idAddress}`)
            .then((res) => {
                console.log(res);
                alert(res.data.message)
                handleClose()
            })
            .catch((err) => {
                console.log(err);
            })
    }


    return (
        <>
            <div className="address-card">
                <div>
                    <div className="address-card-data">
                        <div className="status">
                            {
                                address.isDefault == 1 ?
                                    <p><Badge bg="#32b280">Primary</Badge></p>
                                    : null
                            }
                        </div>
                        <div className="recipient">
                            <h6>{address.recipientName}</h6>
                        </div>
                        <p className="phoneNumber">{address.phoneNumber}</p>
                        <div className="address-location">
                            <p>{address.jalan}</p>
                            <p>{address.kecamatan}, {address.kota}, {address.provinsi}</p>
                            <p>{address.zip}</p>
                        </div>
                    </div>
                    <a className="address-edit setting" onClick={handleShow}>Edit</a>
                    <a className="address-delete setting" onClick={() => deleteBtnHandler(address.idAddress)}>Delete</a>
                </div>
            </div>
            <AddressModal show={show} handleClose={handleClose} address={address} />
        </>
    )
}

export default AddressCard
