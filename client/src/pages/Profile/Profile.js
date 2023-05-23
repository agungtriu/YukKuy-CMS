import React, { useState, useEffect } from "react";
import "./styles.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faKey,
  faPen,
  faUser,
  faImage,
  faPenToSquare,
} from "@fortawesome/free-solid-svg-icons";
import { getAccountByUsername } from "../../axios/accountAxios";
import { imageUrl } from "../../config/config";
import SocialMedia from "../SocialMedia/SocialMedia";
import { ProfileBar } from "../../components";
import { Modal } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { editProfile } from "../../axios/accountAxios";
import EditAvatar from "./EditAvatar";
import EditBanner from "./EditBanner";
import { SlOptionsVertical } from "react-icons/sl";

const Profile = (props) => {
  const [user, setUser] = useState({
    username: "",
    name: "",
    email: "",
    password: "",
    role: "",
    address: "",
    phone: "",
    avatar: "",
    bannerImage: "",
  });

  const [editUser, setEditUser] = useState({
    username: "",
    name: "",
    email: "",
    address: "",
    phone: "",
  });

  const cbShow = (result) => {
    setClickedBanner(result);
  };

  const cbAvatarShow = (result) => {
    setClickedAvatar(result);
  };

  const getAccount = () => {
    const username = localStorage.username;
    getAccountByUsername(username, (result) => {
      setUser({
        username: result.username,
        name: result.name,
        email: result.email,
        role: result.role,
        address: result.profile.address,
        phone: result.profile.phone,
        avatar: `${imageUrl}${result.profile.avatar}`,
        bannerImage: `${imageUrl}${result.profile.bannerImage}`,
      });
      setEditUser({
        username: result.username,
        name: result.name,
        email: result.email,
        address: result.profile.address,
        phone: result.profile.phone,
      });
    });
  };
  const navigation = useNavigate();
  const location = useLocation();

  useEffect(() => {
    getAccount();
    // setClickedBanner(false);
    // setClickedAvatar(false);
  }, [location.key]);

  const submitHandler = () => {
    editProfile(editUser, (status) => {
      if (status) {
        handleCloseEditModal();
        navigation("/profile");
      }
      // window.location.reload();
    });
  };

  const [showEditModal, setShowEditModal] = useState(false);
  const [clickedAvatar, setClickedAvatar] = useState(false);
  const [clickedBanner, setClickedBanner] = useState(false);

  const handleCloseEditModal = () => setShowEditModal(false);
  const handleShowEditModal = () => setShowEditModal(true);

  const handleClickedAvatar = () => {
    setClickedAvatar(true);
    setClickedBanner(false);
  };
  const handleClickedBanner = () => {
    setClickedBanner(true);
    setClickedAvatar(false);
  };
  console.log(clickedBanner);
  return (
    <>
      <ProfileBar></ProfileBar>
      <div>
        {clickedAvatar ? (
          <EditAvatar cbAvatarShow={cbAvatarShow}></EditAvatar>
        ) : null}
        {clickedBanner ? <EditBanner cbShow={cbShow}></EditBanner> : null}
        <div className="card border-0 shadow">
          <div className="position-absolute top-0 end-0 mt-2 mx-4">
            <button
              className="btn btn-outline-success btn-banner border-0"
              onClick={handleClickedBanner}
            >
              <FontAwesomeIcon
                style={{ height: "1.2rem" }}
                icon={faPenToSquare}
              />
            </button>
          </div>
          <div className="d-flex justify-content-center">
            <img
              src={user.bannerImage}
              className="card-img-top rounded-start img-banner"
              alt=""
            ></img>
          </div>
        </div>
        <div className="card mb-3 mt-3 shadow-lg border-0">
          <div className="row g-0">
            <div className="col-md-4">
              <div className="card shadow border-0">
                <div className="position-relative d-flex justify-content-center">
                  <img
                    src={user.avatar}
                    className="rounded-circle ms-auto me-auto img-avatar mt-4"
                    alt="..."
                  />
                  <div className="btn-avatar">
                    <div className="input-group flex-nowrap">
                      <Link
                        className="btn btn-success"
                        onClick={handleClickedAvatar}
                      >
                        <FontAwesomeIcon
                          style={{ height: "1.2rem" }}
                          icon={faPenToSquare}
                        />
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="card-body">
                  <h5 className="text-center">{user.username}</h5>

                  {/* <div className="col">
                      <div className="input-group flex-nowrap">
                        <Link
                          className="btn btn-outline-dark"
                          onClick={handleClickedBanner}
                        >
                          <FontAwesomeIcon
                            icon={faImage}
                            style={{ color: "#ba1c1c" }}
                          />
                        </Link>
                      </div>
                    </div> */}
                  {/* </div> */}
                  <SocialMedia></SocialMedia>
                </div>
              </div>
            </div>
            <div className="col-md-8">
              <div className="card-body">
                <div className="d-flex mx-2">
                  <h5 className="card-title me-auto">Information</h5>
                  {/* <div className="dropdown align-self-center"> */}
                  <button
                    className="btn btn-success"
                    onClick={handleShowEditModal}
                  >
                    <FontAwesomeIcon icon={faPenToSquare} />
                  </button>
                  {/* <ul className="dropdown-menu dropdown-menu-right">
                      <li>
                        <button
                          className="dropdown-item"
                          onClick={handleShowEditModal}
                        >
                          Edit Profile
                        </button>
                      </li>
                      <li>
                        <button
                          className="dropdown-item"
                          onClick={handleClickedBanner}
                        >
                          Edit Banner
                        </button>
                      </li>
                    </ul> */}
                  {/* </div> */}
                </div>
                <div className="container text center">
                  {/* <div className="position-absolute top-0 end-0">
                    <div className="input-group flex-nowrap">
                      <Link
                        className="btn btn-outline-dark border-0"
                        onClick={handleShowEditModal}
                      >
                        <FontAwesomeIcon
                          icon={faPen}
                          style={{ color: "#30c0af" }}
                          className="mx-2"
                        />
                        Edit
                      </Link>
                    </div>
                  </div> */}
                  <div className="row row-cols-2">
                    <div className="col my-3">
                      <label>Name</label>
                      <div className="">
                        {user.name !== null && user.name !== "" ? (
                          <h5>{user.name}</h5>
                        ) : null}
                      </div>
                    </div>
                    {user.phone !== null && user.phone !== "" ? (
                      <div className="col my-3">
                        <label>Phone</label>
                        <div className="">
                          <h5 className="input-group flex-nowrap">
                            {user.phone}
                          </h5>
                        </div>
                      </div>
                    ) : null}
                    {user.address !== null && user.address !== "" ? (
                      <div className="col my-3">
                        <label>Address</label>
                        <div className="">
                          <h5 className="input-group flex-nowrap">
                            {user.address}
                          </h5>
                        </div>
                      </div>
                    ) : null}
                    <div className="col my-3">
                      <label>Email</label>
                      <div className="">
                        {user.email !== null && user.email !== "" ? (
                          <h5 className="input-group flex-nowrap">
                            {user.email}
                          </h5>
                        ) : null}
                      </div>
                    </div>
                  </div>
                  <div className="row row-cols-2">
                    <div className="row my-3">
                      <div className="col">
                        <label>Password</label>
                        <div className="">
                          <h5 className="input-group flex-nowrap">********</h5>
                        </div>
                      </div>
                      <div className="col-8">
                        <Link
                          type="button"
                          className="btn btn-success"
                          to={"edit/password"}
                        >
                          <FontAwesomeIcon icon={faKey} />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal show={showEditModal} onHide={handleCloseEditModal}>
        <Modal.Header>
          <Modal.Title>Edit Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <div className="card-body">
              <div className="">
                <label>Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="exampleFormControlInput1"
                  placeholder="Enter Your Name"
                  value={editUser.name}
                  onChange={(e) =>
                    setEditUser({ ...editUser, name: e.target.value })
                  }
                ></input>
              </div>
              <div className="mt-2">
                <label>Phone</label>
                <input
                  type="number"
                  className="form-control"
                  id="exampleFormControlInput1"
                  placeholder="Enter your Phone"
                  value={editUser.phone}
                  onChange={(e) =>
                    setEditUser({ ...editUser, phone: e.target.value })
                  }
                ></input>
              </div>
              <div className="mt-2">
                <label>Address</label>
                <textarea
                  className="form-control"
                  id="exampleFormControlTextarea1"
                  rows="3"
                  value={editUser.address}
                  onChange={(e) =>
                    setEditUser({ ...editUser, address: e.target.value })
                  }
                ></textarea>
              </div>
              <div className="mt-2">
                <label>Email</label>
                <input
                  type="email"
                  className="form-control"
                  id="exampleFormControlInput1"
                  placeholder="name@example.com"
                  value={editUser.email}
                  onChange={(e) =>
                    setEditUser({ ...editUser, email: e.target.value })
                  }
                ></input>
              </div>
            </div>
          </div>
          <div className="d-flex mt-3 justify-content-end">
            <Link className="btn btn-danger  me-2" onClick={handleCloseEditModal}>
              Close
            </Link>
            <Link
              type="submit"
              className="btn btn-success"
              onClick={() => submitHandler()}
            >
              Confirm
            </Link>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Profile;
