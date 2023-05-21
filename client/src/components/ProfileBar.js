import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const ProfileBar = () => {
  const location = useLocation();
  const [activeItem, setActiveItem] = useState(null);

  const handleItemClick = (item) => {
    setActiveItem(item);
  };

  const getItemClassName = (item) => {
    if (location.pathname.includes(item.toLowerCase()) || activeItem === !null) {
      return "nav-link px-5 py-2 mx-auto active text-white";
    } else {
      return "nav-link px-5 py-2 mx-auto link-dark";
    }
    
  };

  return (
    <>
      <div className="card nav d-flex justify-content-start mb-2 border-0 shadow-lg">
        <ul className="nav nav-underline">
          <li className="nav-item">
            <Link
              className={getItemClassName("Profile")}
              onClick={() => handleItemClick("Profile")}
              to="/profile"
            >
              Profile
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className={getItemClassName("Guide")}
              onClick={() => handleItemClick("Guide")}
              to="/guide"
            >
              Guide
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className={getItemClassName("Bank")}
              onClick={() => handleItemClick("Bank")}
              to="/bank"
            >
              Bank
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
};

export default ProfileBar;
