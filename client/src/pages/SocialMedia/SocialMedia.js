import { faEdit, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { addSosmed, deleteSosmed, editSosmed, getSosmed } from "../../axios/socialAxios";
import Swal from "sweetalert2";

const SocialMedia = () => {
  const [account, setAccount] = useState([]);
  const [editForm, setEditForm] = useState({
    id: "",
    platform: "",
    link: "",
  });
  const [editIndex, setEditIndex] = useState(-1);
  const [addForm, setAddForm] = useState({
    platform: "",
    link: "",
  });
  const navigation = useNavigate();
  const [isAddVisible, setIsAddVisible] = useState(false);
  useEffect(() => {
    const accountId = localStorage.id;
    getSosmed(accountId, (result) => {
      setAccount(result.data);
    });
  }, []);
  const handleEdit = (index, data) => {
    setEditIndex(index);
    setEditForm({
      id: data.id,
      platform: data.platform,
      link: data.link,
    });
  };
  const submitHandler = (id, form) => {
    editSosmed(id, form, (status) => {
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
  const handleAddSosmed = () => {
    addSosmed(addForm, (status) => {
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
    deleteSosmed(id, (status) => {
      if (status) {
        navigation("/profile");
        window.location.reload();
      }
    });
  };
  console.log(addForm);
  return (
    <>
      <h6 className="text-black py-2">Social Media:</h6>
      {account.map((item, index) => (
        <React.Fragment key={item.id}>
          {editIndex === index ? (
            <>
              <div className="input-group">
                <Link className="input-group-text text-decoration-none">
                  Go
                </Link>
                <input
                  type="text"
                  className="form-control"
                  placeholder="plattform"
                  name="platform"
                  value={editForm.platform}
                  onChange={handleEditFormChange}
                />
                <input
                  type="text"
                  aria-label="Last name"
                  className="form-control"
                  name="link"
                  value={editForm.link}
                  placeholder="link"
                  onChange={handleEditFormChange}
                />
              </div>
              <Link
                className="link-dark"
                onClick={() => submitHandler(item.id, editForm)}
              >
                Save
              </Link>
            </>
          ) : (
            <>
              <div className="input-group" key={index + 1}>
                <Link
                  className="input-group-text text-decoration-none"
                  to={item.link}
                >
                  Go
                </Link>
                <div
                  type="text"
                  aria-label="First name"
                  className="form-control"
                >
                  {item.platform}
                </div>
              </div>
              <div className="d-flex justify-content-end">
                <FontAwesomeIcon
                  icon={faEdit}
                  className="mx-2 my-1 link-dark"
                  onClick={() => handleEdit(index, item)}
                />
                <FontAwesomeIcon icon={faTrash} className="mx-2 my-1" onClick={() => {deleteHandler(item.id)}} />
              </div>
            </>
          )}
        </React.Fragment>
      ))}
      {isAddVisible && (
        <>
          <div className="input-group">
            <Link className="input-group-text text-decoration-none">Go</Link>
            <input
              type="text"
              className="form-control"
              placeholder="plattform"
              name="platform"
              value={addForm.platform}
              onChange={handleAddFormChange}
            />
            <input
              type="text"
              aria-label="Last name"
              className="form-control"
              name="link"
              value={addForm.link}
              onChange={handleAddFormChange}
              placeholder="link"
            />
          </div>
          <Link className="link-dark" onClick={handleAddSosmed}>
            Save
          </Link>
        </>
      )}
      <div className="d-flex justify-content-center">
        <Link className="btn btn-outline-dark" onClick={toggleAddBankForm}>
          <FontAwesomeIcon icon={faPlus} />
        </Link>
      </div>
    </>
  );
};

export default SocialMedia;