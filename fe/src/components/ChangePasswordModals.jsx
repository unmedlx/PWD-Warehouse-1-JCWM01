import React from 'react'
import { Modal } from 'react-bootstrap';
import { Formik, Form, Field, ErrorMessage } from 'formik';

const ChangePasswordM = ({ showCPM, handleCloseCPM }) => {
    return (
        <>
            <Modal show={showCPM} onHide={handleCloseCPM} >
                <Modal.Header closeButton>
                    <Modal.Title>Choose Your Profile Picture</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="image-modals-container">
                        tes
                    </div>
                </Modal.Body>

            </Modal>
        </>
    )
}

export default ChangePasswordM
