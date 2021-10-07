import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Modal } from 'react-bootstrap'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import { API_URL } from '../helper/index'

const AddressModal = ({ show, handleClose, address }) => {
    const userGlobal = useSelector((state) => state.users);
    const { idUser } = userGlobal
    const [successUpload, setSuccessUpload] = useState(false)


    const addressDataInitialValues = {
        //diisi dari redux
        recipientName: address.recipientName,
        phoneNumber: address.phoneNumber,
        jalan: address.jalan,
        kecamatan: address.kecamatan,
        kota: address.kota,
        provinsi: address.provinsi,
        zip: address.zip,
        isDefault: address.isDefault

    }

    const addressDataValidationSchema = Yup.object().shape({
        recipientName: Yup.string().required("Recipient name is required"),
        phoneNumber: Yup.number().required("Phone number is required"),
        jalan: Yup.string().required("Street is required"),
        kecamatan: Yup.string().required("Subdivision is required"),
        kota: Yup.string().required("City is required"),
        provinsi: Yup.string().required("Province is required"),
        zip: Yup.number().required("ZIP is required"),

    })

    const onSubmit = (data) => {
        console.log(data.isDefault[0]);
        if (data.isDefault[0] == '0') {
            data = { ...data, isDefault: 1 }
        } else if (data.isDefault == false) {
            data = { ...data, isDefault: 0 }
        }

        data = { ...data, idAddress: address.idAddress }
        console.log(data);

        axios.patch(`${API_URL}/address/${idUser}`, data)
            .then((res) => {
                console.log(res);
                setSuccessUpload(res.data.success)
                alert(res.data.message)

            })
            .catch((err) => {
                console.log(err);
            })
    }

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Choose Your Profile Picture</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Formik initialValues={addressDataInitialValues}
                    onSubmit={onSubmit}
                    validationSchema={addressDataValidationSchema}
                    enableReinitialize={true}>

                    <Form>
                        <div className="profile-main-data">
                            <div className="input-container">
                                <ErrorMessage name="recipientName" component="span" className="error-message" />
                                <Field type="text" autocomplete="off" className="input-field" name="recipientName" placeholder="Username" />
                            </div>
                        </div>
                        <div className="profile-main-data">
                            <div className="input-container">
                                <ErrorMessage name="phoneNumber" component="span" className="error-message" />
                                <Field type="text" autocomplete="off" className="input-field" name="phoneNumber" placeholder="Username" />
                            </div>
                        </div>
                        <div className="profile-main-data">
                            <div className="input-container">
                                <ErrorMessage name="jalan" component="span" className="error-message" />
                                <Field type="text" autocomplete="off" className="input-field" name="jalan" placeholder="Username" />
                            </div>
                        </div>
                        <div className="profile-main-data">
                            <div className="input-container">
                                <ErrorMessage name="kecamatan" component="span" className="error-message" />
                                <Field type="text" autocomplete="off" className="input-field" name="kecamatan" placeholder="Username" />
                            </div>
                        </div>
                        <div className="profile-main-data">
                            <div className="input-container">
                                <ErrorMessage name="kota" component="span" className="error-message" />
                                <Field type="text" autocomplete="off" className="input-field" name="kota" placeholder="Username" />
                            </div>
                        </div>
                        <div className="profile-main-data">
                            <div className="input-container">
                                <ErrorMessage name="provinsi" component="span" className="error-message" />
                                <Field type="text" autocomplete="off" className="input-field" name="provinsi" placeholder="Username" />
                            </div>
                        </div>
                        <div className="profile-main-data">
                            <div className="input-container">
                                <ErrorMessage name="zip" component="span" className="error-message" />
                                <Field type="text" autocomplete="off" className="input-field" name="zip" placeholder="Username" />
                            </div>
                        </div>
                        <div className="input-container">
                            <ErrorMessage name="isDefault" component="span" className="error-message" />
                            <label>
                                <Field type="checkbox" autocomplete="off" className="input-field" name="isDefault" placeholder="Gender" />
                                Default
                            </label>

                        </div>
                        {successUpload ?
                            <button className="btn btn-success mt-2" disabled>Success</button>
                            :
                            <button type="submit" className="btn btn-warning">Edit Address</button>
                        }
                    </Form>
                </Formik>

            </Modal.Body>

        </Modal>
    )
}

export default AddressModal
