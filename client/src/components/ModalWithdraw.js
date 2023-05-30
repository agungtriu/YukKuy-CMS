import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { addWithdraw } from "../axios/withdrawAxios";
import { getBanks } from "../axios/bankAxios";
import Select from "react-select";

const ModalWithdraw = (props) => {
  const { saldo } = props;
  const [done, setDone] = useState(false);
  const [form, setForm] = useState({
    amount: 0,
    bankId: 0,
  });
  const [label, setLabel] = useState("Choose Bank");
  const [banks, setBanks] = useState([]);
  useEffect(() => {
    if (!done) {
      getBanks(localStorage.id, (result) => {
        setBanks(result);
        setDone(true);
      });
    }
  }, []);

  let listBankOptions = [];
  listBankOptions.push({
    value: 0,
    label: "Choose Bank",
  });
  banks?.forEach((bank) => {
    listBankOptions.push({
      value: bank.id,
      label: `${bank.number} an ${bank.name} (${bank.bank})`,
    });
  });
  listBankOptions.push({
    value: "add",
    label: "Add Bank",
  });

  const navigate = useNavigate();
  const closeRef = useRef();
  const withdrawHandler = (form) => {
    addWithdraw(form, (status) => {
      if (status) {
        setForm({ amount: 0, bankId: 0 });
        setLabel("Choose Bank");
        navigate("/withdraws");
        closeRef.current.click();
      }
    });
  };
  return (
    <>
      <div
        className="modal fade"
        id="withdrawModal"
        tabIndex="-1"
        aria-labelledby="withdrawModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="withdrawModalLabel">
                Withdraw
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
                  value={+form.amount}
                  onChange={(e) => {
                    +e.target.value > +saldo
                      ? setForm({ ...form, amount: +saldo })
                      : setForm({ ...form, amount: +e.target.value });
                  }}
                  type="number"
                  className="form-control"
                  id="floatingAmount"
                />
                <label htmlFor="floatingAmount">Amount</label>
              </div>

              <div className="mb-3">
                <label htmlFor="formBank">Bank</label>
                <Select
                  id="formBank"
                  value={{ value: form.bankId, label: label }}
                  options={listBankOptions}
                  onChange={(e) => {
                    if (e.value === "add") {
                      navigate("/bank");
                      closeRef.current.click();
                    } else {
                      setForm({ ...form, bankId: +e.value });
                      setLabel(e.label);
                    }
                  }}
                />
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-danger"
                data-bs-dismiss="modal"
                ref={closeRef}
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-success"
                onClick={() => {
                  withdrawHandler(form);
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

export default ModalWithdraw;
