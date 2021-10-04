import { Modal, Button } from 'react-bootstrap'
import Axios from 'axios'

import React, { useEffect, useState } from 'react'
import { API_URL } from '../helper'

const ImageModals = ({ show, handleClose }) => {
    const [file, setFile] = useState()


    const send = event => {
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
        console.log(data);

        Axios.patch(`${API_URL}/profile/upload`, data)
            .then(res => {
                console.log(res);
                handleClose()
            })
            .catch(err => {
                console.log(err);
            })

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
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <img id="imgpreview" width="100%" />
                    {/* <img src={"http://localhost:3001/images/IMG1633323280976.png"} /> */}
                    <form action="">
                        <label htmlFor="file">File</label>
                        <input type="file" id="file" onChange={event => {
                            const file = event.target.files
                            setFile(file)
                            let preview = document.getElementById("imgpreview")
                            preview.src = URL.createObjectURL(file[0])
                        }} />
                    </form>
                    <button onClick={send}>Send</button>

                </Modal.Body>

            </Modal>
        </>
    )
}

export default ImageModals
