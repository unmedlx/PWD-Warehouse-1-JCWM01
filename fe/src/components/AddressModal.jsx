import React from 'react'
import { Modal } from 'react-bootstrap'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'


const AddressModal = ({ show, handleClose, address }) => {

    const addressDataInitialValues = {
        //diisi dari redux
        recipientName: address.recipientName,

    }

    const addressDataValidationSchema = Yup.object().shape({
        recipientName: Yup.string().required("Username is required"),

    })

    const onSubmit = (data) => {
        console.log(data);
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
                                <Field type="text" autocomplete="off" className="input-field" name="recipientName" placeholder="Username" disabled />
                            </div>

                        </div>
                        <button type="submit" className="btn btn-warning">Edit Data</button>
                    </Form>
                </Formik>

            </Modal.Body>

        </Modal>
    )
}

export default AddressModal
