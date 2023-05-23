import React, {useState} from "react";
import { editPassword } from "../../axios/accountAxios";
import { useNavigate } from "react-router-dom";

const EditPassword = () => {
  const [form, setForm] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const navigation = useNavigate();
  const submitHandler = () => {
    editPassword(form, (status) => {
      if (status) {
        navigation("/profile");
      }
    });
  };
  return (
    <>
      <div className="row my-5">
        <div className="w-100 text-center">
          <h5>Edit Password</h5>
        </div>
        <div className="w-50 mx-auto">
          <hr />
          <div className="form-floating mb-3">
            <input
              value={form.oldPassword}
              onChange={(e) =>
                setForm({ ...form, oldPassword: e.target.value })
              }
              type="password"
              className="form-control"
              id="floatingOld"
            ></input>
            <label htmlFor="floatingOld">Current Password: </label>
          </div>

          <div className="form-floating mb-3">
            <input
              value={form.newPassword}
              onChange={(e) =>
                setForm({ ...form, newPassword: e.target.value })
              }
              type="password"
              className="form-control"
              id="floatingNew"
              ></input>
              <label htmlFor="floatingNew">New Password: </label>
          </div>

          <div className="form-floating mb-3">
            <input
              value={form.confirmPassword}
              onChange={(e) =>
                setForm({ ...form, confirmPassword: e.target.value })
              }
              type="password"
              className="form-control"
              id="floatingConfirm"
            ></input>
            <label htmlFor="floatingConfirm">Confirm Password: </label>
          </div>

          <div className="mb-3 text-center">
            <button
              onClick={() => submitHandler()}
              className="btn btn-block btn-success"
            >
              Submit Changes
            </button>
          </div>
        </div>
      </div>
    </>
  )
};

export default EditPassword;
