import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Modal } from 'react-bootstrap';
import * as Yup from 'yup';
import axios from 'axios';
import { API_URL } from '../helper/index';
import { useDispatch, useSelector } from 'react-redux';
import '../assets/styles/addressModals.css';
import { AddAddress } from '../redux/actions/addressUser';

const AddAddressModal = ({ show, handleClose, provinces }) => {
    const userLocalStorage = localStorage.getItem("token_shutter")
    const dispatch = useDispatch()
    const userGlobal = useSelector((state) => state.users);
    const { idUser } = userGlobal
    const [successUpload, setSuccessUpload] = useState(false)

    const [province, setProvince] = useState("Choose Province")
    const [city, setCity] = useState([])
    const [selectedCity, setSelectedCity] = useState()


    const addressDataInitialValues = {
        //diisi dari redux
        recipientName: "",
        phoneNumber: "",
        jalan: "",
        kecamatan: "",
        city: selectedCity,
        province: province,
        zip: "",
        isDefault: ""

    }

    const addressDataValidationSchema = Yup.object().shape({
        recipientName: Yup.string().required("Recipient name is required"),
        phoneNumber: Yup.number().min(12).required("Phone number is required"),
        jalan: Yup.string().required("Street is required"),
        kecamatan: Yup.string().required("Subdivision is required"),
        city: Yup.string().required("City is required"),
        province: Yup.string().required("Province is required"),
        zip: Yup.number().required("ZIP is required"),

    });

    const onSubmit = (data) => {
        console.log(data);
        if (data.isDefault === true) {
            data = { ...data, isDefault: 1 }
        } else if (data.isDefault === false) {
            data = { ...data, isDefault: 0 }
        }
        data = { ...data, idUser: idUser }

        dispatch(
            AddAddress(data, userLocalStorage)
        )
    }

    const fetchCity = () => {
        axios.get(`${API_URL}/cityprovince/city?province=${province}`)
            .then((res) => {
                setCity(res.data.results)
            })
            .catch((err) => {
                alert(err);
            })

    }

    useEffect(() => {
        fetchCity()
    }, [province])



    return (
        <Modal show={show} onHide={handleClose} size="lg" >
            <Modal.Header closeButton className="modal-header-style">
                <Modal.Title classname="header-title">Add New Address</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Formik initialValues={addressDataInitialValues}
                    onSubmit={onSubmit}
                    validationSchema={addressDataValidationSchema}
                    enableReinitialize={true}>

                    <Form>
                        <div className="address-modals-container">
                            <div className="profile-main-data">
                                <div className="input-container">
                                    <label htmlFor="province" className="form-label">Province</label>
                                    <ErrorMessage name="province" component="span" className="error-message" />
                                    <Field as="select" className="input-field" name="province" value={province} onChange={(e) => setProvince(e.target.value)} >
                                        {provinces.map((province) => {
                                            return <option value={province.idProvince}>{province.provinceName}</option>
                                        })}
                                    </Field>
                                </div>

                                <div className="input-container">
                                    <label htmlFor="city" className="form-label">City</label>
                                    <ErrorMessage name="city" component="span" className="error-message" />
                                    <Field as="select" className="input-field" name="city" value={selectedCity} onChange={(e) => setSelectedCity(e.target.value)} >
                                        {city.map((c) => {
                                            return <option value={c.cityName}>{c.cityName}</option>
                                        })}
                                    </Field>
                                </div>
                                <div className="input-container">
                                    <label htmlFor="recipientName" className="form-label">Recipient Name</label>
                                    <ErrorMessage name="recipientName" component="span" className="error-message" />
                                    <Field type="text" autocomplete="off" className="input-field" name="recipientName" placeholder="Recipient Name" />
                                </div>


                                <div className="input-container">
                                    <label htmlFor="phoneNumber" className="form-label">Phone Number</label>
                                    <ErrorMessage name="phoneNumber" component="span" className="error-message" />
                                    <Field type="text" autocomplete="off" className="input-field" name="phoneNumber" placeholder="Phone Number" />
                                </div>


                                <div className="input-container">
                                    <label htmlFor="jalan" className="form-label">Street</label>
                                    <ErrorMessage name="jalan" component="span" className="error-message" />
                                    <Field type="text" autocomplete="off" className="input-field" name="jalan" placeholder="Street" />
                                </div>


                                <div className="input-container">
                                    <label htmlFor="kecamatan" className="form-label">District</label>
                                    <ErrorMessage name="kecamatan" component="span" className="error-message" />
                                    <Field type="text" autocomplete="off" className="input-field" name="kecamatan" placeholder="District" />
                                </div>



                                <div className="input-container">
                                    <label htmlFor="zip" className="form-label">ZIP</label>
                                    <ErrorMessage name="zip" component="span" className="error-message" />
                                    <Field type="text" autocomplete="off" className="input-field" name="zip" placeholder="ZIP" />
                                </div>
                            </div>
                            {successUpload ?
                                <button className="btn success-btn" disabled>Success</button>
                                :
                                <button type="submit" className="btn submit-btn">Add Address</button>
                            }
                        </div>

                    </Form>
                </Formik>

            </Modal.Body>

        </Modal >
    )
}

export default AddAddressModal
