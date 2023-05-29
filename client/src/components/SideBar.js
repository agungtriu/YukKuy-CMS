import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import MainContent from "./MainContent";
import { Link, useNavigate } from "react-router-dom";
import RupiahFormatter from "../helpers/RupiahFormatter";
import { getAccountByUsername } from "../axios/accountAxios";
import ModalWithdraw from "./ModalWithdraw";
import ReactLoading from "react-loading";

const SideBar = (props) => {
  const [activeItem, setActiveItem] = useState("dashboard");
  const [done, setDone] = useState(false);
  const [role, setRole] = useState("");
  const navigate = useNavigate();
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
  const [balance, setBalance] = useState(0);
  useEffect(() => {
    if (!done) {
      getAccountByUsername(localStorage.username, (result) => {
        setBalance(result.saldo);
        setDone(true);
        setRole(result.role);
      });
    }
  }, []);

  const { avatarCbHandler } = props;
  return (
    <>
      <div className="container-fluid">
        <div className="row flex-nowrap">
          <div
            className="card col-auto col-md-3 col-xl-2 px-sm-2 px-0 shadow-lg min-vh-100"
            style={{ backgroundColor: "#F5F5F5", borderColor: "white" }}
          >
            <nav className="nav flex-column nav-pills text-center">
              {!done ? (
                <ReactLoading
                  className="mx-auto"
                  type={"spin"}
                  color={"#000000"}
                  height={30}
                  width={30}
                />
              ) : role === "seller" ? (
                <>
                  <div className="m-1 mt-5 btn btn-outline-secondary btn-saldo border-0">
                    <div className="row">
                      <div
                        className="text-start col d-flex align-items-center"
                        onClick={() => navigate("/withdraws")}
                      >
                        {!done ? (
                          <ReactLoading
                            className="mx-auto"
                            type={"spin"}
                            color={"#000000"}
                            height={30}
                            width={30}
                          />
                        ) : (
                          RupiahFormatter(balance)
                        )}
                      </div>
                      <div className="text-end col">
                        <button
                          type="button"
                          className={
                            +balance > 0
                              ? "btn btn-success"
                              : "btn btn-light disabled"
                          }
                          data-bs-toggle="modal"
                          data-bs-target="#withdrawModal"
                          data-bs-dismiss="modal"
                        >
                          Withdraw
                        </button>
                      </div>
                    </div>
                  </div>

                  <Link
                    className={getItemClassName("dashboard")}
                    to={"/"}
                    onClick={() => handleItemClick("dashboard")}
                  >
                    Dashboard
                  </Link>
                  <Link
                    className={getItemClassName("products")}
                    to={"/products"}
                    onClick={() => handleItemClick("products")}
                  >
                    Product
                  </Link>
                  <Link
                    className={getItemClassName("orders")}
                    to={"/orders"}
                    onClick={() => handleItemClick("orders")}
                  >
                    Order
                  </Link>
                </>
              ) : role === "admin" ? (
                <>
                  <Link
                    className={getItemClassName("dashboard")}
                    to={"/"}
                    onClick={() => handleItemClick("dashboard")}
                  >
                    Dashboard
                  </Link>
                  <Link
                    className={getItemClassName("accounts")}
                    to={"/accounts"}
                    onClick={() => handleItemClick("accounts")}
                  >
                    Accounts
                  </Link>
                  <Link
                    className={getItemClassName("withdraws")}
                    to={"/withdraws"}
                    onClick={() => handleItemClick("withdraws")}
                  >
                    Withdraws
                  </Link>
                </>
              ) : null}
            </nav>
          </div>
          <div
            className="card col py-3 mx-4 shadow-lg"
            style={{ backgroundColor: "#F5F5F5", borderColor: "white" }}
          >
            <MainContent avatarCbHandler={avatarCbHandler}></MainContent>
          </div>
        </div>
      </div>
      <ModalWithdraw saldo={balance}></ModalWithdraw>
    </>
  );
};

export default SideBar;
