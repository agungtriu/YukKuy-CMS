import axios from "axios";
import Swal from "sweetalert2";
import RupiahFormatter from "../helpers/RupiahFormatter";

const config = require("../config/config");
const baseUrl = config.baseUrl;

const URL = baseUrl + "/withdraws";

const getWithdraws = async (status, cb) => {
  try {
    let result;
    if (status === undefined) {
      result = await axios({
        method: "GET",
        url: URL,
        headers: {
          access_token: localStorage.access_token,
        },
      });
    } else {
      result = await axios({
        method: "GET",
        url: URL + "?status=" + status,
        headers: {
          access_token: localStorage.access_token,
        },
      });
    }
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

const addWithdraw = async (form, cb) => {
  try {
    if (form.bankId === 0) {
      Swal.fire("Withdraw", "Please select bank account", "warning");
      return;
    }
    if (form.amount === 0) {
      Swal.fire("Withdraw", "Amount cannot be 0", "warning");
      return;
    }
    let result = await axios({
      method: "POST",
      url: URL + "/add",
      data: form,
      headers: {
        access_token: localStorage.access_token,
      },
    });
    cb(true);
    Swal.fire("Withdraw", result.data.message, "success");
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

const processWithdraw = async (withdrawId, cb) => {
  try {
    let result = await axios({
      method: "GET",
      url: URL + "/process/" + withdrawId,
      headers: {
        access_token: localStorage.access_token,
      },
    });
    cb(true);
    Swal.fire("Withdraw", result.data.message, "success");
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

const acceptWithdraw = async (data, cb) => {
  try {
    Swal.fire({
      title: `Have you transferred ${RupiahFormatter(data.amount)} to ${
        data.bank.bank
      } - ${data.bank.number} an ${data.bank.name} ?`,
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#19a463",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then(async (result) => {
      if (result.isConfirmed) {
        let result = await axios({
          method: "GET",
          url: URL + "/accept/" + data.id,
          headers: {
            access_token: localStorage.access_token,
          },
        });
        cb(true);
        Swal.fire("Withdraw", result.data.message, "success");
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

const rejectWithdraw = async (withdrawId, reason, cb) => {
  try {
    let result = await axios({
      method: "PUT",
      url: URL + "/reject/" + withdrawId,
      data: reason,
      headers: {
        access_token: localStorage.access_token,
      },
    });
    cb(true);
    Swal.fire("Withdraw", result.data.message, "success");
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

const deleteWithdraw = async (id, cb) => {
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
          url: URL + "/delete/" + id,
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

export {
  getWithdraws,
  addWithdraw,
  processWithdraw,
  acceptWithdraw,
  rejectWithdraw,
  deleteWithdraw,
};
