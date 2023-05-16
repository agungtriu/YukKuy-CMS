import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faKey, faUser, faImage } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { getAccountByUsername } from "../../axios/accountAxios";
import { imageUrl } from "../../config/config";

const EditAvatar = () => {
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
      <div className="d-flex justify-content-center">
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
            <div class="mb-3">
              <label for="formFile" class="form-label">
                image:
              </label>
              <input class="form-control" type="file" id="formFile"></input>
            </div>
            <div class="d-flex justify-content-center">
              <Link
                type="submit"
                class="btn btn-primary mb-3"
                // onClick={() => submitHandler()}
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
