import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { API_URL } from '../helper'
import AddAddressModal from './AddAddressModal';
import AddressCard from './AddressCard';
import '../assets/styles/ProfileAddress.css'

const ProfileAddress = () => {
    // const userGlobal = useSelector((state) => state.users);
    const addressGlobal = useSelector((state) => state.addresses);
    const [show, setShow] = useState(false);
    const [provinces, setProvinces] = useState([])


    const handleClose = () => {
        setShow(false);
    }

    const handleShow = () => setShow(true);

    const renderAddress = () => {
        let arrAddress = Object.values(addressGlobal)
        return arrAddress.map((address) => {
            return (
                <AddressCard address={address} provinces={provinces} handleClose={handleClose} />
            )
        })
    }

    const fetchProvince = () => {
        axios.get(`${API_URL}/cityprovince/province`)
            .then((res) => {
                setProvinces(res.data.results)
            })
            .catch((err) => {
                console.log(err);
            })
    }

    useEffect(() => {
        fetchProvince()
    }, [])



    return (
        <>
            <div>
                <div className="address">
                    {/* <h4><strong>Address</strong></h4> */}
                    <h6 className="subtitle-600">You can have up to 5 addresses</h6>
                    <button className="button" onClick={handleShow}>Add Address</button>
                </div>
                <div>
                    {renderAddress()}
                </div>
            </div>

            <AddAddressModal show={show} handleClose={handleClose} provinces={provinces} />
        </>
    )
}

export default ProfileAddress
