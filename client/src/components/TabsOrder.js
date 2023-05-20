import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";

const TabsOrder = () => {
  const [activeItem, setActiveItem] = useState();
  const location = useLocation();

  useEffect(() => {
    setActiveItem(location.pathname);
  }, [location.pathname]);

  const getItemClassName = (item) => {
    if (activeItem === item) {
      return "col btn btn-lg ms-2 p-4 active text-white";
    } else {
      return "col btn btn-lg btn-outline-success ms-2 p-4";
    }
  };

  return (
    <div className="row">
      <Link className={getItemClassName("/orders")} to={"/orders"}>
        All Order
      </Link>
      <Link className={getItemClassName("/orders/new")} to={"/orders/new"}>
        New Order
      </Link>
      <Link
        className={getItemClassName("/orders/success")}
        to={"/orders/success"}
      >
        Success
      </Link>
      <Link
        className={getItemClassName("/orders/reject")}
        to={"/orders/reject"}
      >
        Rejected
      </Link>
      <Link
        className={getItemClassName("/orders/cancel")}
        to={"/orders/cancel"}
      >
        Cancel
      </Link>
    </div>
  );
};

export default TabsOrder;
