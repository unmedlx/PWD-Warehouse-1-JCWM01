import { Modal, Button } from 'react-bootstrap'
import axios from 'axios'
import '../../assets/styles/ImageModals.css'

import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { API_URL } from '../../helper/index'
import { fetchOngoingTransaction } from '../../redux/actions/Transaction'



const PaymentReceiptModal = ({ show, handleClose, idTransaction, buktiPembayaran }) => {
    const dispatch = useDispatch()
    const [file, setFile] = useState()
    const userGlobal = useSelector((state) => state.users);
    const { idUser } = userGlobal
    const [successUpload, setSuccessUpload] = useState(false)

    // console.log(idTransaction);



    const send = event => {
        // console.log(file[0]);

        if (file[0].size > 5000000) {
            return alert("Photo must be under 5MB")
        }

        //membuat data form
        const data = new FormData()

        //ini akan ngirim token yang nantinya akan di auth
        //untuk mendapatkan idUser di backend
        let obj = {
            idUser: idUser
        }

        const userLocalStorage = localStorage.getItem("token_shutter")

        //data token dan juga file photo
        data.append("data", JSON.stringify(obj))
        data.append("file", file[0])

        axios.patch(`${API_URL}/transaction/upload?idUser=${idUser}&idTransaction=${idTransaction}`,
            data,
            {
                headers: {
                    authorization: `Bearer ${userLocalStorage}`,
                },
            }
        )
            .then((res) => {
                dispatch(fetchOngoingTransaction(idUser, 1, ""))
                setSuccessUpload(res.data.success)
                alert(res.data.message)
            },
            )
    }

    useEffect(() => {
        // console.log("Use Effect!")
        return () => {
            // console.log("Unmount")
        }
    })


    return (
        <>
            <Modal show={show} onHide={handleClose} >
                <Modal.Header closeButton>
                    <Modal.Title>Upload your payment proof {idTransaction}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="image-modals-proof-container">
                        <div className="image-modals-proof-preview-container">
                            <img id="imgpreviewProof" src={"http://localhost:3001/" + buktiPembayaran} width="50%" />
                            {/* <img id="imgpreviewProof" width="50%" /> */}

                        </div>
                        <form action="">
                            <input type="file" id="file" onChange={event => {
                                const file = event.target.files
                                setFile(file)
                                let preview = document.getElementById("imgpreviewProof")
                                preview.src = URL.createObjectURL(file[0])
                            }} />
                        </form>
                        {/* {successUpload ?
                            <button className="btn btn-success mt-2" disabled>Success</button>
                            : */}
                        <button className="btn btn-warning mt-2" onClick={send}>Send</button>
                        {/* } */}
                    </div>

                </Modal.Body>

            </Modal>
        </>
    )
}

export default PaymentReceiptModal
