import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faKey,
  faPen,
  faUser,
  faImage,
} from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import { editProfile, getAccountByUsername } from "../../axios/accountAxios";
import { imageUrl } from "../../config/config";

const EditProfile = () => {
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
  const navigation = useNavigate();
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
  const submitHandler = () => {
    editProfile(user, (status) => {
      if (status) {
        navigation("/profile");
      }
    });
  };
  return (
    <>
      <div>EditProfile</div>
      <div>
        <div className="card mb-3 mt-3">
          <div className="row g-0">
            <div className="col-md-4">
              <div className="card">
                <img
                  src={user.avatar}
                  className="rounded-start ms-auto me-auto"
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
                          to="/profile/edit/profile"
                        >
                          <FontAwesomeIcon
                            icon={faPen}
                            style={{ color: "#30c0af" }}
                          />
                        </Link>
                      </div>
                    </div>
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
                  <div className="row row-cols-2">
                    <div className="col my-3">
                      <label>Name</label>
                      <input
                        type="text"
                        class="form-control"
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
                        class="form-control"
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
                        class="form-control"
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
                        class="form-control"
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
                <div class="col-auto mx-2">
                  <Link
                    type="submit"
                    class="btn btn-primary mb-3"
                    onClick={() => submitHandler()}
                  >
                    Confirm
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditProfile;
