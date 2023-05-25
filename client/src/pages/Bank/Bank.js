import React, { useEffect, useState } from "react";
import {
  addBanks,
  deleteBank,
  editBanks,
  getBanks,
} from "../../axios/bankAxios";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { ProfileBar } from "../../components";
import { Button, Form, Modal } from "react-bootstrap";
import bankOptions from "../../data/bankOption.json";
import Select from "react-select";
import DataEmpty from "../../components/DataEmpty";
import ReactLoading from "react-loading";

const Bank = () => {
  const [banks, setBanks] = useState([]);
  const [done, setDone] = useState(false);
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
  const location = useLocation();
  const [show, setShow] = useState(false);
  const [addShow, setAddShow] = useState(false);

  useEffect(() => {
    const accountId = localStorage.id;
    getBanks(accountId, (banks) => {
      setBanks(banks);
      setDone(true);
    });
  }, [location.key]);

  let listBankOptions = [];
  bankOptions?.forEach((bank) => {
    listBankOptions.push({
      value: bank.name,
      label: bank.name,
    });
  });

  const handleEdit = (index, data) => {
    setEditIndex(index);
    setShow(true);
    setEditForm({
      id: data.id,
      nameBank: data.bank,
      name: data.name,
      number: data.number,
    });
  };

  const showAddModal = (result) => {
    setAddShow(result);
  };
  const handleClose = () => setShow(false);
  const handleAddClose = () => setAddShow(false);

  const submitHandler = (id, form) => {
    editBanks(id, form, (status) => {
      if (status) {
        setShow(false);
        navigation("/bank");
      } else {
        Swal.fire("Edit Product", "file cannot be empty", "error");
      }
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
      } else {
        handleAddClose();
        navigation("/bank");
      }
    });
  };

  const deleteHandler = (id) => {
    deleteBank(id, (status) => {
      if (status) {
        navigation("/bank");
      }
    });
  };
  return (
    <>
      <ProfileBar></ProfileBar>

      <div className="card border-0 shadow">
        <div className="mt-4 row row-cols-2">
          <div className="col">
            <h5 className="mx-3">Your Bank Account:</h5>
          </div>
          <div className="col">
            <div className="d-flex justify-content-end mx-3">
              <Link
                className="btn btn-success"
                onClick={() => showAddModal(true)}
              >
                Add Bank
              </Link>
            </div>
          </div>
        </div>
        <table className="table">
          <thead>
            <tr className="text-center">
              <th style={{ width: "10%" }} scope="col">
                No
              </th>
              <th style={{ width: "25%" }} scope="col">
                Name
              </th>
              <th style={{ width: "25%" }} scope="col">
                Bank
              </th>
              <th style={{ width: "20%" }} scope="col">
                Number
              </th>
              <th style={{ width: "20%" }} scope="col">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {!done ? (
              <tr>
                <td colSpan="5" className="position-relative">
                  <ReactLoading
                    className="position-absolute top-50 start-50 translate-middle"
                    type={"spin"}
                    color={"#000000"}
                    height={50}
                    width={50}
                  />
                </td>
              </tr>
            ) : banks.length > 0 ? (
              banks.map((item, index) => (
                <tr className="text-center" key={item.id}>
                  <th scope="row">{index + 1}</th>
                  <td>{item.name}</td>
                  <td>{item.bank}</td>
                  <td>{item.number}</td>
                  <td>
                    {editIndex === index ? (
                      <>
                        <Modal show={show} onHide={handleClose}>
                          <Modal.Header closeButton>
                            <Modal.Title>Edit Bank</Modal.Title>
                          </Modal.Header>
                          <Modal.Body>
                            <Form>
                              <Form.Group
                                className="mb-3"
                                controlId="exampleForm.ControlInput1"
                              >
                                <Form.Label>Bank</Form.Label>
                                <Select
                                  value={{ label: editForm.nameBank }}
                                  options={listBankOptions}
                                  onChange={(e) => {
                                    setEditForm({
                                      ...editForm,
                                      nameBank: e.value,
                                    });
                                  }}
                                />
                              </Form.Group>
                              <Form.Group
                                className="mb-3"
                                controlId="exampleForm.ControlInput1"
                              >
                                <Form.Label>Name</Form.Label>
                                <Form.Control
                                  className="input-group"
                                  placeholder="Name"
                                  type="text"
                                  name="name"
                                  value={editForm.name}
                                  onChange={handleEditFormChange}
                                ></Form.Control>
                              </Form.Group>
                              <Form.Group
                                className="mb-3"
                                controlId="exampleForm.ControlInput1"
                              >
                                <Form.Label>Number</Form.Label>
                                <Form.Control
                                  className="input-group"
                                  placeholder="NUmber"
                                  type="number"
                                  name="number"
                                  value={editForm.number}
                                  onChange={handleEditFormChange}
                                ></Form.Control>
                              </Form.Group>
                            </Form>
                          </Modal.Body>
                          <Modal.Footer>
                            <Button
                              className="btn btn-danger"
                              onClick={handleClose}
                            >
                              Close
                            </Button>
                            <Button
                              className="btn btn-success"
                              onClick={() => submitHandler(item.id, editForm)}
                            >
                              Save
                            </Button>
                          </Modal.Footer>
                        </Modal>
                      </>
                    ) : null}

                    <Link
                      className="btn btn-sm btn-primary mx-1"
                      onClick={() => handleEdit(index, item)}
                    >
                      Edit
                    </Link>

                    <Link
                      className="btn btn-sm btn-danger mx-1"
                      onClick={() => deleteHandler(item.id)}
                    >
                      Delete
                    </Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center">
                  <DataEmpty></DataEmpty>
                </td>
              </tr>
            )}
          </tbody>
        </table>
        {addShow ? (
          <Modal show={addShow} onHide={handleAddClose}>
            <Modal.Header closeButton>
              <Modal.Title>Add Bank</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label>Bank</Form.Label>
                  <Select
                    options={listBankOptions}
                    onChange={(e) => {
                      setAddForm({ ...addForm, nameBank: e.value });
                    }}
                  />
                </Form.Group>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    className="input-group"
                    placeholder="Name"
                    type="text"
                    name="name"
                    onChange={handleAddFormChange}
                  ></Form.Control>
                </Form.Group>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label>Number</Form.Label>
                  <Form.Control
                    className="input-group"
                    placeholder="Number"
                    type="number"
                    name="number"
                    onChange={handleAddFormChange}
                  ></Form.Control>
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button className="btn btn-danger" onClick={handleAddClose}>
                Close
              </Button>
              <Button
                className="btn btn-success"
                onClick={() => handleAddBank(addForm)}
              >
                Save
              </Button>
            </Modal.Footer>
          </Modal>
        ) : null}
      </div>
    </>
  );
};

export default Bank;
