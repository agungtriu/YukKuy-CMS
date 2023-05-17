import { acceptVerificationOrder } from "../axios/orderAxios";
import { useNavigate } from "react-router-dom";
import { imageUrl } from "../config/config";
import RupiahFormatter from "../helpers/RupiahFormatter";
import ModalRejectVerification from "./ModalRejectVerification";

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
        tabindex="-1"
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
            <div className="modal-body">
              <img
                className="rounded-3 float-start me-3"
                src={imageUrl + order.verificationPayments[0].imageReceipt}
                alt={order.verificationPayments[0].imageReceipt}
              ></img>
              <div className="row">
                <h5 className="card-title">{order.product.name}</h5>
                <h6 className="card-text mt-4">
                  {RupiahFormatter(+order.totalPrice)}
                </h6>
                <h6 className="card-text mt-4">Information payment</h6>
                <table className="mx-3">
                  <tr>
                    <td>Bank</td>
                    <td>: {bank.bank}</td>
                  </tr>
                  <tr>
                    <td>Name</td>
                    <td>: {bank.name}</td>
                  </tr>
                  <tr>
                    <td>Number</td>
                    <td>: {bank.number}</td>
                  </tr>
                </table>
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
