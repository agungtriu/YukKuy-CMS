import { faPlus, } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  addSosmed,
  deleteSosmed,
  editSosmed,
  getSosmed,
} from "../../axios/socialAxios";
import Swal from "sweetalert2";
import { ReactSocialMediaIcons } from "react-social-media-icons";
import { SlOptionsVertical } from "react-icons/sl";
import Select from "react-select";

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
  const location = useLocation();

  const socialMedias = [
    {
      value: "facebook",
      label: "Facebook",
    },
    {
      value: "youtube",
      label: "Youtube",
    },
    {
      value: "instagram",
      label: "Instagram",
    },
    {
      value: "twitter",
      label: "Twitter",
    },
  ];

  useEffect(() => {
    const accountId = localStorage.id;
    getSosmed(accountId, (result) => {
      setAccount(result.data);
      // console.log(result.data);
    });
  }, [location.key]);

  const handleEdit = (index, data) => {
    setEditIndex(index);
    setEditForm({
      id: data.id,
      platform: data.platform,
      link: data.link,
    });
  };

  const closeEdit = () => {
    setEditIndex(-1);
  };

  const submitHandler = (id, form) => {
    editSosmed(id, form, (status) => {
      if (status) {
        closeEdit();
        navigation("/profile");
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
  const handleAddSosmed = () => {
    addSosmed(addForm, (status) => {
      if (!status) {
        Swal.fire("Add Bank", "file cannot be empty", "error");
      } else {
        toggleAddBankForm();
        navigation("/profile");
        setAddForm({ ...addForm, link: "" });
      }
    });
  };
  const toggleAddBankForm = () => {
    setIsAddVisible(!isAddVisible);
  };
  const deleteHandler = (id) => {
    deleteSosmed(id, (status) => {
      if (status) {
        navigation("/profile");
      }
    });
  };
  return (
    <>
      <div className="mt-3 mb-2 d-flex justify-content-between">
        <h6 className="text-black align-self-center">Social Media:</h6>
        <div className="d-flex justify-content-center">
          <Link className="btn btn-success" onClick={toggleAddBankForm}>
            <FontAwesomeIcon icon={faPlus} />
          </Link>
        </div>
      </div>
      {account.map((item, index) => (
        <React.Fragment key={item.id}>
          {editIndex === index ? (
            <>
              <div className="input-group">
                {/* <input
                  type="text"
                  className="form-control"
                  placeholder="plattform"
                  name="platform"
                  value={editForm.platform}
                  onChange={handleEditFormChange}
                /> */}
                <Select
                  options={socialMedias}
                  placeholder={editForm.platform}
                  onChange={(e) => {
                    setEditForm({ ...editForm, platform: e.label });
                  }}
                />
                <input
                  type="text"
                  aria-label="Last name"
                  className="form-control ms-2"
                  name="link"
                  value={editForm.link}
                  placeholder="link"
                  onChange={handleEditFormChange}
                />
              </div>
              <div className="d-flex justify-content-center my-2">
                <Link className="btn btn-danger mx-2" onClick={closeEdit}>
                  Cancel
                </Link>
                <Link
                  className="btn btn-success"
                  onClick={() => submitHandler(item.id, editForm)}
                >
                  Save
                </Link>
              </div>
            </>
          ) : (
            <>
              <div
                className="d-flex justify-content-start mb-1"
                key={index + 1}
              >
                {item.platform === "Youtube" ? (
                  <>
                    <div className="">
                      <ReactSocialMediaIcons
                        borderColor="rgba(217, 46, 46,1)"
                        icon="youtube"
                        iconColor="rgba(255, 255, 255,1)"
                        backgroundColor="rgba(217, 46, 46,1)"
                        url={`https://www.youtube.com/${item.link}`}
                        size="35"
                      />
                    </div>
                  </>
                ) : null}
                {item.platform === "Twitter" ? (
                  <>
                    <div className="">
                      <ReactSocialMediaIcons
                        borderColor="rgba(26,166,233,1)"
                        icon="twitter"
                        iconColor="rgba(255,255,255,1)"
                        backgroundColor="rgba(26,166,233,1)"
                        url={`https://www.twitter.com/${item.link}`}
                        size="35"
                      />
                    </div>
                  </>
                ) : null}

                {item.platform === "Facebook" ? (
                  <>
                    <div className="">
                      <ReactSocialMediaIcons
                        borderColor="rgba(24, 119, 242,1)"
                        icon="facebook"
                        iconColor="rgba(255,255,255,1)"
                        backgroundColor="rgba(24, 119, 242,1)"
                        url={`https://www.facebook.com/${item.link}`}
                        size="35"
                      />
                    </div>
                  </>
                ) : null}

                {item.platform === "Instagram" ? (
                  <>
                    <div className="">
                      <ReactSocialMediaIcons
                        borderColor="rgba(233, 68, 117,1)"
                        icon="instagram"
                        iconColor="rgba(255,255,255,1)"
                        backgroundColor="rgba(233, 68, 117,1)"
                        url={`https://www.instagram.com/${item.link}`}
                        size="35"
                      />
                    </div>
                  </>
                ) : null}

                <div
                  type="text"
                  aria-label="First name"
                  className="align-self-center mx-2 flex-grow-1"
                >
                  @{item.link}
                </div>
                <div className="dropdown align-self-center">
                  <SlOptionsVertical className="mx-3 dropdown-toggle" />
                  <ul className="dropdown-menu dropdown-menu-right">
                    <li>
                      <button
                        className="dropdown-item"
                        onClick={() => handleEdit(index, item)}
                      >
                        Edit
                      </button>
                    </li>
                    <li>
                      <button
                        className="dropdown-item"
                        onClick={() => deleteHandler(item.id)}
                      >
                        Delete
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
              {/* <div className="d-flex justify-content-end">
                <FontAwesomeIcon
                  icon={faEdit}
                  className="mx-2 my-1 link-dark"
                  onClick={() => handleEdit(index, item)}
                />
                <FontAwesomeIcon
                  icon={faTrash}
                  className="mx-2 my-1"
                  onClick={() => {
                    deleteHandler(item.id);
                  }}
                />
                
              </div> */}
            </>
          )}
        </React.Fragment>
      ))}
      {isAddVisible && (
        <>
          <div className="input-group">
            {/* <Link className="input-group-text text-decoration-none">Go</Link> */}
            {/* <input
              type="text"
              className="form-control"
              placeholder="plattform"
              name="platform"
              value={addForm.platform}
              onChange={handleAddFormChange}
            /> */}
            <Select
              options={socialMedias}
              onChange={(e) => {
                setAddForm({ ...addForm, platform: e.label });
              }}
            />
            <input
              type="text"
              aria-label="Last name"
              className="form-control ms-2"
              name="link"
              value={addForm.link}
              onChange={handleAddFormChange}
              placeholder="link"
            />
          </div>
          <div className="d-flex justify-content-center mt-2">
            <Link className="btn btn-danger mx-2" onClick={toggleAddBankForm}>
              Cancel
            </Link>
            <Link className="btn btn-success" onClick={handleAddSosmed}>
              Save
            </Link>
          </div>
        </>
      )}
    </>
  );
};

export default SocialMedia;
