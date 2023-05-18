import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import MainContent from "./MainContent";
import { Link } from "react-router-dom";

const SideBar = () => {
  const [activeItem, setActiveItem] = useState(null);

  const handleItemClick = (item) => {
    setActiveItem(item);
  };

  const getItemClassName = (item) => {
    if (activeItem === item) {
      return "nav-link px-5 py-2 mx-auto active";
    } else {
      return "nav-link px-5 py-2 mx-auto link-dark";
    }
  };

  return (
    <>
      <div className="container-fluid">
        <div className="row flex-nowrap">
          <div
            className="card col-auto col-md-3 col-xl-2 px-sm-2 px-0 shadow-lg"
            style={{ backgroundColor: "#F5F5F5", borderColor: "white" }}
          >
            <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 min-vh-100">
              <ul
                className="nav nav-pills flex-column mb-sm-auto mx-auto mb-0"
                id="menu"
              >
                <li className="card w-100 my-2 border-0">
                  <Link
                    className={getItemClassName("home")}
                    to={"/"}
                    onClick={() => handleItemClick("home")}
                  >
                    <i className="fs-4 bi-house"></i>{" "}
                    <span className="ms-1 d-none d-sm-inline">Home</span>
                  </Link>
                </li>
                <li className="card w-100 my-2 border-0">
                  <Link
                    className={getItemClassName("orders")}
                    to={"/orders"}
                    onClick={() => handleItemClick("orders")}
                  >
                    <i className="fs-4 bi-table"></i>{" "}
                    <span className="ms-1 d-none d-sm-inline">Orders</span>
                  </Link>
                </li>
                <li className="card w-100 my-2 border-0">
                  <Link
                    className={getItemClassName("products")}
                    to={"/products"}
                    onClick={() => handleItemClick("products")}
                  >
                    <i className="fs-4 bi-grid"></i>{" "}
                    <span className="ms-1 d-none d-sm-inline">Products</span>
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
            className="card col py-3 mx-4 shadow-lg"
            style={{ backgroundColor: "#F5F5F5", borderColor: "white" }}
          >
            <MainContent></MainContent>
          </div>
        </div>
      </div>
    </>
  );
};

export default SideBar;
