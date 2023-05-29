import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { readableDateTime } from "../../helpers/TimeFormat";
import RupiahFormatter from "../../helpers/RupiahFormatter";
import { acceptWithdraw, deleteWithdraw } from "../../axios/withdrawAxios";
import TitleCaseFormatter from "../../helpers/TitleCaseFormatter";
import { BsThreeDotsVertical } from "react-icons/bs";
import { AiFillDelete } from "react-icons/ai";

const Withdraw = (props) => {
  const { item } = props;
  const navigate = useNavigate();
  const deleteHandler = (id) => {
    deleteWithdraw(id, (result) => {
      if (result) {
        navigate("/withdraws");
      }
    });
  };
  const acceptHandler = (data) => {
    acceptWithdraw(data, (result) => {
      if (result) {
        navigate("/withdraws/success");
      }
    });
  };
  const statusHandler = (data) => {
    switch (data.statusWithdraw.status) {
      case "request":
        if (localStorage.role === "admin") {
          return (
            <button type="button" className="btn btn-primary my-5">
              {data.statusWithdraw.status}
            </button>
          );
        } else {
          return (
            <div className="btn btn-primary disabled my-5">
              {data.statusWithdraw.status}
            </div>
          );
        }
      case "process":
        if (localStorage.role === "admin") {
          return (
            <div
              className="btn btn-warning my-5"
              onClick={() => acceptHandler(data)}
            >
              {data.statusWithdraw.status}
            </div>
          );
        } else {
          return (
            <div className="btn btn-warning disabled my-5">
              {data.statusWithdraw.status}
            </div>
          );
        }
      case "success":
        return (
          <div className="btn btn-success disabled my-5">
            {data.statusWithdraw.status}
          </div>
        );
      case "reject":
        return (
          <div className="btn btn-danger disabled my-5">
            {data.statusWithdraw.status}
          </div>
        );
      default:
        break;
    }
  };
  return (
    <>
      <div className="card m-3 border-0 shadow" key={item.id}>
        <div className="card-body  position-relative">
          <div className="row">
            <div className="col-sm-8">
              <h4 className="card-title">{RupiahFormatter(item.amount)}</h4>
              {localStorage.role === "admin" ? (
                <p className="card-text">by {item.account.username}</p>
              ) : null}
              <p className="card-text">
                Withdrawal to {item.bank.bank} - {item.bank.number} an{" "}
                {item.bank.name}
              </p>
              <p className="card-text">
                Requested : {readableDateTime(item.createdAt)}
              </p>
              {item.statusWithdraw.status === "success" ||
              item.statusWithdraw.status === "reject" ||
              item.statusWithdraw.status === "process" ? (
                <p className="card-text">
                  {TitleCaseFormatter(item.statusWithdraw.status)}ed :{" "}
                  {readableDateTime(item.statusWithdraw.updatedAt)}
                </p>
              ) : null}

              {item.statusWithdraw.status === "reject" ? (
                <p className="card-text">
                  Reason : {item.statusWithdraw.reason}
                </p>
              ) : null}
            </div>
            <div className="col-sm-4" key={item.id}>
              {statusHandler(item)}
            </div>
          </div>
          {item.statusWithdraw.status !== "success" &&
          item.statusWithdraw.status !== "process" &&
          localStorage.role !== "admin" ? (
            <div className="position-absolute top-0 end-0 m-3">
              <div className="dropdown">
                <div
                  className="link-info me-1"
                  id="dropdownMenuButton"
                  data-mdb-toggle="dropdown"
                  aria-expanded="false"
                >
                  <BsThreeDotsVertical />
                </div>
                <ul
                  className="dropdown-menu dropdown-menu-right"
                  aria-labelledby="dropdownMenuButton"
                >
                  <li>
                    <Link
                      className="dropdown-item "
                      onClick={() => deleteHandler(item.id)}
                    >
                      <span className="link-danger">
                        <AiFillDelete />
                      </span>
                      <span className="ms-3">Delete</span>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
};

export default Withdraw;
