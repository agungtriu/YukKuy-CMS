import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { rejectWithdraw } from "../axios/withdrawAxios";
import { Modal } from "react-bootstrap";

const ModalRejectWithdraw = (props) => {
  const { withdrawId, show, onHide } = props;
  const [reason, setReason] = useState({
    reason: "",
  });
  const navigate = useNavigate();
  const rejectHandler = (withdrawId, reason) => {
    rejectWithdraw(withdrawId, reason, (status) => {
      if (status) {
        navigate("/withdraws/reject");
      }
    });
  };
  return (
    <>
      <Modal
        show={show}
        onHide={onHide}
        className="modal fade"
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Reject Withdraw
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
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
        </Modal.Body>
        <Modal.Footer>
          <button type="button" className="btn btn-secondary" onClick={onHide}>
            Cancel
          </button>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => {
              rejectHandler(withdrawId, reason);
            }}
          >
            Submit
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalRejectWithdraw;
