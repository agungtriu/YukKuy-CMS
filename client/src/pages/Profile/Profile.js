import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faKey, faPen, faUser, faImage } from "@fortawesome/free-solid-svg-icons";
import { Link } from 'react-router-dom';
const Profile = () => {
  return ( 
    <>
      <div>Profile</div>
      <div className="card mb-3 mt-3 shadow border-0">
        <div className="row g-0">
          <div className="col-md-4">
            <div className="card">
              <img
                src='http://via.placeholder.com/200'
                className="rounded-circle ms-auto me-auto"
                style={{ width: "50%" }}
                alt="..."
              />
              <div className="card-body">
                <h5 className="text-center">username</h5>
                <div className="row row-cols-auto d-flex justify-content-center">
                  <div className="col">
                    <div className="input-group flex-nowrap">
                      <Link
                        className="btn btn-outline-dark"
                        to="edit/profile"
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
                        to="edit/password"
                      >
                        <FontAwesomeIcon icon={faKey} />
                      </Link>
                    </div>
                  </div>
                  <div className="col">
                    <div className="input-group flex-nowrap">
                      <Link
                        className="btn btn-outline-dark"
                        to="edit/avatar"
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
                        to="edit/banner"
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
                    <div className="input-group flex-nowrap">
                      user.name
                    </div>
                  </div>
                  <div className="col my-3">
                    <label>Phone</label>
                    <div className="input-group flex-nowrap">
                    </div>
                  </div>
                  <div className="col my-3">
                    <label>Address</label>
                    <div className="input-group flex-nowrap">
                    </div>
                  </div>
                  <div className="col my-3">
                    <label>Email</label>
                    <div className="input-group flex-nowrap">
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Profile