import React from "react";
import { Routes, Route } from "react-router-dom";
import {
  Withdraws,
  EditAvatar,
  EditBanner,
  EditPassword,
  EditProduct,
  FormProduct,
  Dashboard,
  Orders,
  Products,
  Profile,
  Success,
  Bank,
  Guide,
  Accounts,
} from "../pages";

const MainContent = (props) => {
  const { avatarCbHandler } = props;
  return (
    <>
      <Routes>
        <Route path="/" element={<Dashboard></Dashboard>}></Route>
        <Route path="withdraws" element={<Withdraws></Withdraws>}></Route>
        <Route path="withdraws">
          <Route
            path="request"
            element={<Withdraws status={"request"}></Withdraws>}
          ></Route>
          <Route
            path="process"
            element={<Withdraws status={"process"}></Withdraws>}
          ></Route>
          <Route
            path="success"
            element={<Withdraws status={"success"}></Withdraws>}
          ></Route>
          <Route
            path="reject"
            element={<Withdraws status={"reject"}></Withdraws>}
          ></Route>
        </Route>

        <Route path="orders" element={<Orders status={""}></Orders>}></Route>
        <Route path="orders">
          <Route
            path="payment"
            element={<Orders status={"payment"}></Orders>}
          ></Route>
          <Route path="success" element={<Success></Success>}></Route>
          <Route
            path="reject"
            element={<Orders status={"reject"}></Orders>}
          ></Route>
          <Route
            path="cancel"
            element={<Orders status={"cancel"}></Orders>}
          ></Route>
        </Route>
        <Route path="/products" element={<Products></Products>}></Route>
        <Route path="products">
          <Route path="add" element={<FormProduct></FormProduct>}></Route>
          <Route
            path="edit/:productId"
            element={<EditProduct></EditProduct>}
          ></Route>
        </Route>
        <Route
          path="/profile"
          element={<Profile avatarCbHandler={avatarCbHandler}></Profile>}
        ></Route>
        <Route path="/profile">
          <Route
            path="edit/password"
            element={<EditPassword></EditPassword>}
          ></Route>
          <Route path="edit/avatar" element={<EditAvatar></EditAvatar>}></Route>
          <Route path="edit/banner" element={<EditBanner></EditBanner>}></Route>
        </Route>
        <Route path="bank" element={<Bank></Bank>}></Route>
        <Route path="guide" element={<Guide></Guide>}></Route>
        <Route path="accounts" element={<Accounts></Accounts>}></Route>
        <Route path="accounts">
          <Route
            path="admin"
            element={<Accounts status={"admin"}></Accounts>}
          ></Route>
          <Route
            path="seller"
            element={<Accounts status={"seller"}></Accounts>}
          ></Route>
          <Route
            path="customer"
            element={<Accounts status={"customer"}></Accounts>}
          ></Route>
        </Route>
      </Routes>
    </>
  );
};

export default MainContent;
