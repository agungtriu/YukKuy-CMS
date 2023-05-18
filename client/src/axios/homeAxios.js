import axios from "axios";
import Swal from "sweetalert2";
const config = require("../config/config");
const baseUrl = config.baseUrl;

const URL = baseUrl;

const getHomeData = async (startDate, endDate, cb) => {
  try {
    let results = await axios({
      method: "GET",
      url: URL + "/cms?startDate=" + startDate + "&endDate=" + endDate,
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

const getHomeFilter = async (start, end) => {
  try {
  } catch (err) {}
};

export { getHomeData, getHomeFilter };
