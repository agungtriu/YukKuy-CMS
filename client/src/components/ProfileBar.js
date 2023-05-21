import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const ProfileBar = () => {
  const [activeItem, setActiveItem] = useState(null);
  const navigate = useNavigate()

  const handleItemClick = (item, path) => {
    setActiveItem(item);
    navigate(path);
  };

  const getItemClassName = (item) => {
    if (activeItem === item) {
      return "nav-link px-5 py-2 mx-auto active";
    } else {
      return "nav-link px-5 py-2 mx-auto link-dark";
    }
  };

  return (
    <div className="nav d-flex justify-content-center">
      <ul className="nav nav-underline">
        <li className="nav-item">
          <Link
            className={getItemClassName("Profile")}
            onClick={(e) => {
              e.preventDefault();
              handleItemClick("Profile", "/profile");
            }}
          >
            Profile
          </Link>
        </li>
        <li className="nav-item">
          <Link
            className={getItemClassName("Bank")}
            onClick={(e) => {
              e.preventDefault();
              handleItemClick("Bank", "/profile/bank");
            }}
          >
            Bank
          </Link>
        </li>
        <li className="nav-item">
          <Link
            className={getItemClassName("List Guide")}
            onClick={(e) => {
              e.preventDefault();
              handleItemClick("List Guide", "/profile/guide");
            }}
          >
            List Guide
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default ProfileBar;
