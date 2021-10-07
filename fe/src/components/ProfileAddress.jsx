import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { API_URL } from '../helper'
import Address from './Address';
import AddressCard from './AddressCard';

const ProfileAddress = ({ setProfileNav }) => {
    const userGlobal = useSelector((state) => state.users);
    const [addresses, setAddresses] = useState([])
    const [tesReset, setTesReset] = useState()
    const dispatch = useDispatch()



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
            <p><strong>Address</strong></p>
            <button className="btn btn-warning">Add new address</button>
            <div className="profile-main-address">
                {renderAddress()}
            </div>
        </>
    )
}

export default ProfileAddress
