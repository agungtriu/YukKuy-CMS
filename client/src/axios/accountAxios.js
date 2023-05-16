import axios from "axios";
import Swal from "sweetalert2";
const config = require("../config/config");
const baseUrl = config.baseUrl;

const URL = baseUrl + "/accounts/";

const loginUser = async (user, cb) => {
  if (user.username === "") {
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
      localStorage.setItem("avatar", users.data.data.avatar);
      cb({ status: true, data: users.data.data });
    } catch (err) {
      if (err.response.status === 500) {
        Swal.fire(
          "Error!",
          err.response.data.err.errors[0].original.validatorArgs[0].message,
          "error"
        );
      } else {
        Swal.fire("Error!", err.response.data.message, "error");
      }
      console.log(err);
    }
  }
};

const registerUser = async (user, cb) => {
  try {
    let users = await axios({
      method: "POST",
      url: URL + "cms/register",
      data: user,
    });
    Swal.fire("Register", users.data.message, "success");
    cb(true);
  } catch (err) {
    if (err.response.status === 500) {
      Swal.fire(
        "Error!",
        err.response.data.err.errors[0].original.validatorArgs[0].message,
        "error"
      );
    } else {
      Swal.fire("Error!", err.response.data.message, "error");
    }
    cb(false);
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
    localStorage.setItem("image", results.data.data.image);
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
    console.log(error);
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

export {
  loginUser,
  registerUser,
  getAccountByUsername,
  editProfile,
  editAvatar,
  editPassword,
};
