import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { editBanner, getAccountByUsername } from "../../axios/accountAxios";
import { imageUrl } from "../../config/config";
import Swal from "sweetalert2";
import { Modal, Button } from "react-bootstrap";

const EditBanner = (props) => {
  const [user, setUser] = useState({ bannerImage: "" });
  const [file, setFile] = useState(null);
  const [previewImage, setPreviewImage] = useState("");
  const [isExist, setIsExist] = useState(false);
  const [showModal, setShowModal] = useState(true);
  const [done, setDone] = useState(false);

  const { cbShow } = props;

  const getBanner = () => {
    const username = localStorage.username;
    getAccountByUsername(username, (result) => {
      setUser({
        bannerImage: `${imageUrl}${result.profile.bannerImage}`,
      });
      setDone(true);
    });
  };

  useEffect(() => {
    getBanner();
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
    cbShow(false);
  };

  const submitHandler = () => {
    if (file !== null) {
      const fromData = new FormData();
      fromData.append("banner", file);
      editBanner(fromData, (status, banner) => {
        if (status) {
          handleCloseModal();
          navigation("/profile");
        }
        // window.location.reload()
      });
    } else {
      Swal.fire("Edit Banner", "file cannot be empty", "error");
    }
  };

  return (
    <>
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Banner</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="d-flex justify-content-center mb-3">
            <img
              src={isExist === false ? user.bannerImage : previewImage}
              className="card-img-top"
              style={{ width: "75%", height: "250px" }}
              alt=""
            ></img>
          </div>
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

export default EditBanner;
