import axios from "axios";
import Swal from "sweetalert2";
const config = require("../config/config");
const baseUrl = config.baseUrl;

const URL = baseUrl + "/products"

const getProducts = async (cb) => {
    try {
        let results = await axios({
            method: "GET",
            url: URL + "/cms",
            headers: {
                access_token: localStorage.access_token
            }
        }) 
        cb(results.data)

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

const addProduct = async (form, cb) => {
    try {
        let results = await axios({
            method: "POST",
            url: URL + "add",
            data: form,
            headers: {
                "Content-Type": "multipart/form-data",
                access_token: localStorage.access_token
            }
        });
        cb(true)
        Swal.fire("Add Tutorial", results.data.message, "success");
    } catch (err) {
        // if (err.response.status === 500) {
        //     Swal.fire(
        //         "Error!",
        //         err.response.data.error.errors[0].original.validatorArgs[0].message,
        //         "error"
        //     );
        // } else {
        //     Swal.fire("Error!", err.response.data.message, "error");
        // }
        console.log(err)
    }

}

const getDetailProduct = async (productId, cb) => {
    try {
        let results = await axios({
            method: "GET",
            url: URL + productId,
        })
        cb(results.data)
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

const editProduct = async (productId, form, cb) => {
    try {
        let results = await axios({
            method: "PUT",
            url: URL + "edit/" + productId,
            data: form,
            headers: {
                "Content-Type": "multipart/form-data",
                access_token: localStorage.access_token,
            }
        });
        cb(true)
        Swal.fire("Add Tutorial", results.data.message, "success");
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

export {
    getProducts,getDetailProduct,addProduct,editProduct
}