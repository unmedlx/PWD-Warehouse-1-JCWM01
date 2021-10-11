import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { API_URL } from '../helper'
import AddAddressModal from './AddAddressModal';
import AddressCard from './AddressCard';
import '../assets/styles/ProfileAddress.css'

const ProfileAddress = (addressGlobal) => {
    const userGlobal = useSelector((state) => state.users);
    const [show, setShow] = useState(false);
    const [provinces, setProvinces] = useState([])


    const reload = () => window.location.reload();

    const handleClose = () => {
        setShow(false);
        reload()
    }

    const handleShow = () => setShow(true);

    const fetchDataAddress = () => {
        const { idUser } = userGlobal
    }

    const renderAddress = () => {
        let arrAddress = Object.values(addressGlobal.addresses)
        return arrAddress.map((address) => {
            // return <Address />
            return (
                <AddressCard address={address} />
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

    useEffect(() => {
        fetchDataAddress()

    }, [])

    return (
        <>
            <div>
                <div className="address">
                    <h4><strong>Address</strong></h4>
                    <button className="btn btn-warning" onClick={handleShow}>Add Address</button>
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
