import axios from "axios";
import Swal from "sweetalert2";

const config = require("../config/config");
const baseUrl = config.baseUrl;

const URL = baseUrl + "/accounts/banks/";


const getBanks = async (accountId, cb) => {
  try {
    let result = await axios({
      method: "GET",
      url: URL + accountId,
      headers: {
        access_token: localStorage.access_token,
      },
    });
    cb(result.data.data);
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

const editBanks = async (bankId, form, cb) => {
  try {
    let result = await axios({
      method: "PUT",
      url: URL + "edit/" + bankId,
      data: form,
      headers: {
        access_token: localStorage.access_token,
      },
    });
    cb(true);
    Swal.fire("Edit Bank", result.data.message, "success");
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

const addBanks = async (form, cb) => {
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
    Swal.fire("Add Bank", result.data.message, "success");
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

const deleteBank = async (id, cb) => {
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

export { getBanks, deleteBank, addBanks, editBanks };
