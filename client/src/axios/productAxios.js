import axios from "axios";
import Swal from "sweetalert2";
const config = require("../config/config");
const baseUrl = config.baseUrl;

const URL = baseUrl + "/products/";

const getProducts = async (cb) => {
  try {
    let results = await axios({
      method: "GET",
      url: URL + "/cms",
      headers: {
        access_token: localStorage.access_token,
      },
    });
    cb(results.data);
  } catch (err) {
    if (err.response.status === 500) {
      Swal.fire(
        "Error!",
        err.response.data.error.errors[0].original.validatorArgs[0].message,
        "error"
      );
    } else {
      Swal.fire("Error!", err.response.data.message, "error");
    }
  }
};

const addProduct = async (form, cb) => {
  const headers = {
    "Content-Type": "multipart/form-data",
    access_token: localStorage.access_token,
  };
  try {
    let results = await axios({
      method: "POST",
      url: URL + "/add",
      data: form,
      headers: headers,
    });
    cb(true);
    Swal.fire("Add Product", results.data.message, "success");
  } catch (err) {
    if (err.response.status === 500) {
      Swal.fire(
        "Error!",
        err.response.data.error.errors[0].original.validatorArgs[0].message,
        "error"
      );
    } else {
      Swal.fire("Error!", err.response.message, "error");
    }
  }
};

const getDetailProduct = async (productId, cb) => {
  try {
    let results = await axios({
      method: "GET",
      url: URL + "cms/detail/" + productId,
    });
    cb(results.data);
  } catch (err) {
    if (err.response.status === 500) {
      Swal.fire(
        "Error!",
        err.response.data.error.errors[0].original.validatorArgs[0].message,
        "error"
      );
    } else {
      Swal.fire("Error!", err.response.data.message, "error");
    }
  }
};
const editProduct = async (productId, form, cb) => {
  try {
    let results = await axios({
      method: "PUT",
      url: URL + "edit/" + productId,
      data: form,
      headers: {
        access_token: localStorage.access_token,
      },
    });
    cb(true);
    Swal.fire("Edit Product", results.data.message, "success");
  } catch (err) {
    if (err.response.status === 500) {
      Swal.fire(
        "Error!",
        err.response.data.error.errors[0].original.validatorArgs[0].message,
        "error"
      );
    } else {
      Swal.fire("Error!", err.response.data.message, "error");
    }
  }
};
const editProductWithImage = async (productId, form, cb) => {
  try {
    let results = await axios({
      method: "PUT",
      url: URL + "edit/image/" + productId,
      data: form,
      headers: {
        "Content-Type": "multipart/form-data",
        access_token: localStorage.access_token,
      },
    });
    cb(true);
    Swal.fire("Edit Product", results.data.message, "success");
  } catch (err) {
    if (err.response.status === 500) {
      Swal.fire(
        "Error!",
        err.response.data.error.errors[0].original.validatorArgs[0].message,
        "error"
      );
    } else {
      Swal.fire("Error!", err.response.data.message, "error");
    }
  }
};

const getShow = async (productId, form, cb) => {
  try {
    let results = await axios({
      method: "PUT",
      url: URL + "show/" + productId,
      data: form,
      headers: {
        access_token: localStorage.access_token,
      },
    });
    cb(results.data);

    Swal.fire("status has been changed", results.data.message, "success");
  } catch (err) {
    if (err.response.status === 500) {
      Swal.fire(
        "Error!",
        err.response.data.error.errors[0].original.validatorArgs[0].message,
        "error"
      );
    } else {
      Swal.fire("Error!", err.response.data.message, "error");
    }
  }
};

const deleteProduct = async (productId, cb) => {
  try {
    let results = await axios({
      method: "GET",
      url: URL + "delete/" + productId,
      headers: {
        access_token: localStorage.access_token,
      },
    });
    cb(results.data);

    Swal.fire("product has been deleted", results.data.message, "success");
  } catch (err) {
    if (err.response.status === 500) {
      Swal.fire(
        "Error!",
        err.response.data.error.errors[0].original.validatorArgs[0].message,
        "error"
      );
    } else {
      Swal.fire("Error!", err.response.data.message, "error");
    }
  }
};

const getProvinces = async (cb) => {
  try {
    let results = await axios({
      method: "GET",
      url:
        config.baseUrlBinderByte +
        "/provinsi?api_key=" +
        config.apiKeyBinderByte,
    });
    cb(results.data.value);
  } catch (err) {
    if (err.response.status === 500) {
      Swal.fire(
        "Error!",
        err.response.data.error.errors[0].original.validatorArgs[0].message,
        "error"
      );
    } else {
      Swal.fire("Error!", err.response.data.message, "error");
    }
  }
};

const getCities = async (idProvince, cb) => {
  try {
    let results = await axios({
      method: "GET",
      url:
        config.baseUrlBinderByte +
        "/kabupaten?api_key=" +
        config.apiKeyBinderByte +
        "&id_provinsi=" +
        idProvince,
    });
    cb(results.data.value);
  } catch (err) {
    if (err.response.status === 500) {
      Swal.fire(
        "Error!",
        err.response.data.error.errors[0].original.validatorArgs[0].message,
        "error"
      );
    } else {
      Swal.fire("Error!", err.response.data.message, "error");
    }
  }
};

export {
  getProducts,
  getDetailProduct,
  addProduct,
  editProduct,
  editProductWithImage,
  getShow,
  deleteProduct,
  getProvinces,
  getCities,
};
