import React from "react";
import { useNavigate } from "react-router-dom";

const TabsOrder = () => {
  const navigate = useNavigate();
  const clickHandler = (link) => {
    navigate(link);
  };
  return (
    <div className="row">
      <div
        className="col btn btn-lg btn-primary ms-2 p-4"
        onClick={() => clickHandler("/orders")}
      >
        All Order
      </div>
      <div
        className="col btn btn-lg btn-warning ms-2 p-4"
        onClick={() => clickHandler("/orders/new")}
      >
        New Order
      </div>
      <div
        className="col btn btn-lg btn-success ms-2 p-4"
        onClick={() => clickHandler("/orders/success")}
      >
        Success
      </div>
      <div
        className="col btn btn-lg btn-danger ms-2 p-4"
        onClick={() => clickHandler("/orders/reject")}
      >
        Rejected
      </div>
      <div
        className="col btn btn-lg btn-dark mx-2 p-4"
        onClick={() => clickHandler("/orders/cancel")}
      >
        Cancel
      </div>
    </div>
  );
};

export default TabsOrder;
