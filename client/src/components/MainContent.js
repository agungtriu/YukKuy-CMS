import React from "react";
import { Routes, Route } from "react-router-dom";
import {
  Cancel,
  EditAvatar,
  EditBanner,
  EditPassword,
  EditProduct,
  FormProduct,
  Dashboard,
  NewOrder,
  Orders,
  Products,
  Profile,
  Rejected,
  Success,
  Bank,
  Guide,
} from "../pages";

const MainContent = (props) => {
  const { avatarCbHandler } = props;
  return (
    <>
      <Routes>
        <Route path="/" element={<Dashboard></Dashboard>}></Route>
        <Route path="orders" element={<Orders></Orders>}></Route>
        <Route path="orders">
          <Route path="new" element={<NewOrder></NewOrder>}></Route>
          <Route path="success" element={<Success></Success>}></Route>
          <Route path="reject" element={<Rejected></Rejected>}></Route>
          <Route path="cancel" element={<Cancel></Cancel>}></Route>
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
      </Routes>
    </>
  );
};

export default MainContent;
