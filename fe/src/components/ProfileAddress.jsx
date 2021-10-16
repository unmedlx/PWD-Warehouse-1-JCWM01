import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { API_URL } from '../helper'
import AddAddressModal from './AddAddressModal';
import AddressCard from './AddressCard';
import '../assets/styles/ProfileAddress.css'

const ProfileAddress = (addressGlobal) => {
    // const userGlobal = useSelector((state) => state.users);
    const userLocalStorage = localStorage.getItem("token_shutter");
    const [show, setShow] = useState(false);
    const [provinces, setProvinces] = useState([])
    const [dataAddresses, setdataAddresses] = useState({})
    const [done, setdone] = useState(false)


    // const reload = () => window.location.reload();

    const handleClose = () => {
        setShow(false);
        // reload()
        setdone(true)
    }

    const handleShow = () => setShow(true);

    const fetchDataAddress = () => {
        axios
            .post(
                `${API_URL}/address/`,
                {},
                {
                    headers: {
                        authorization: `Bearer ${userLocalStorage}`,
                    },
                }
            )
            .then((res) => {
                setdataAddresses(res.data)
            })
            .catch((err) => {
                console.log(err);
            });
    }

    const renderAddress = () => {
        // console.log(addressGlobal.addresses);
        let arrAddress = Object.values(dataAddresses)
        return arrAddress.map((address) => {
            // return <Address />
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
        fetchDataAddress()
    }, [])

    useEffect(() => {
        fetchProvince()
        fetchDataAddress()
    }, [done])

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
