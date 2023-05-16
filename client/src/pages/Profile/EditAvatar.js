import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faKey, faUser, faImage } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import { editAvatar, getAccountByUsername } from "../../axios/accountAxios";
import { imageUrl } from "../../config/config";
import Swal from "sweetalert2";

const EditAvatar = () => {
  const [previewImage, setPreviewImage] = useState("");
  const [avatar, setAvatar] = useState();
  const [file, setFile] = useState(null);
  const [user, setUser] = useState({avatar: ""});
  const [isExist, setIsExist] = useState(false)
  const getAccount = () => {
    const username = localStorage.username;
    getAccountByUsername(username, (result) => {
      setUser({
        avatar: `${imageUrl}${result.profile.avatar}`,
      });
    });
  };
  useEffect(() => {
    getAccount();
    setAvatar(localStorage.image);
  }, []);
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    setIsExist(true)

    reader.onload = (e) => {
      setPreviewImage(e.target.result);
    };

    reader.readAsDataURL(file);
  };
  const navigation = useNavigate();
  const submitHandler = () => {
    if (file !== null) {
      const fromData = new FormData();
      fromData.append("avatar", file);
      editAvatar(fromData, (status, avatar) => {
        if (status) {
          setAvatar(avatar);
          navigation("/profile");
        }
      });
    } else {
      Swal.fire("Edit Avatar", "file cannot be empty", "error");
    }
  };
  return (
    <>
      <div className="d-flex justify-content-center">
        <div className="card shadow border-0">
          <img
            src={isExist === false ? user.avatar : previewImage}
            className="rounded-circle ms-auto me-auto"
            style={{ width: "50%" }}
            alt="..."
          />
          <div className="card-body">
            <h5 className="text-center">{user.username}</h5>
            <div className="row row-cols-auto d-flex justify-content-center">
              <div className="col">
                <div className="input-group flex-nowrap">
                  <Link
                    className="btn btn-outline-dark"
                    to="/profile/edit/password"
                  >
                    <FontAwesomeIcon icon={faKey} />
                  </Link>
                </div>
              </div>
              <div className="col">
                <div className="input-group flex-nowrap">
                  <Link
                    className="btn btn-outline-dark"
                    to="/profile/edit/avatar"
                  >
                    <FontAwesomeIcon
                      icon={faUser}
                      style={{ color: "#ba1c1c" }}
                    />
                  </Link>
                </div>
              </div>
              <div className="col">
                <div className="input-group flex-nowrap">
                  <Link
                    className="btn btn-outline-dark"
                    to="/profile/edit/banner"
                  >
                    <FontAwesomeIcon
                      icon={faImage}
                      style={{ color: "#ba1c1c" }}
                    />
                  </Link>
                </div>
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="formFile" className="form-label">
                image: {avatar}
              </label>
              <input
                className="form-control"
                type="file"
                id="formFile"
                onChange={(e) => {
                  setFile(e.target.files[0]);
                  setAvatar(e.target.files[0].name);
                  handleImageUpload(e)
                }}
              ></input>
            </div>
            <div className="d-flex justify-content-center">
              <Link
                type="submit"
                className="btn btn-primary mb-3"
                onClick={() => submitHandler()}
              >
                Confirm
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditAvatar;
