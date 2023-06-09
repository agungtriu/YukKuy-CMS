import React, { useState, useEffect } from "react";
import "./styles.css";
import { useNavigate } from "react-router-dom";
import { editAvatar, getAccountByUsername } from "../../axios/accountAxios";
import { imageUrl } from "../../config/config";
import Swal from "sweetalert2";
import { Modal, Button } from "react-bootstrap";

const EditAvatar = (props) => {
  const [previewImage, setPreviewImage] = useState("");
  const [file, setFile] = useState(null);
  const [user, setUser] = useState({ avatar: "" });
  const [isExist, setIsExist] = useState(false);
  const [showModal, setShowModal] = useState(true);
  const [done, setDone] = useState(false);

  const { cbAvatarShow } = props;

  const getAccount = () => {
    const username = localStorage.username;
    getAccountByUsername(username, (result) => {
      setUser({
        avatar: `${imageUrl}${result.profile.avatar}`,
      });
      setDone(true);
    });
  };

  useEffect(() => {
    getAccount();
  }, []);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    setIsExist(true);

    reader.onload = (e) => {
      setPreviewImage(e.target.result);
    };

    reader.readAsDataURL(file);
  };

  const navigation = useNavigate();

  const handleCloseModal = () => {
    setShowModal(false);
    cbAvatarShow(false);
  };

  const submitHandler = () => {
    if (file !== null) {
      const fromData = new FormData();
      fromData.append("avatar", file);
      editAvatar(fromData, (status, avatar) => {
        if (status) {
          handleCloseModal();
          navigation("/profile");
        }
        // window.location.reload()
      });
    } else {
      Swal.fire("Edit Avatar", "file cannot be empty", "error");
    }
  };

  return (
    <>
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Avatar</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <img
            src={isExist === false ? user.avatar : previewImage}
            className="rounded-circle mb-4 ms-auto me-auto img-avatar d-flex justify-content-center"
            alt="..."
          />
          <div className="mb-3">
            <input
              className="form-control"
              type="file"
              id="formFile"
              onChange={(e) => {
                setFile(e.target.files[0]);
                handleImageUpload(e);
              }}
            ></input>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant=""
            className="btn btn-danger"
            onClick={handleCloseModal}
          >
            Close
          </Button>
          <Button
            variant=""
            className="btn btn-success"
            onClick={submitHandler}
          >
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default EditAvatar;
