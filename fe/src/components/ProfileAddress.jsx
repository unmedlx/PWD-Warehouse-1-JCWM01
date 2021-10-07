import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { API_URL } from '../helper'
import AddAddressModal from './AddAddressModal';
import Address from './Address';
import AddressCard from './AddressCard';

const ProfileAddress = () => {
    const userGlobal = useSelector((state) => state.users);
    const [show, setShow] = useState(false);
    const [addresses, setAddresses] = useState([])
    const dispatch = useDispatch()

    const handleClose = () => {
        setShow(false);
    }

    const handleShow = () => setShow(true);


    const fetchDataAddress = (idUser) => {
        axios.get(`${API_URL}/address/${idUser}`)
            .then((res) => {
                console.log(res.data.results);
                dispatch({
                    type: "GET_ADDRESS",
                    payload: res.data.results
                })
                setAddresses(res.data.results)
            })
            .catch((err) => {
                console.log(err);
            })
    }

    const renderAddress = () => {
        return addresses.map((address) => {
            // return <Address />
            return (
                <AddressCard address={address} />
            )
        })
    }

    useEffect(() => {
        const { idUser } = userGlobal
        fetchDataAddress(idUser)
    }, [])

    return (
        <>
            <div>
                <p><strong>Address</strong></p>
                <button className="btn btn-warning mt-3" onClick={handleShow}>Add Address</button>
                <div className="profile-main-address">
                    {renderAddress()}
                </div>
            </div>

            <AddAddressModal show={show} handleClose={handleClose} />
        </>
    )
}

export default ProfileAddress
