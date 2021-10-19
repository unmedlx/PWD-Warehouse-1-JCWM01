import { Modal, Button } from 'react-bootstrap'
import axios from 'axios'
import '../../assets/styles/ImageModals.css'

import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { API_URL } from '../../helper/index'
import { fetchOngoingTransaction, paymentAccepted, paymentDeclined } from '../../redux/actions/Transaction'



const AdminPaymentReciept = ({ show, handleClose, idStatus, idTransaction, buktiPembayaran }) => {
    const dispatch = useDispatch()
    const userGlobal = useSelector((state) => state.users);
    const { idUser } = userGlobal
    const [successUpload, setSuccessUpload] = useState(false)

    console.log(idStatus);

    console.log(idTransaction);


    const approve = () => {
        dispatch(paymentAccepted(idTransaction))
    }
    const decline = () => {
        dispatch(paymentDeclined(idTransaction))

    }


    return (
        <>
            <Modal show={show} onHide={handleClose} >
                <Modal.Header closeButton>
                    <Modal.Title className="subtitle">Payment</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="image-modals-proof-container">
                        <div className="image-modals-proof-preview-container">
                            <img id="imgpreviewProof" src={"http://localhost:3001/" + buktiPembayaran} width="50%" />
                            {/* <img id="imgpreviewProof" width="50%" /> */}

                        </div>
                        {idStatus > 3 ?
                            <button className="btn btn-success mt-2" disabled>Approved</button>
                            :
                            <button className="btn btn-success mt-2" onClick={approve}>Approve</button>
                        }
                        <button className="btn btn-danger mt-2" onClick={decline}>Decline</button>
                    </div>

                </Modal.Body>

            </Modal>
        </>
    )
}

export default AdminPaymentReciept
