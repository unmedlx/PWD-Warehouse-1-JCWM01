import { Modal, Button } from 'react-bootstrap'
import Axios from 'axios'
import '../assets/styles/ImageModals.css'

import React, { useEffect, useState } from 'react'
import { API_URL } from '../helper'

const ImageModals = ({ show, handleClose }) => {
    const [file, setFile] = useState()


    const send = event => {
        console.log(file[0].size);
        if (file[0].size > 5000000) {
            return alert("Photo must be under 5MB")
        }
        //membuat data form
        const data = new FormData()

        //ini akan ngirim token yang nantinya akan di auth
        //untuk mendapatkan idUser di backend
        let obj = {
            idUser: 1
        }

        //data token dan juga file photo
        data.append("data", JSON.stringify(obj))
        data.append("file", file[0])

        // Axios.patch(`${API_URL}/profile/upload`, data)
        //     .then(res => {
        //         console.log(res);
        //         handleClose()
        //     })
        //     .catch(err => {
        //         console.log(err);
        //     })

        // Axios.patch("http://localhost:3001/profile/upload", data, {
        //     headers: {
        //         'Authorization': `Bearer wadidaw`
        //     }
        // })
        //     .then(res => {
        //         console.log(res);
        //         handleClose()
        //     })
        //     .catch(err => {
        //         console.log(err);
        //     })

    }




    return (
        <>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Choose Your Profile Picture</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="image-modals-container">
                        <div className="image-modals-preview-container">
                            <img id="imgpreview" src={"http://localhost:3001/images/profile-default.png"} width="50%" />
                        </div>
                        <form action="">
                            <input type="file" id="file" onChange={event => {
                                const file = event.target.files
                                setFile(file)
                                let preview = document.getElementById("imgpreview")
                                preview.src = URL.createObjectURL(file[0])
                            }} />
                        </form>
                        <button className="btn btn-warning mt-2" onClick={send}>Send</button>
                    </div>

                </Modal.Body>

            </Modal>
        </>
    )
}

export default ImageModals
