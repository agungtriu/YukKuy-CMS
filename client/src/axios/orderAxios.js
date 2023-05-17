import axios from "axios";
import Swal from "sweetalert2";
const config = require("../config/config");
const baseUrl = config.baseUrl;

const URL = baseUrl + "/orders/";

const getOrders = async (cb) => {
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

const getOrdersByStatus = async (status, cb) => {
  try {
    let results = await axios({
      method: "GET",
      url: URL + "/cms?status=" + status,
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

const getBankById = async (bankId, cb) => {
  try {
    let results = await axios({
      method: "GET",
      url: baseUrl + "/accounts/banks/detail/" + bankId,
    });
    cb(results.data.data);
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

const acceptVerificationOrder = async (id, cb) => {
  try {
    let results = await axios({
      method: "PUT",
      url: URL + "/verifications/accept/" + id,
      headers: {
        access_token: localStorage.access_token,
      },
    });
    cb(results.data.status);
    Swal.fire("Accept Verification", results.data.message, "success");
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

const rejectVerificationOrder = async (id, reason, cb) => {
  try {
    let results = await axios({
      method: "PUT",
      url: URL + "/verifications/reject/" + id,
      data: reason,
      headers: {
        access_token: localStorage.access_token,
      },
    });
    cb(results.data.status);
    Swal.fire("Reject Verification", results.data.message, "success");
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
  getOrders,
  getOrdersByStatus,
  getBankById,
  acceptVerificationOrder,
  rejectVerificationOrder,
};
