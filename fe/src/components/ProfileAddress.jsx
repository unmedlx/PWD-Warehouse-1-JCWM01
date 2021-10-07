import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { API_URL } from '../helper'
import Address from './Address';
import AddressCard from './AddressCard';

const ProfileAddress = () => {
    const userGlobal = useSelector((state) => state.users);

    const [addresses, setAddresses] = useState([])

    const fetchDataAddress = () => {
        const { idUser } = userGlobal
        axios.get(`${API_URL}/address/${idUser}`)
            .then((res) => {
                console.log(res.data.results);
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
        fetchDataAddress()
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
