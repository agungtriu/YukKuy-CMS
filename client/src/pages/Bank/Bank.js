import React, { useEffect, useState } from "react";
import {
  addBanks,
  deleteBank,
  editBanks,
  getBanks,
} from "../../axios/bankAxios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faPlus,
  faSave,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Bank = () => {
  const [banks, setBanks] = useState([]);
  const [editForm, setEditForm] = useState({
    id: "",
    nameBank: "",
    name: "",
    number: "",
  });
  const [editIndex, setEditIndex] = useState(-1);
  const [addForm, setAddForm] = useState({
    nameBank: "",
    name: "",
    number: "",
  });

  const navigation = useNavigate();
  const [isAddVisible, setIsAddVisible] = useState(false);
  useEffect(() => {
    const accountId = localStorage.id;
    getBanks(accountId, (banks) => {
      setBanks(banks);
    });
  }, []);

  const handleEdit = (index, data) => {
    setEditIndex(index);
    setEditForm({
      id: data.id,
      nameBank: data.bank,
      name: data.name,
      number: data.number,
    });
  };
  const submitHandler = (id, form) => {
    editBanks(id, form, (status) => {
      if (status) {
        navigation("/profile");
      } else {
        Swal.fire("Edit Product", "file cannot be empty", "error");
      }
      window.location.reload();
    });
  };

  const handleEditFormChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const handleAddFormChange = (e) => {
    setAddForm({ ...addForm, [e.target.name]: e.target.value });
  };

  const handleAddBank = () => {
    addBanks(addForm, (status) => {
      if (!status) {
        Swal.fire("Add Bank", "file cannot be empty", "error");
      }
      window.location.reload();
    });
  };

  const toggleAddBankForm = () => {
    setIsAddVisible(!isAddVisible);
  };

  const deleteHandler = (id) => {
    deleteBank(id, (status) => {
      if (status) {
        navigation("/profile");
        window.location.reload();
      }
    });
  };
  return (
    <>
      <div className="card mx-2 border-0 shadow">
        <h6 className="mx-3">Your Bank Account:</h6>
        <div className="overflow-scroll">
          <div className="group row row-cols-3 mx-2">
            {banks.map((item, index) => (
              <div className="col" key={item.id}>
                <div className="card w-75 my-1 px-0">
                  <div className="card-header d-flex justify-content-between align-items-center">
                    {editIndex === index ? (
                      <>
                        <input
                          className="input-group"
                          placeholder="Bank"
                          type="text"
                          name="bank"
                          value={editForm.nameBank}
                          onChange={handleEditFormChange}
                        />
                        <Link
                          className="link-dark"
                          onClick={() => submitHandler(item.id, editForm)}
                        >
                          <FontAwesomeIcon icon={faSave} />
                        </Link>
                      </>
                    ) : (
                      <>
                        <h5 className="mb-0">{item.bank}</h5>
                        <Link
                          className="link-dark"
                          onClick={() => handleEdit(index, item)}
                        >
                          <FontAwesomeIcon icon={faEdit} />
                        </Link>
                        <Link
                          className="link-dark"
                          onClick={() => deleteHandler(item.id)}
                        >
                          <FontAwesomeIcon icon={faTrash} />
                        </Link>
                      </>
                    )}
                  </div>
                  <div className="card-body">
                    {editIndex === index ? (
                      <>
                        <input
                          className="input-group"
                          placeholder="Name"
                          type="text"
                          value={editForm.name}
                          onChange={handleEditFormChange}
                        />
                        <input
                          className="input-group"
                          placeholder="No"
                          type="text"
                          value={editForm.number}
                          onChange={handleEditFormChange}
                        />
                      </>
                    ) : (
                      <>
                        <h6 className="card-title text-black">{item.name}</h6>
                        <h6 className="card-text text-black">{item.number}</h6>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
            <div className="col">
              {isAddVisible && (
                <div className="card w-75 my-1 px-0">
                  <div className="card-header d-flex justify-content-between align-items-center">
                    <input
                      className="input-group"
                      placeholder="Bank"
                      type="text"
                      name="nameBank"
                      value={addForm.nameBank}
                      onChange={handleAddFormChange}
                    />
                  </div>
                  <div className="card-body">
                    <input
                      className="input-group"
                      placeholder="name"
                      type="text"
                      name="name"
                      value={addForm.name}
                      onChange={handleAddFormChange}
                    />
                    <input
                      className="input-group"
                      placeholder="No"
                      type="number"
                      name="number"
                      value={addForm.number}
                      onChange={handleAddFormChange}
                    />
                  </div>
                  <div
                    className="btn-group"
                    role="group"
                    aria-label="Basic example"
                  >
                    <Link
                      className="btn btn-success btn-sm"
                      onClick={handleAddBank}
                    >
                      Save
                    </Link>
                  </div>
                </div>
              )}
              <Link
                className="card w-75 my-1 px-0 text-decoration-none"
                onClick={toggleAddBankForm}
              >
                <div className="card-body text-center">
                  <h6 className="card-title text-black">Add Bank</h6>
                  <FontAwesomeIcon icon={faPlus} size="2xl" />
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Bank;
