import axios from "axios";
import Swal from "sweetalert2";

const config = require("../config/config");
const baseUrl = config.baseUrl;

const URL = baseUrl + "/accounts/socialAccounts/";

const getSosmed = async (id, cb) => {
  try {
    let result = await axios({
      method: "GET",
      url: URL + id,
      headers: {
        access_token: localStorage.access_token,
      },
    });
    cb(result.data);
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

const editSosmed = async (id, form, cb) => {
  try {
    let result = await axios({
      method: "PUT",
      url: URL + "edit/" + id,
      data: form,
      headers: {
        access_token: localStorage.access_token,
      },
    });
    cb(true);
    Swal.fire("Edit Sosmed" + id, result.data.message, "success");
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

const addSosmed = async (form, cb) => {
  try {
    let result = await axios({
      method: "POST",
      url: URL + "add",
      data: form,
      headers: {
        access_token: localStorage.access_token,
      },
    });
    cb(true);
    Swal.fire("Add Sosmed", result.data.message, "success");
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

const deleteSosmed = async (id, cb) => {
  try {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        let result = await axios({
          method: "GET",
          url: URL + "delete/" + id,
          headers: {
            access_token: localStorage.access_token,
          },
        });
        cb(true);
        Swal.fire("Deleted!", `${result.data.message}`, "success");
      }
    });
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

export { getSosmed, addSosmed, editSosmed, deleteSosmed };
