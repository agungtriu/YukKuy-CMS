import React, { useState, useEffect } from "react";
import './styles.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faKey,
  faPen,
  faUser,
  faImage,
} from "@fortawesome/free-solid-svg-icons";
import { getAccountByUsername } from "../../axios/accountAxios";
import { imageUrl } from "../../config/config";
import SocialMedia from "../SocialMedia/SocialMedia";
import { ProfileBar } from "../../components";
import { Modal } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { editProfile } from "../../axios/accountAxios";
import EditAvatar from "./EditAvatar";
import EditBanner from "./EditBanner";
const Profile = () => {
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

  const cbShow = (result) => {
    setClickedBanner(result);
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
    });
  };
  const navigation = useNavigate();

  useEffect(() => {
    getAccount();
    setClickedBanner(false);
    setClickedAvatar(false);
  }, []);
  const submitHandler = () => {
    editProfile(user, (status) => {
      if (status) {
        navigation("/profile");
      }
      window.location.reload();
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
        {clickedAvatar ? <EditAvatar></EditAvatar> : null}
        {clickedBanner ? <EditBanner cbShow={cbShow}></EditBanner> : null}
        <div className="card border-0 shadow">
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
                <img
                  src={user.avatar}
                  className="rounded-circle ms-auto me-auto img-avatar"
                  alt="..."
                />
                <div className="card-body">
                  <h5 className="text-center">{user.username}</h5>
                  <div className="row row-cols-auto d-flex justify-content-center">
                    <div className="col">
                      <div className="input-group flex-nowrap">
                        <Link
                          className="btn btn-outline-dark"
                          to={"edit/password"}
                        >
                          <FontAwesomeIcon icon={faKey} />
                        </Link>
                      </div>
                    </div>
                    <div className="col">
                      <div className="input-group flex-nowrap">
                        <Link
                          className="btn btn-outline-dark"
                          onClick={handleClickedAvatar}
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
                          onClick={handleClickedBanner}
                        >
                          <FontAwesomeIcon
                            icon={faImage}
                            style={{ color: "#ba1c1c" }}
                          />
                        </Link>
                      </div>
                    </div>
                  </div>
                  <SocialMedia></SocialMedia>
                </div>
              </div>
            </div>
            <div className="col-md-8">
              <div className="card-body">
                <h5 className="card-title">Information</h5>
                <div className="container text center">
                  <div className="position-absolute top-0 end-0">
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
                  </div>
                  <div className="row row-cols-2">
                    <div className="col my-3">
                      <label>Name</label>
                      <div className="form-control">
                        {user.name !== null && user.name !== "" ? (
                          <h5>{user.name}</h5>
                        ) : null}
                      </div>
                    </div>
                    <div className="col my-3">
                      <label>Phone</label>
                      <div className="form-control">
                        {user.phone !== null && user.phone !== "" ? (
                          <h5 className="input-group flex-nowrap">
                            {user.phone}
                          </h5>
                        ) : null}
                      </div>
                    </div>
                    <div className="col my-3">
                      <label>Address</label>
                      <div className="form-control">
                        {user.address !== null && user.address !== "" ? (
                          <h5 className="input-group flex-nowrap">
                            {user.address}
                          </h5>
                        ) : null}
                      </div>
                    </div>
                    <div className="col my-3">
                      <label>Email</label>
                      <div className="form-control">
                        {user.email !== null && user.email !== "" ? (
                          <h5 className="input-group flex-nowrap">
                            {user.email}
                          </h5>
                        ) : null}
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
              <h5 className="card-title">Information</h5>
              <div className="container text-center">
                <div className="row row-cols-2">
                  <div className="col my-3">
                    <label>Name</label>
                    <input
                      type="text"
                      className="form-control"
                      id="exampleFormControlInput1"
                      placeholder="Enter Your Name"
                      value={user.name}
                      onChange={(e) =>
                        setUser({ ...user, name: e.target.value })
                      }
                    ></input>
                  </div>
                  <div className="col my-3">
                    <label>Phone</label>
                    <input
                      type="phone"
                      className="form-control"
                      id="exampleFormControlInput1"
                      placeholder="Enter your Phone"
                      value={user.phone}
                      onChange={(e) =>
                        setUser({ ...user, phone: e.target.value })
                      }
                    ></input>
                  </div>
                  <div className="col my-3">
                    <label>Address</label>
                    <textarea
                      className="form-control"
                      id="exampleFormControlTextarea1"
                      rows="3"
                      value={user.address}
                      onChange={(e) =>
                        setUser({ ...user, address: e.target.value })
                      }
                    ></textarea>
                  </div>
                  <div className="col my-3">
                    <label>Email</label>
                    <input
                      type="email"
                      className="form-control"
                      id="exampleFormControlInput1"
                      placeholder="name@example.com"
                      value={user.email}
                      onChange={(e) =>
                        setUser({ ...user, email: e.target.value })
                      }
                    ></input>
                  </div>
                </div>
              </div>
              <div className="col-auto mx-2">
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
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Profile;
