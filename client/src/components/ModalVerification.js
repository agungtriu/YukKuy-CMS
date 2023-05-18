import { acceptVerificationOrder } from "../axios/orderAxios";
import { useNavigate } from "react-router-dom";
import { imageUrl } from "../config/config";
import RupiahFormatter from "../helpers/RupiahFormatter";
import ModalRejectVerification from "./ModalRejectVerification";
import { LazyLoadImage } from "react-lazy-load-image-component";

const ModalVerification = (props) => {
  const { order, bank } = props;

  const navigate = useNavigate();

  const acceptHandler = (orderId) => {
    acceptVerificationOrder(orderId, (status) => {
      if (status) {
        navigate("/orders");
      }
    });
  };
  return (
    <>
      <div
        className="modal fade"
        id="verificationModal"
        tabIndex="-1"
        aria-labelledby="verificationModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="verificationModalLabel">
                Verification Order
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body row">
              <LazyLoadImage
                className="rounded-3 float-start me-3 col"
                src={imageUrl + order.imageReceipt}
                alt={order.imageReceipt}
              ></LazyLoadImage>
              <div className="col">
                <div className=" row ">
                  <h4 className="card-title">{order.productName}</h4>
                  <h5 className="card-text mt-4">
                    {RupiahFormatter(order.totalPrice)}
                  </h5>
                  <h5 className="card-text mt-4">Information payment</h5>
                  <div className="row">
                    <div className="col-8 col-sm-8 col-lg-3">Bank</div>
                    <div className="col-1">:</div>
                    <div className="col">{bank.bank}</div>
                  </div>
                  <div className="row">
                    <div className="col-8 col-sm-8 col-lg-3">Name</div>
                    <div className="col-1">:</div>
                    <div className="col">{bank.name}</div>
                  </div>
                  <div className="row">
                    <div className="col-8 col-sm-8 col-lg-3">Number</div>
                    <div className="col-1">:</div>
                    <div className="col">{bank.number}</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-toggle="modal"
                data-bs-target="#rejectModal"
                data-bs-dismiss="modal"
              >
                Reject
              </button>
              <button
                type="button"
                className="btn btn-primary"
                data-bs-dismiss="modal"
                onClick={() => {
                  acceptHandler(order.id);
                }}
              >
                Accept
              </button>
            </div>
          </div>
        </div>
      </div>

      <ModalRejectVerification orderId={order.id}></ModalRejectVerification>
    </>
  );
};

export default ModalVerification;
