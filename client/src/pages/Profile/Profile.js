import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faKey,
  faPen,
  faUser,
  faImage,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { getAccountByUsername } from "../../axios/accountAxios";
import { imageUrl } from "../../config/config";
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
  useEffect(() => {
    getAccount();
  }, []);

  return (
    <>
      <div>Profile</div>
      <div>
        <div className="card">
          <div className="d-flex justify-content-center">
            <img
              src={user.bannerImage}
              className="card-img-top"
              style={{ width: "75%", height: "250px" }}
            ></img>
          </div>
        </div>
        <div className="card mb-3 mt-3 shadow-lg border-0">
          <div className="row g-0">
            <div className="col-md-4">
              <div className="card shadow border-0">
                <img
                  src={user.avatar}
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
                        className="btn btn-outline-dark"
                        to="/profile/edit/profile"
                      >
                        <FontAwesomeIcon
                          icon={faPen}
                          style={{ color: "#30c0af" }}
                        />{" "}
                        Edit
                      </Link>
                    </div>
                  </div>
                  <div className="row row-cols-2">
                    <div className="col my-3">
                      <label>Name</label>
                      <div class="form-control">
                        {user.name !== null && user.name !== "" ? (
                          <h5>{user.username}</h5>
                        ) : (
                          <h6>input Your name</h6>
                        )}
                      </div>
                    </div>

                    <div className="col my-3">
                      <label>Phone</label>
                      <div class="form-control">
                        {user.phone !== null && user.phone !== "" ? (
                          <h5 className="input-group flex-nowrap">
                            {user.phone}
                          </h5>
                        ) : (
                          <h6>input Your phone</h6>
                        )}
                      </div>
                    </div>
                    <div className="col my-3">
                      <label>Address</label>
                      <div className="form-control">
                        {user.address !== null && user.address !== "" ? (
                          <h5 className="input-group flex-nowrap">
                            {user.address}
                          </h5>
                        ) : (
                          <h6>input Your phone</h6>
                        )}
                      </div>
                    </div>
                    <div className="col my-3">
                      <label>Email</label>
                      <div className="form-control">
                        {user.email !== null && user.email !== "" ? (
                          <h5 className="input-group flex-nowrap">
                            {user.email}
                          </h5>
                        ) : (
                          <h6>input Your phone</h6>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
