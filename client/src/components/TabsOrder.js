import React from "react";
import { Link } from "react-router-dom";

const TabsOrder = () => {
  return (
    <div className="d-flex justify-content-evenly">
      <Link to={"/orders"}>
        <div class="btn btn-primary">
          <div className="my-4 mx-5">All Order</div>
        </div>
      </Link>
      <Link to={"/orders/new"}>
        <div class="btn btn-warning">
          <div className="my-4 mx-5">New Order</div>
        </div>
      </Link>
      <Link to={"/orders/sold"}>
        <div class="btn btn-success">
          <div className="my-4 mx-5">Success</div>
        </div>
      </Link>
      <Link to={"/orders/reject"}>
        <div class="btn btn-danger">
          <div className="my-4 mx-5">Rejected</div>
        </div>
      </Link>
      <Link to={"/orders/cancel"}>
        <div class="btn btn-dark">
          <div className="my-4 mx-5">Cancel</div>
        </div>
      </Link>
    </div>
  );
};

export default TabsOrder;
