import { Modal } from "react-bootstrap";
import "../assets/styles/ImageModals.css";

import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { editPhotoProfile } from "../redux/actions/users";

const ImageModals = ({ show, handleClose, userImage }) => {
  const dispatch = useDispatch();
  const [file, setFile] = useState();
  const userGlobal = useSelector((state) => state.users);
  const { idUser } = userGlobal;

  const send = (event) => {
    if (file[0].size > 5000000) {
      return alert("Photo must be under 5MB");
    }

    //membuat data form
    const data = new FormData();

    //ini akan ngirim token yang nantinya akan di auth
    //untuk mendapatkan idUser di backend
    let obj = {
      idUser: idUser,
    };

    const userLocalStorage = localStorage.getItem("token_shutter");

    //data token dan juga file photo
    data.append("data", JSON.stringify(obj));
    data.append("file", file[0]);

    dispatch(editPhotoProfile(idUser, userLocalStorage, data));
  };

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title className="subtitle">
            Choose Your Profile Picture
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="image-modals-container">
            <div className="image-modals-preview-container">
              <img
                id="imgpreview"
                src={"http://localhost:3001/" + userImage}
                width="50%"
                alt="preview"
              />
            </div>
            <form action="">
              <input
                type="file"
                id="file"
                onChange={(event) => {
                  const file = event.target.files;
                  setFile(file);
                  let preview = document.getElementById("imgpreview");
                  preview.src = URL.createObjectURL(file[0]);
                }}
              />
            </form>
            {/* {successUpload ?
                            <button className="btn btn-success mt-2" disabled>Success</button>
                            : */}
            <button className="button mt-2" onClick={send}>
              Send
            </button>
            {/* } */}
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ImageModals;
