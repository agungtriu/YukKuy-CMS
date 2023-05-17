import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { editGuide, getGuide } from "../../axios/guideAxios";
import Swal from "sweetalert2";

const Guide = () => {
  const [guide, setGuide] = useState([]);
  const [editForm, setEditForm] = useState({
    id: "",
    name: "",
    phone: "",
  });
  const [editIndex, setEditIndex] = useState(-1);
  const navigation = useNavigate();

  useEffect(() => {
    getGuide((result) => {
        // console.log(result)
      setGuide(result);
    });
  }, []);

  const handleEdit = (index) => {
    setEditIndex(index);
  };

  const submitHandler = (id) => {
    editGuide(id, guide, (status) => {
      if (status) {
        navigation("/profile");
      } else {
        Swal.fire("Edit Product", "file cannot be empty", "error");
      }
    });
  };


  return (
    <>
      <div className="row row-cols-2">
        <div className="col">
          <h5 className="my-2 px-3">List Guide:</h5>
        </div>
        <div className="col">
          <div className="d-flex justify-content-end mx-2">
            <Link className="btn btn-outline-dark">Add Guide</Link>
          </div>
        </div>
      </div>
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
                    value={item.name}
                    onChange={(e) =>
                      setEditForm({ ...editForm, name: e.target.value })
                    }
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
                    value={item.phone}
                    onChange={(e) =>
                      setEditForm({ ...editForm, phone: e.target.value })
                    }
                  />
                ) : (
                  item.phone
                )}
              </td>
              <td>
                {editIndex === index ? (
                  <button
                    className="btn btn-sm btn-success mx-1"
                    onClick={() => submitHandler(item.id)}
                  >
                    Save
                  </button>
                ) : (
                  <button
                    className="btn btn-sm btn-primary mx-1"
                    onClick={() => handleEdit(index)}
                  >
                    Edit
                  </button>
                )}
                <button className="btn btn-sm btn-danger mx-1">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Guide;
