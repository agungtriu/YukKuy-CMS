import { useNavigate } from "react-router-dom";
import RupiahFormatter from "../helpers/RupiahFormatter";
import ModalRejectWithdraw from "./ModalRejectWithdraw";
import { processWithdraw } from "../axios/withdrawAxios";
import { useState } from "react";
import { Modal } from "react-bootstrap";

const ModalProcessWithdraw = (props) => {
  const { data, show, onHide } = props;
  const navigate = useNavigate();

  const processHandler = (withdrawId) => {
    processWithdraw(withdrawId, (status) => {
      if (status) {
        onHide();
        navigate("/withdraws/process");
      }
    });
  };
  const [modalShow, setModalShow] = useState(false);
  const clickHandler = (data) => {
    onHide();
    setModalShow(true);
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
          <Modal.Title id="contained-modal-title-vcenter">Withdraw</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="col">
              <div className=" row ">
                <h4 className="card-title">{data.username}</h4>
                <div className="row">
                  <div className="col-8 col-sm-8 col-lg-3">
                    Remaining balance
                  </div>
                  <div className="col-1">:</div>
                  <div className="col">{RupiahFormatter(data.saldo)}</div>
                </div>
                <div className="row">
                  <div className="col-8 col-sm-8 col-lg-3">
                    Request withdraw
                  </div>
                  <div className="col-1">:</div>
                  <div className="col">{RupiahFormatter(data.amount)}</div>
                </div>
                <div className="row">
                  <div className="col-8 col-sm-8 col-lg-3">Withdrawal to</div>
                  <div className="col-1">:</div>
                  <div className="col">
                    {data.bank} - {data.number} an {data.name}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button
            type="button"
            className="btn btn-danger"
            onClick={() => clickHandler()}
          >
            Reject
          </button>
          <button
            type="button"
            className="btn btn-success"
            onClick={() => {
              processHandler(data.id);
            }}
          >
            Process
          </button>
        </Modal.Footer>
      </Modal>

      <ModalRejectWithdraw
        show={modalShow}
        onHide={() => setModalShow(false)}
        withdrawId={data.id}
      ></ModalRejectWithdraw>
    </>
  );
};

export default ModalProcessWithdraw;
