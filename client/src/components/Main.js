import React from "react";
import { Routes, Route } from "react-router-dom";
import {
  Cancel,
  EditAvatar,
  EditBanner,
  EditPassword,
  EditProduct,
  EditProfile,
  FormProduct,
  Home,
  NewOrder,
  Order,
  Product,
  Profile,
  Rejected,
  Sold,
} from "../pages";

const Main = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home></Home>}></Route>
        <Route path="orders" element={<Order></Order>}></Route>
        <Route path="orders">
          <Route path="new" element={<NewOrder></NewOrder>}></Route>
          <Route path="sold" element={<Sold></Sold>}></Route>
          <Route path="reject" element={<Rejected></Rejected>}></Route>
          <Route path="cancel" element={<Cancel></Cancel>}></Route>
        </Route>
        <Route path="/products" element={<Product></Product>}></Route>
        <Route path="products">
          <Route path="add" element={<FormProduct></FormProduct>}></Route>
          <Route
            path="edit/:productId"
            element={<EditProduct></EditProduct>}
          ></Route>
        </Route>
        <Route path="/profile" element={<Profile></Profile>}></Route>
        <Route path="/profile">
          <Route
            path="edit/profile"
            element={<EditProfile></EditProfile>}
          ></Route>
          <Route
            path="edit/password"
            element={<EditPassword></EditPassword>}
          ></Route>
          <Route path="edit/avatar" element={<EditAvatar></EditAvatar>}></Route>
          <Route path="edit/banner" element={<EditBanner></EditBanner>}></Route>
        </Route>
      </Routes>
    </>
  );
};

export default Main;
