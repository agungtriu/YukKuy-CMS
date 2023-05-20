import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { addProduct, getCities, getProvinces } from "../../axios/productAxios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { Form } from "react-bootstrap";
import Select from "react-select";
import CityFormatter from "../../helpers/CityFormatter";
import TitleCaseFormatter from "../../helpers/TitleCaseFormatter";
import { getGuide } from "../../axios/guideAxios";

const FormProduct = () => {
  const [previewImage, setPreviewImage] = useState("");
  const [form, setForm] = useState({
    imageProducts: [],
    name: "",
    dateStart: "",
    dateEnd: "",
    price: 0,
    province: "",
    city: "",
    addressDetail: "",
    description: "",
    addressMeetingPoint: "",
    guideId: 0,
  });
  const [file, setFile] = useState(null);
  const navigation = useNavigate();

  const [provinces, setProvinces] = useState([]);
  const [guides, setGuides] = useState([]);
  useEffect(() => {
    getProvinces((result) => setProvinces(result));
    getGuide((result) => setGuides(result));
  });

  let provinceOptions = [];
  provinces?.forEach((province) => {
    provinceOptions.push({
      value: province.id,
      label: TitleCaseFormatter(province.name),
    });
  });

  const [cities, setCities] = useState([]);
  const provinceChangeHandler = (id) => {
    getCities(id, (result) => setCities(result));
  };

  let cityOptions = [];
  cities?.forEach((city) => {
    cityOptions.push({
      value: city.id,
      label: TitleCaseFormatter(city.name),
    });
  });

  let guideOptions = [];
  guides?.forEach((guide) => {
    guideOptions.push({
      value: guide.id,
      label: TitleCaseFormatter(guide.name),
    });
  });

  const submitHandler = () => {
    if (file === null) {
      Swal.fire("Add Products", "File cannot be empty", "error");
    } else if (form.name === "") {
      Swal.fire("Add Products", "Name cannot be empty", "error");
    } else if (form.dateStart === "") {
      Swal.fire("Add Products", "Start Date cannot be empty", "error");
    } else if (form.dateEnd === "") {
      Swal.fire("Add Products", "End Date cannot be empty", "error");
    } else if (form.price === 0) {
      Swal.fire("Add Products", "Price cannot be 0", "error");
    } else if (form.province === "") {
      Swal.fire("Add Products", "Province cannot be empty", "error");
    } else if (form.city === "") {
      Swal.fire("Add Products", "City cannot be empty", "error");
    } else if (form.addressDetail === "") {
      Swal.fire("Add Products", "Address cannot be empty", "error");
    } else if (form.description === "") {
      Swal.fire("Add Products", "Description cannot be empty", "error");
    } else if (form.addressMeetingPoint === "") {
      Swal.fire("Add Products", "Meeting Point cannot be empty", "error");
    } else if (form.guideId === 0) {
      Swal.fire("Add Products", "Guide cannot be empty", "error");
    } else {
      const formData = new FormData();
      formData.append("images", file);
      formData.append("name", form.name);
      formData.append("dateStart", form.dateStart);
      formData.append("dateEnd", form.dateEnd);
      formData.append("price", form.price);
      formData.append("province", form.province);
      formData.append("city", form.city);
      formData.append("addressDetail", form.addressDetail);
      formData.append("description", form.description);
      formData.append("addressMeetingPoint", form.addressMeetingPoint);
      formData.append("guideId", form.guideId);

      addProduct(formData, (status) => {
        if (status) {
          navigation("/products");
        }
      });
    }
  };

  // Preview
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      setPreviewImage(e.target.result);
    };

    reader.readAsDataURL(file);
  };
  return (
    <>
      <div>
        <h2>Form Product</h2>
        <form className="card shadow-lg">
          <div className="container px-5">
            {previewImage !== "" ? (
              <img
                src={previewImage}
                className="rounded mx-auto d-block m-3"
                alt="Preview"
                style={{ maxWidth: "300px" }}
              ></img>
            ) : null}
            <div className="my-3">
              <label htmlFor="formFile" className="form-label">
                Product Images: {form.imageProducts}
              </label>
              <input
                type="file"
                className="form-control"
                id="formFile"
                onChange={(e) => {
                  setFile(e.target.files[0]);
                  setForm({ ...form, imageProducts: e.target.files[0].name });
                  handleImageUpload(e);
                }}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="formFile" className="form-label">
                Name
              </label>
              <input
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="form-control"
                type="text"
                aria-label="default input example"
              />
            </div>
            <div className="mb-3">
              <div className="row row-cols-2">
                <div className="col">
                  <Form.Group controlId="dob">
                    <Form.Label>Start Date</Form.Label>
                    <Form.Control
                      type="date"
                      name="startDate"
                      placeholder="Date of Birth"
                      formTarget="dd-mm-yyyy"
                      onChange={(e) =>
                        setForm({ ...form, dateStart: e.target.value })
                      }
                    />
                  </Form.Group>
                </div>
                <div className="col">
                  <Form.Group controlId="dob">
                    <Form.Label>End Date</Form.Label>
                    <Form.Control
                      type="date"
                      name="endDate"
                      placeholder="Date of Birth"
                      formTarget="dd-mm-yyyy"
                      onChange={(e) =>
                        setForm({ ...form, dateEnd: e.target.value })
                      }
                    />
                  </Form.Group>
                </div>
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="formFile" className="form-label">
                Price
              </label>
              <div className="input-group">
                <span className="input-group-text">IDR</span>
                <input
                  value={form.price}
                  onChange={(e) => setForm({ ...form, price: e.target.value })}
                  type="number"
                  className="form-control"
                />
              </div>
            </div>
            <div className="row row-cols-3">
              <div className="mb-3">
                <label htmlFor="formFile" className="form-label">
                  Province
                </label>
                <Select
                  options={provinceOptions}
                  onChange={(e) => {
                    provinceChangeHandler(e.value);
                    setForm({ ...form, province: e.label });
                  }}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="formFile" className="form-label">
                  City
                </label>
                <Select
                  options={cityOptions}
                  onChange={(e) => {
                    setForm({
                      ...form,
                      city: CityFormatter(e.label),
                    });
                  }}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="formFile" className="form-label">
                  Address Detail
                </label>
                <textarea
                  value={form.addressDetail}
                  onChange={(e) =>
                    setForm({ ...form, addressDetail: e.target.value })
                  }
                  className="form-control"
                  type="text"
                  aria-label="default input example"
                ></textarea>
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="formFile" className="form-label">
                Description
              </label>
              <textarea
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
                className="form-control"
                id="exampleFormControlTextarea1"
                rows="3"
              ></textarea>
            </div>
            <div className="row row-cols-2">
              <div className="mb-3">
                <label htmlFor="formFile" className="form-label">
                  Address Meeting Point
                </label>
                <input
                  value={form.addressMeetingPoint}
                  onChange={(e) =>
                    setForm({ ...form, addressMeetingPoint: e.target.value })
                  }
                  className="form-control"
                  type="text"
                  aria-label="default input example"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="formFile" className="form-label">
                  Guide
                </label>
                <Select
                  options={guideOptions}
                  onChange={(e) => {
                    setForm({ ...form, guideId: e.value });
                  }}
                />
              </div>
            </div>
            <div className="row row-cols-2 d-flex align-items-center justify-content-center m-5">
              <Link
                className="btn btn-lg active text-white"
                type="submit"
                onClick={() => submitHandler()}
              >
                Submit
              </Link>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default FormProduct;
