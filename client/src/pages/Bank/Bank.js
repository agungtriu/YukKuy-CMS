import React, { useEffect, useState } from "react";
import {
  addBanks,
  deleteBank,
  editBanks,
  getBanks,
} from "../../axios/bankAxios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { ProfileBar } from "../../components";
import { Button, Form, Modal } from "react-bootstrap";
import bankOptions from "../../data/bankOption.json";
import Select from "react-select";

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
  const [show, setShow] = useState(false);
  const [addShow, setAddShow] = useState(false);

  useEffect(() => {
    const accountId = localStorage.id;
    getBanks(accountId, (banks) => {
      setBanks(banks);
    });
  }, []);

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

  const handleClose = () => setShow(false);
  const handleAddClose = () => setAddShow(false);

  const submitHandler = (id, form) => {
    editBanks(id, form, (status) => {
      if (status) {
        navigation("/profile/bank");
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

  const deleteHandler = (id) => {
    deleteBank(id, (status) => {
      if (status) {
        navigation("/profile/bank");
        window.location.reload();
      }
    });
  };
  return (
    <>
      <ProfileBar></ProfileBar>
      <div className="card mx-2 border-0 shadow">
        <h6 className="mx-3">Your Bank Account:</h6>
        <div className="overflow-scroll">
          <div className="group row row-cols-3 mx-2">
            {banks.map((item, index) => (
              <div className="col" key={item.id}>
                <div className="card w-75 my-1 px-0">
                  <div className="card-header d-flex justify-content-between align-items-start">
                    {editIndex === index ? (
                      <>
                        <Modal show={show} onHide={handleClose}>
                          <Modal.Header closeButton>
                            <Modal.Title>Edit Product</Modal.Title>
                          </Modal.Header>
                          <Modal.Body>
                            <Form>
                              <Form.Group
                                className="mb-3"
                                controlId="exampleForm.ControlInput1"
                              >
                                <Form.Label>Nama Bank</Form.Label>
                                <Select
                                  value={editForm.nameBank}
                                  options={bankOptions}
                                  onChange={handleEditFormChange}
                                ></Select>
                              </Form.Group>
                              <Form.Group
                                className="mb-3"
                                controlId="exampleForm.ControlInput1"
                              >
                                <Form.Label>Nama Akun</Form.Label>
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
                                <Form.Label>Nomor</Form.Label>
                                <Form.Control
                                  className="input-group"
                                  placeholder="No"
                                  type="text"
                                  name="number"
                                  value={editForm.number}
                                  onChange={handleEditFormChange}
                                ></Form.Control>
                              </Form.Group>
                            </Form>
                          </Modal.Body>
                          <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                              Close
                            </Button>
                            <Button
                              variant="primary"
                              onClick={() => submitHandler(item.id, editForm)}
                            >
                              Save Changes
                            </Button>
                          </Modal.Footer>
                        </Modal>
                      </>
                    ) : null}
                    <div className="card-header d-flex justify-content-between align-items-start">
                      <h5 className="mb-0">{item.bank}</h5>
                    </div>
                    <div className="button-container">
                      <Link
                        className="link-dark me-2"
                        onClick={() => handleEdit(index, item)}
                      >
                        <FontAwesomeIcon icon={faEdit} />
                      </Link>
                      <Link
                        className="link-dark me-2"
                        onClick={() => deleteHandler(item.id)}
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </Link>
                    </div>
                  </div>
                  <div className="card-body">
                    <h6 className="card-title text-black">{item.name}</h6>
                    <h6 className="card-text text-black">{item.number}</h6>
                  </div>
                </div>
              </div>
            ))}
            <div className="col">
              {addShow ? (
                <Modal show={addShow} onHide={handleAddClose}>
                  <Modal.Header closeButton>
                    <Modal.Title>Add Product</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <Form>
                      <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlInput1"
                      >
                        <Form.Label>Nama Bank</Form.Label>
                        <Form.Control
                          as="select"
                          className="input-group"
                          name="nameBank"
                          value={addForm.nameBank}
                          onChange={handleAddFormChange}
                        >
                          <option value="">Pilih Nama Bank</option>
                          <option value="">Pilih Nama Bank</option>
                          {bankOptions.map((item, index) => (
                            <option
                              value={item.name}
                              key={index}
                            >{`${item.name} : ${item.code}`}</option>
                          ))}
                        </Form.Control>
                      </Form.Group>
                      <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlInput1"
                      >
                        <Form.Label>Nama Akun</Form.Label>
                        <Form.Control
                          className="input-group"
                          placeholder="Name"
                          type="text"
                          name="name"
                          value={addForm.name}
                          onChange={handleAddFormChange}
                        ></Form.Control>
                      </Form.Group>
                      <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlInput1"
                      >
                        <Form.Label>Nomor</Form.Label>
                        <Form.Control
                          className="input-group"
                          placeholder="No"
                          type="text"
                          name="number"
                          value={addForm.number}
                          onChange={handleAddFormChange}
                        ></Form.Control>
                      </Form.Group>
                    </Form>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={handleAddClose}>
                      Close
                    </Button>
                    <Button
                      variant="primary"
                      onClick={() => handleAddBank(addForm)}
                    >
                      Save Changes
                    </Button>
                  </Modal.Footer>
                </Modal>
              ) : (
                <Link
                  className="card w-75 my-1 px-0 text-decoration-none"
                  onClick={() => setAddShow(true)}
                >
                  <div className="card-body text-center">
                    <h6 className="card-title text-black">Add Bank</h6>
                    <FontAwesomeIcon icon={faPlus} size="2xl" />
                  </div>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Bank;
