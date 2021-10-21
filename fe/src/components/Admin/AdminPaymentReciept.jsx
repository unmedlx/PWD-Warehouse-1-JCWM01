import { Modal, Button } from 'react-bootstrap'
import axios from 'axios'
import '../../assets/styles/ImageModals.css'

import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { API_URL } from '../../helper/index'
import { paymentAccepted, paymentDeclined, fetchAdminViewTransaction } from '../../redux/actions/transaction'



const AdminPaymentReciept = ({ show, handleClose, data, currentPage }) => {
    const dispatch = useDispatch()
    const userGlobal = useSelector((state) => state.users);
    const { idStatus, idTransaction, buktiPembayaran, invoiceNumber, idWarehouse } = data
    const { idUser } = userGlobal



    const approve = () => {
        dispatch(paymentAccepted(idTransaction, idWarehouse, currentPage))
        dispatch(fetchAdminViewTransaction(idWarehouse, currentPage, 0, "", ""))
    }
    const decline = () => {
        dispatch(paymentDeclined(idTransaction, idWarehouse, currentPage))
        dispatch(fetchAdminViewTransaction(idWarehouse, currentPage, 0, "", ""))
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
                            <button className="btn btn-success mt-2"
                                onClick={() => {
                                    const isApprove = window.confirm(
                                        `Approve transaction ${invoiceNumber} ?`
                                    )
                                    if (isApprove === true) {
                                        approve()
                                    }
                                }}>
                                Approve</button>
                        }
                        <button className="btn btn-danger mt-2" onClick={() => {
                            const isDecline = window.confirm(
                                `Decline transaction ${invoiceNumber} ?`
                            )
                            if (isDecline === true) {
                                decline()
                            }
                        }}>
                            Decline</button>
                    </div>

                </Modal.Body>

            </Modal>
        </>
    )
}

export default AdminPaymentReciept
