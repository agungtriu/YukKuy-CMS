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
        class="modal fade"
        id="rejectModal"
        tabindex="-1"
        aria-labelledby="rejectModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-centered modal-lg">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="rejectModalLabel">
                Reject Verification
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
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
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Cancel
              </button>
              <button
                type="button"
                class="btn btn-primary"
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
