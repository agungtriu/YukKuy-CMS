import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import Main from "./Main";
import { Link } from "react-router-dom";

const SideBar = () => {
  return (
    <>
      <div className="container-fluid">
        <div className="row flex-nowrap">
          <div
            className=" card col-auto col-md-3 col-xl-2 px-sm-2 px-0 shadow-lg"
            style={{ backgroundColor: "#F5F5F5", borderColor: "white" }}
          >
            <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 min-vh-100">
              <ul
                className="nav nav-pills flex-column mb-sm-auto mx-auto mb-0"
                id="menu"
              >
                <li className="card w-100 my-2">
                  <Link
                    className="nav-link px-5 py-2 mx-auto"
                    style={{ backgroundColor: "8833FF" }}
                    to={"/"}
                  >
                    <i className="fs-4 bi-house"></i>{" "}
                    <span
                      className="ms-1 d-none d-sm-inline"
                      style={{ color: "#6B7A99" }}
                    >
                      Home
                    </span>
                  </Link>
                </li>
                <li className="card w-100 my-2">
                  <Link to={"/orders"} className="nav-link px-5 py-2 mx-auto">
                    <i className="fs-4 bi-table"></i>{" "}
                    <span
                      className="ms-1 d-none d-sm-inline"
                      style={{ color: "#6B7A99" }}
                    >
                      Orders
                    </span>
                  </Link>
                </li>
                <li className="card w-100 my-2">
                  <Link to={"/products"} className="nav-link px-5 py-2 mx-auto">
                    <i className="fs-4 bi-grid"></i>{" "}
                    <span
                      className="ms-1 d-none d-sm-inline"
                      style={{ color: "#6B7A99" }}
                    >
                      Products
                    </span>
                  </Link>
                  <ul
                    className="collapse nav flex-column ms-1"
                    id="submenu3"
                    data-bs-parent="#menu"
                  ></ul>
                </li>
              </ul>
              <hr></hr>
            </div>
          </div>
          <div
            className=" card col py-3 mx-4 shadow-lg"
            style={{ backgroundColor: "#F5F5F5", borderColor: "white" }}
          >
            <Main></Main>
          </div>
        </div>
      </div>
    </>
  );
};

export default SideBar;
