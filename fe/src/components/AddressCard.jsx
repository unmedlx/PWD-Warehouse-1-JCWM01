import React, { useState } from 'react'
import AddressModal from './AddressModal';

const AddressCard = ({ address }) => {
    const [show, setShow] = useState(false);

    const handleClose = () => {
        setShow(false);
    }
    const handleShow = () => setShow(true);
    return (
        <>
            <div className="profile-adress-item">
                <h4>{address.recipientName}</h4>
                <p>{address.phoneNumber}</p>
                <p>{address.jalan}</p>
                <p>{address.kecamatan}</p>
                <p>{address.kota}</p>
                <p>{address.provinsi}</p>
                <p>{address.zip}</p>
                <p>{address.isDefault}</p>
                <button className="btn btn-warning mt-3" onClick={handleShow}>Edit</button>
                <button className="btn btn-danger mt-3">Delete</button>
            </div>
            <AddressModal show={show} handleClose={handleClose} address={address} />
        </>
    )
}

export default AddressCard
