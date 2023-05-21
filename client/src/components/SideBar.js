import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import MainContent from "./MainContent";
import { Link } from "react-router-dom";

const SideBar = () => {
  const [activeItem, setActiveItem] = useState("dashboard");

  const handleItemClick = (item) => {
    setActiveItem(item);
  };

  const getItemClassName = (item) => {
    if (activeItem === item) {
      return "nav-item nav-link mt-3 active py-3";
    } else {
      return "nav-item nav-link bg-white mt-3 text-dark py-3";
    }
  };

  return (
    <>
      <div className="container-fluid">
        <div className="row flex-nowrap">
          <div
            className="card col-auto col-md-3 col-xl-2 px-sm-2 px-0 shadow-lg min-vh-100"
            style={{ backgroundColor: "#F5F5F5", borderColor: "white" }}
          >
            <nav className="nav flex-column nav-pills text-center">
              <Link
                className={getItemClassName("dashboard")}
                to={"/"}
                onClick={() => handleItemClick("dashboard")}
              >
                Dashboard
              </Link>
              <Link
                className={getItemClassName("orders")}
                to={"/orders"}
                onClick={() => handleItemClick("orders")}
              >
                Order
              </Link>
              <Link
                className={getItemClassName("products")}
                to={"/products"}
                onClick={() => handleItemClick("products")}
              >
                Product
              </Link>
            </nav>
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
