import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate, useParams } from "react-router-dom";
import {
  getDetailProduct,
  editProduct,
  getProvinces,
  getCities,
  editProductWithImage,
} from "../../axios/productAxios";
import Swal from "sweetalert2";
import { Form } from "react-bootstrap";
import { formatDate } from "../../helpers/TimeFormat";
import Select from "react-select";
import { imageUrl } from "../../config/config";
import { getDetailGuide, getGuide } from "../../axios/guideAxios";
import TitleCaseFormatter from "../../helpers/TitleCaseFormatter";
import CityFormatter from "../../helpers/CityFormatter";

const EditProduct = () => {
  const [previewImage, setPreviewImage] = useState("");
  const [selectedGuide, setSelectedGuide] = useState({});
  const [productId, setProductId] = useState(0);
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
    guideId: "",
  });

  const [file, setFile] = useState(null);
  const [isExist, setIsExist] = useState(false);
  const params = useParams();
  const navigation = useNavigate();

  const getParams = () => {
    const id = params.productId;
    getDetailProduct(id, (result) => {
      setProductId(result.data.id);
      setForm({
        imageProducts: result.data.imageProducts.map((item) => item.src),
        name: result.data.name,
        dateStart: result.data.dateStart,
        dateEnd: result.data.dateEnd,
        price: result.data.price,
        province: result.data.province,
        city: result.data.city,
        addressDetail: result.data.addressDetail,
        description: result.data.description,
        addressMeetingPoint: result.data.addressMeetingPoint,
        guideId: result.data.guideId,
      });
      getDetailGuide(result.data.guideId, (result) => {
        setSelectedGuide(result.data);
      });
    });
  };
  const [provinces, setProvinces] = useState([]);
  const [guides, setGuides] = useState([]);
  useEffect(() => {
    getParams();
    getProvinces((result) => setProvinces(result));
    getGuide((result) => setGuides(result));
  }, []);

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

  guideOptions.push({
    value: "add",
    label: "Add Guide",
  });

  const submitHandler = () => {
    if (form.name === "") {
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
      if (file === null) {
        editProduct(productId, form, (status) => {
          if (status) {
            navigation("/products");
          }
        });
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

        editProductWithImage(form.id, formData, (status) => {
          if (status) {
            navigation("/products");
          }
        });
      }
    }
  };
  //Preview
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    setIsExist(true);
    reader.onload = (event) => {
      setPreviewImage(event.target.result);
    };

    reader.readAsDataURL(file);
  };

  return (
    <>
      <div>
        <h2>Edit Product</h2>
        <form className="card shadow-lg">
          <div className="container px-5">
            <img
              src={
                isExist === false
                  ? `${imageUrl}${form.imageProducts}`
                  : previewImage
              }
              className="rounded mx-auto d-block m-3"
              alt="Preview"
              style={{ height: "300px" }}
            ></img>
            <div className="mb-3">
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
              <label htmlFor="formName" className="form-label">
                Name
              </label>
              <input
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="form-control"
                type="text"
                id="formName"
                aria-label="default input example"
              />
            </div>
            <div className="mb-3">
              <div className="row row-cols-2">
                <div className="col">
                  <Form.Group controlId="dob">
                    <Form.Label htmlFor="formStartDate">Start Date</Form.Label>
                    <Form.Control
                      id="formStartDate"
                      type="date"
                      name="startDate"
                      placeholder="Date of Birth"
                      formTarget="dd-mm-yyyy"
                      value={formatDate(form.dateStart)}
                      onChange={(e) =>
                        setForm({ ...form, dateStart: e.target.value })
                      }
                    />
                  </Form.Group>
                </div>
                <div className="col">
                  <Form.Group controlId="dob">
                    <Form.Label htmlFor="formEndDate">End Date</Form.Label>
                    <Form.Control
                      id="formEndDate"
                      type="date"
                      name="endDate"
                      placeholder="Date of Birth"
                      formTarget="dd-mm-yyyy"
                      value={formatDate(form.dateEnd)}
                      onChange={(e) =>
                        setForm({ ...form, dateEnd: e.target.value })
                      }
                    />
                  </Form.Group>
                </div>
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="formPrice" className="form-label">
                Price
              </label>
              <div className="input-group">
                <span className="input-group-text">IDR</span>
                <input
                  id="formPrice"
                  value={form.price}
                  onChange={(e) => setForm({ ...form, price: e.target.value })}
                  type="number"
                  className="form-control"
                />
              </div>
            </div>
            <div className="row row-cols-3">
              <div className="mb-3">
                <label htmlFor="formProvince" className="form-label">
                  Province
                </label>
                <Select
                  id="formProvince"
                  value={{ label: form.province }}
                  options={provinceOptions}
                  onChange={(e) => {
                    provinceChangeHandler(e.value);
                    setForm({ ...form, province: e.label });
                  }}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="formCity" className="form-label">
                  City
                </label>
                <Select
                  id="formCity"
                  value={{ label: form.city }}
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
                <label htmlFor="formAddress" className="form-label">
                  Address Detail
                </label>
                <textarea
                  id="formAddress"
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
              <label htmlFor="formDescription" className="form-label">
                Description
              </label>
              <textarea
                id="formDescription"
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
                className="form-control"
                rows="3"
              ></textarea>
            </div>
            <div className="row row-cols-2">
              <div className="mb-3">
                <label htmlFor="formMeetingPoint" className="form-label">
                  Address Meeting Point
                </label>
                <input
                  id="formMeetingPoint"
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
                <label htmlFor="formGuide" className="form-label">
                  Guide
                </label>
                <Select
                  id="formGuide"
                  value={{
                    label: TitleCaseFormatter(selectedGuide.name),
                    value: +selectedGuide.id,
                  }}
                  options={guideOptions}
                  onChange={(e) => {
                    e.value === "add"
                      ? navigation("/guide")
                      : setForm({ ...form, guideId: e.value });
                    setSelectedGuide({ name: e.label, id: e.value });
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

export default EditProduct;
