import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import { Login, Register } from "../pages";
const Account = (props) => {
  const { loginCbHandler } = props;
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={<Login loginCbHandler={loginCbHandler}></Login>}
        ></Route>
        <Route path="cms/register" element={<Register></Register>}></Route>
      </Routes>
    </>
  );
};

export default Account;
