import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  addGuide,
  deleteGuide,
  editGuide,
  getGuide,
} from "../../axios/guideAxios";
import Swal from "sweetalert2";
import { ProfileBar } from "../../components";
import { Button, Form, Modal } from "react-bootstrap";

const Guide = () => {
  const [guide, setGuide] = useState([]);
  const [editForm, setEditForm] = useState({
    id: "",
    name: "",
    phone: "",
  });
  const [editIndex, setEditIndex] = useState(-1);
  const [addForm, setAddForm] = useState({
    name: "",
    phone: "",
  });
  const [isAddGuideVisible, setIsAddGuideVisible] = useState(false); // State untuk menampilkan/menyembunyikan form tambahan
  const navigation = useNavigate();
  const location = useLocation();

  useEffect(() => {
    getGuide((result) => {
      setGuide(result);
    });
  }, [location.key]);

  const handleEdit = (index, data) => {
    setEditIndex(index);
    setEditForm({ id: data.id, name: data.name, phone: data.phone });
  };

  const closeEdit = () => {
    setEditIndex(-1);
  };

  const submitHandler = (id, form) => {
    editGuide(id, form, (status) => {
      if (status) {
        closeEdit();
        navigation("/guide");
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

  const handleAddGuide = () => {
    console.log(addForm);
    addGuide(addForm, (status) => {
      if (!status) {
        Swal.fire("Add Guide", "file cannot be empty", "error");
      } else {
        toggleAddGuideForm();
        navigation("/guide");
      }
    });
  };

  const toggleAddGuideForm = () => {
    setIsAddGuideVisible(!isAddGuideVisible);
  };

  const deleteHandler = (id) => {
    deleteGuide(id, (status) => {
      if (status) {
        navigation("/guide");
      }
    });
  };

  return (
    <>
      <ProfileBar></ProfileBar>
      <div className="card border-0 shadow">
        <div className="mt-4 row row-cols-2">
          <div className="col">
            <h5 className="px-3">List Guide:</h5>
          </div>
          <div className="col" style={{ paddingRight: "11.5%" }}>
            <div className="d-flex justify-content-end mx-2">
              <Link
                className="btn btn-success"
                onClick={toggleAddGuideForm}
              >
                Add Guide
              </Link>
            </div>
          </div>
        </div>
        {isAddGuideVisible && (
          <Modal show={isAddGuideVisible} onHide={toggleAddGuideForm}>
            <Modal.Header closeButton>
              <Modal.Title>Add Guide</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
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
                  <Form.Label>Phone</Form.Label>
                  <Form.Control
                    className="input-group"
                    placeholder="Phone"
                    type="number"
                    name="phone"
                    onChange={handleAddFormChange}
                  ></Form.Control>
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button className="btn btn-danger" onClick={toggleAddGuideForm}>
                Close
              </Button>
              <Button className="btn btn-success" onClick={handleAddGuide}>
                Save
              </Button>
            </Modal.Footer>
          </Modal>
        )}
        <table className="table">
          <thead>
            <tr className="text-center">
              <th style={{ width: "10%" }} scope="col">
                No
              </th>
              <th style={{ width: "30%" }} scope="col">
                Name
              </th>
              <th style={{ width: "30%" }} scope="col">
                Phone
              </th>
              <th style={{ width: "30%" }} scope="col">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {guide.map((item, index) => (
              <tr className="text-center" key={item.id}>
                <th scope="row">{index + 1}</th>
                <td>
                  {editIndex === index ? (
                    <input
                      type="text"
                      name="name"
                      value={editForm.name}
                      onChange={handleEditFormChange}
                    />
                  ) : (
                    item.name
                  )}
                </td>
                <td>
                  {editIndex === index ? (
                    <input
                      type="text"
                      name="phone"
                      value={editForm.phone}
                      onChange={handleEditFormChange}
                    />
                  ) : (
                    item.phone
                  )}
                </td>
                <td>
                  {editIndex === index ? (
                    <>
                      <Link
                        className="btn btn-sm btn-success mx-1"
                        onClick={() => submitHandler(item.id, editForm)}
                      >
                        Save
                      </Link>
                      <Link
                        className="btn btn-sm btn-secondary mx-1"
                        onClick={closeEdit}
                      >
                        Cancel
                      </Link>
                    </>
                  ) : (
                    <>
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
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Guide;
