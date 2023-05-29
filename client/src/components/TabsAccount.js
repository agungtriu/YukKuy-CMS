import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";

const TabsAccount = () => {
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
      <Link className={getItemClassName("/accounts")} to={"/accounts"}>
        All User
      </Link>
      <Link
        className={getItemClassName("/accounts/admin")}
        to={"/accounts/admin"}
      >
        Admin
      </Link>
      <Link
        className={getItemClassName("/accounts/seller")}
        to={"/accounts/seller"}
      >
        Seller
      </Link>
      <Link
        className={getItemClassName("/accounts/customer")}
        to={"/accounts/customer"}
      >
        Customer
      </Link>
    </div>
  );
};

export default TabsAccount;
