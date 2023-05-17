import { useNavigate } from "react-router-dom";
import { rejectVerificationOrder } from "../axios/orderAxios";
import { useState } from "react";

const ModalRejectVerification = (props) => {
  const { orderId } = props;
  const [reason, setReason] = useState({
    reason: "",
  });
  const navigate = useNavigate();

  const rejectHandler = (orderId, reason) => {
    rejectVerificationOrder(orderId, reason, (status) => {
      if (status) {
        navigate("/orders");
      }
    });
  };
  return (
    <>
      <div
        className="modal fade"
        id="rejectModal"
        tabindex="-1"
        aria-labelledby="rejectModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="rejectModalLabel">
                Reject Verification
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="form-floating mb-3">
                <input
                  value={reason.reason}
                  onChange={(e) => setReason({ reason: e.target.value })}
                  type="text"
                  className="form-control"
                  id="floatingName"
                />
                <label htmlFor="floatingName">Reason</label>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-primary"
                data-bs-dismiss="modal"
                onClick={() => {
                  rejectHandler(orderId, reason);
                }}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ModalRejectVerification;
