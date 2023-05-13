import axios from 'axios'
import Swal from "sweetalert2"
const config = require("../config/config")
const baseUrl = config.baseUrl;

const URL = baseUrl + "/accounts/cms/"; 

// const getUsersByUsername = async (username, cb) => {
//     try {
//         let users = await axios({
//             method: "GET",
//             url: URL + "seller/" + username
//         });
//         cb(users.data.data)
//     } catch (err) {
//         if (err.response.status === 500) {
//             Swal.fire(
//                 "Error!",
//                 err.response.data.err.errors[0].original.validatorArgs[0].message,
//                 "error"
//             );
//         } else {
//             Swal.fire("Error!", err.response.data.message, "error");
//         }
//     }

const loginUser = async (user, cb) => {
    if (user.username === "") {
        Swal.fire("Login", "Username can not be empty.", "error");
    } else if (user.password === "") {
        Swal.fire("Login", "Password can not be empty.", "error");
    } else {
        try {
            let users = await axios({
                method: "POST",
                url: URL + "login",
                data: user
            });
            Swal.fire("Login", users.data.message, "success");
            localStorage.setItem("access_token", users.data.data.access_token);
            localStorage.setItem("id", users.data.data.id);
            localStorage.setItem("username", users.data.data.username);
            localStorage.setItem("avatar", users.data.data.avatar);
            cb({ status: true, data: users.data.data });
        } catch (err) {
            // if (err.response.status === 500) {
            //     Swal.fire(
            //         "Error!",
            //         err.response.data.err.errors[0].original.validatorArgs[0].message,
            //         "error"
            //     );
            // } else {
            //     Swal.fire("Error!", err.response.data.message, "error");
            // }
            console.log(err)
        }
    }
}

const registerUser = async (user, cb) => {
    try {
        let users = await axios({
            method: "POST",
            url: URL + "register",
            data: user
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
}

export {
    loginUser,
    registerUser
}