import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { images } from "../images";
import { imageUrl } from "../config/config";
import { FiLogOut, FiUser } from "react-icons/fi";

const BarMenu = (props) => {
  const { loginStatus, loginCbHandler } = props;
  const logoutHandler = () => {
    localStorage.clear();
    loginCbHandler({ status: false, data: {} });
    Swal.fire("Logout", "logout successful", "success");
  };
  return (
    <>
      <nav
        className="navbar navbar-expand-lg bg-body-tertiary my-3 shadow-sm"
        style={{ bcolor: "Highlight" }}
      >
        <div className="container-fluid">
          <a className="navbar-brand" href="/">
            <img src={images.logo} alt="" style={{ width: "120px" }} />
          </a>
          <div className="dropdown m-1">
            <img
              className="rounded-circle avatar-mini"
              src={`${imageUrl}${loginStatus.data.avatar}`}
              alt=""
            ></img>
            <ul className="dropdown-menu dropdown-menu-right">
              <li>
                <Link className="dropdown-item" to={"/profile"}>
                  <FiUser />
                  <span className="m-3">Profile</span>
                </Link>
              </li>
              <li>
                <Link
                  className="dropdown-item"
                  to={"/"}
                  onClick={() => logoutHandler()}
                >
                  <FiLogOut />
                  <span className="ms-3">Logout</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default BarMenu;
