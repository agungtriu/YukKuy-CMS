import React,{useState, useEffect} from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  addGuide,
  deleteGuide,
  editGuide,
  getGuide,
} from "../../axios/guideAxios";
import Swal from "sweetalert2";
import { ProfileBar } from "../../components";

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

  useEffect(() => {
    getGuide((result) => {
      setGuide(result);
    });
  }, []);

  const handleEdit = (index, data) => {
    setEditIndex(index);
    setEditForm({ id: data.id, name: data.name, phone: data.phone });
  };

  const submitHandler = (id, form) => {
    editGuide(id, form, (status) => {
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

  const handleAddGuide = () => {
    addGuide(addForm, (status) => {
      if (!status) {
        Swal.fire("Add Guide", "file cannot be empty", "error");
      }
      window.location.reload();
    });
  };

  const toggleAddGuideForm = () => {
    setIsAddGuideVisible(!isAddGuideVisible);
  };

  const deleteHandler = (id) => {
    deleteGuide(id, (status) => {
      if (status) {
        navigation("/profile");
        window.location.reload();
      }
    });
  };

  return (
    <>
    <ProfileBar></ProfileBar>
      <div className="row row-cols-2">
        <div className="col">
          <h5 className="my-2 px-3">List Guide:</h5>
        </div>
        <div className="col">
          <div className="d-flex justify-content-end mx-2">
            <Link className="btn btn-outline-dark" onClick={toggleAddGuideForm}>
              {isAddGuideVisible ? "Cancel" : "Add Guide"}
            </Link>
          </div>
        </div>
      </div>
      {isAddGuideVisible && (
        <table className="table">
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Phone</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td></td>
              <td>
                <input
                  type="text"
                  name="name"
                  value={addForm.name}
                  onChange={handleAddFormChange}
                />
              </td>
              <td>
                <input
                  type="text"
                  name="phone"
                  value={addForm.phone}
                  onChange={handleAddFormChange}
                />
              </td>
              <td>
                <Link
                  className="btn btn-sm btn-success mx-1"
                  onClick={handleAddGuide}
                >
                  Save
                </Link>
              </td>
            </tr>
          </tbody>
        </table>
      )}
      <table className="table">
        <thead>
          <tr className="text-center">
            <th scope="col">No</th>
            <th scope="col">Name</th>
            <th scope="col">Phone</th>
            <th scope="col">Action</th>
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
                  <Link
                    className="btn btn-sm btn-success mx-1"
                    onClick={() => submitHandler(item.id, editForm)}
                  >
                    Save
                  </Link>
                ) : (
                  <Link
                    className="btn btn-sm btn-primary mx-1"
                    onClick={() => handleEdit(index, item)}
                  >
                    Edit
                  </Link>
                )}
                <Link
                  className="btn btn-sm btn-danger mx-1"
                  onClick={() => deleteHandler(item.id)}
                >
                  Delete
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Guide;
