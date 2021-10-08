import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { API_URL } from '../helper'
import AddAddressModal from './AddAddressModal';
import AddressCard from './AddressCard';
import '../assets/styles/ProfileAddress.css'

const ProfileAddress = () => {
    const userGlobal = useSelector((state) => state.users);
    const [show, setShow] = useState(false);
    const [addresses, setAddresses] = useState([])
    const dispatch = useDispatch()

    const reload = () => window.location.reload();

    const handleClose = () => {
        setShow(false);
        reload()
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
                <div className="address">
                    <h4><strong>Address</strong></h4>
                    <button className="btn btn-warning" onClick={handleShow}>Add Address</button>
                </div>
                <div>
                    {renderAddress()}
                </div>
            </div>

            <AddAddressModal show={show} handleClose={handleClose} />
        </>
    )
}

export default ProfileAddress
