import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";

const TabsWithdraw = () => {
  const [activeItem, setActiveItem] = useState();
  const location = useLocation();

  useEffect(() => {
    setActiveItem(location.pathname);
  }, [location.pathname]);

  const getItemClassName = (item) => {
    if (activeItem === item) {
      return "col btn btn-lg ms-4 p-4 active text-white";
    } else {
      return "col btn btn-lg btn-outline-success ms-4 p-4";
    }
  };

  return (
    <div className="row me-4">
      <Link className={getItemClassName("/withdraws")} to={"/withdraws"}>
        All Withdraw
      </Link>
      <Link
        className={getItemClassName("/withdraws/request")}
        to={"/withdraws/request"}
      >
        Request
      </Link>
      <Link
        className={getItemClassName("/withdraws/process")}
        to={"/withdraws/process"}
      >
        Process
      </Link>
      <Link
        className={getItemClassName("/withdraws/success")}
        to={"/withdraws/success"}
      >
        Success
      </Link>
      <Link
        className={getItemClassName("/withdraws/reject")}
        to={"/withdraws/reject"}
      >
        Rejected
      </Link>
    </div>
  );
};

export default TabsWithdraw;
