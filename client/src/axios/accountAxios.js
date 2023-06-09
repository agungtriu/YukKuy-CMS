import axios from "axios";
import Swal from "sweetalert2";
const config = require("../config/config");
const baseUrl = config.baseUrl;

const URL = baseUrl + "/accounts/";

const loginUser = async (user, cb) => {
  if (user.key === "") {
    Swal.fire("Login", "Username can not be empty.", "error");
  } else if (user.password === "") {
    Swal.fire("Login", "Password can not be empty.", "error");
  } else {
    try {
      let users = await axios({
        method: "POST",
        url: URL + "cms/login",
        data: user,
      });
      Swal.fire("Login", users.data.message, "success");
      localStorage.setItem("access_token", users.data.data.access_token);
      localStorage.setItem("id", users.data.data.id);
      localStorage.setItem("username", users.data.data.username);
      localStorage.setItem("role", users.data.data.role);
      localStorage.setItem("avatar", users.data.data.avatar);
      cb({ status: true, data: users.data.data });
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
  }
};

const registerUser = async (user, cb) => {
  try {
    if (user.username === "") {
      Swal.fire("Login", "Username can not be empty.", "error");
    } else if (user.username.includes(" ")) {
      Swal.fire("Login", "Invalid username format", "error");
    } else if (user.name === "") {
      Swal.fire("Login", "Name can not be empty.", "error");
    } else if (user.email === "") {
      Swal.fire("Login", "Email can not be empty.", "error");
    } else if (user.password === "") {
      Swal.fire("Login", "Password can not be empty.", "error");
    } else if (user.confirmPassword === "") {
      Swal.fire("Login", "Confirm Password can not be empty.", "error");
    } else {
      let users = await axios({
        method: "POST",
        url: URL + "cms/register",
        data: user,
      });
      Swal.fire("Register", users.data.message, "success");
      cb(true);
    }
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
const getAccountByUsername = async (username, cb) => {
  try {
    let results = await axios({
      method: "GET",
      url: URL + username,
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

const editProfile = async (form, cb) => {
  try {
    let results = await axios({
      method: "PUT",
      url: URL + "edit/profile",
      data: form,
      headers: {
        access_token: localStorage.access_token,
      },
    });
    cb(true);
    localStorage.setItem("username", form.username);
    Swal.fire("Edit Profile", results.data.message, "success");
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

const editAvatar = async (image, cb) => {
  try {
    let results = await axios({
      method: "PUT",
      url: URL + "edit/avatar",
      data: image,
      headers: {
        "Content-Type": "multipart/form-data",
        access_token: localStorage.access_token,
      },
    });
    cb(true, results.data.data.image);
    localStorage.setItem("avatar", results.data.data.image);
    Swal.fire("Edit Avatar", results.data.message, "success");
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
const editPassword = async (data, cb) => {
  try {
    let results = await axios({
      method: "PUT",
      url: URL + "edit/password",
      data: data,
      headers: {
        access_token: localStorage.access_token,
      },
    });
    cb(true);
    Swal.fire("Edit Password", results.data.message, "success");
  } catch (error) {
    if (error.response.status === 500) {
      Swal.fire(
        "Error!",
        error.response.data.error.errors[0].original.validatorArgs[0].message,
        "error"
      );
    } else {
      Swal.fire("Error!", error.response.data.message, "error");
    }
  }
};
const editBanner = async (image, cb) => {
  try {
    let results = await axios({
      method: "PUT",
      url: URL + "edit/banner",
      data: image,
      headers: {
        "Content-Type": "multipart/form-data",
        access_token: localStorage.access_token,
      },
    });
    cb(true, results.data.data.image);
    localStorage.setItem("image", results.data.data.image);
    Swal.fire("Edit Banner", results.data.message, "success");
  } catch (err) {
    if (err.response.data === 500) {
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

const getAccounts = async (cb) => {
  try {
    const accountResponses = await axios({
      method: "GET",
      url: URL,
    });
    cb(accountResponses.data.data);
  } catch (error) {
    if (error.response.data === 500) {
      Swal.fire(
        "Error!",
        error.response.data.error.errors[0].original.validatorArgs[0].message,
        "error"
      );
    } else {
      Swal.fire("Error!", error.response.data.message, "error");
    }
  }
};

const changeRole = async (id, role, cb) => {
  try {
    const accountResponses = await axios({
      method: "GET",
      url: URL + `role/${role}?id=${id}`,
    });
    cb(true);
    Swal.fire("Account", accountResponses.data.message, "success");
  } catch (error) {
    if (error.response.data === 500) {
      Swal.fire(
        "Error!",
        error.response.data.error.errors[0].original.validatorArgs[0].message,
        "error"
      );
    } else {
      Swal.fire("Error!", error.response.data.message, "error");
    }
  }
};

const deleteAccount = async (id, cb) => {
  try {
    const accountResponses = await axios({
      method: "GET",
      url: URL + "delete?id=" + id,
    });
    cb(true);
    Swal.fire("Account", accountResponses.data.message, "success");
  } catch (error) {
    if (error.response.data === 500) {
      Swal.fire(
        "Error!",
        error.response.data.error.errors[0].original.validatorArgs[0].message,
        "error"
      );
    } else {
      Swal.fire("Error!", error.response.data.message, "error");
    }
  }
};

export {
  loginUser,
  registerUser,
  getAccountByUsername,
  editProfile,
  editAvatar,
  editPassword,
  editBanner,
  getAccounts,
  changeRole,
  deleteAccount,
};
