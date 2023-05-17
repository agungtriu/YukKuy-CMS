import { useState } from "react";
import { getBankById } from "../axios/orderAxios";
import { imageUrl } from "../config/config";
import RupiahFormatter from "../helpers/RupiahFormatter";
import { readableDate } from "../helpers/TimeFormat";
import ModalVerification from "./ModalVerification";

const Order = (props) => {
  const { order } = props;
  const [bank, setBank] = useState({
    bank: "",
    name: "",
    number: "",
  });

  const bankHandler = (bankId) => {
    getBankById(bankId, (result) => {
      setBank({
        bank: result.bank,
        name: result.name,
        number: result.number,
      });
    });
  };

  const statusHandler = (data) => {
    switch (data.status) {
      case "success":
        return (
          <div className="btn btn-success disabled my-5">{data.status}</div>
        );
      case "payment":
        return (
          <div className="btn btn-primary disabled my-5">{data.status}</div>
        );
      case "reject":
        return (
          <div className="btn btn-danger disabled my-5">{data.status}</div>
        );
      case "cancel":
        return (
          <div className="btn btn-dark disabled my-5">{data.status}</div>
        );
      default:
        break;
    }
  };
  return (
    <>
      <div className="card mb-2 border-0 shadow" key={order.id}>
        <div className="card-body">
          <img
            className="rounded-3 float-start me-3"
            style={{ height: "110px" }}
            src={imageUrl + order.product.imageProducts[0].src}
            alt={order.product.imageProducts[0].src}
          ></img>
          <div className="row">
            <div className="col-sm-8">
              <h4 className="card-title">
                {order.product.name} #{order.id}
              </h4>
              <h5 className="card-text">by: {order.name}</h5>
              <p className="card-text my-2">{readableDate(order.createdAt)}</p>
              <span className="my-5">Pax: {order.totalPackage}</span>
              <span className="mx-5">
                Price: {RupiahFormatter(+order.totalPrice)}
              </span>
            </div>
            <div className="col-sm-4">
              {order.statusOrder.status === "verification" ? (
                <>
                  <button
                    type="button"
                    className="btn btn-warning my-5"
                    data-bs-toggle="modal"
                    data-bs-target="#verificationModal"
                    onClick={() => {
                      bankHandler(order.verificationPayments[0].bankId);
                    }}
                  >
                    {order.statusOrder.status}
                  </button>

                  <ModalVerification
                    order={order}
                    bank={bank}
                  ></ModalVerification>
                </>
              ) : (
                <div className="m-auto">{statusHandler(order.statusOrder)}</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Order;
