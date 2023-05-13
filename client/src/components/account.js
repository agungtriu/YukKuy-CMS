import React from 'react'
import { Routes, Route, Link } from "react-router-dom";
import { Login,Register } from '../pages';
const Account = (props) => {
    const { loginCbHandler } = props;
    return (
        <>
        {/* <Link className='btn btn-sm btn-outline-success' to={'cms/login'}> login </Link>
        <Link className='btn btn-sm btn-outline-success' to={'cms/register'}> Register </Link> */}
        <Routes>
            <Route path='/' element={<Login loginCbHandler={loginCbHandler}></Login>}></Route>
            <Route path='cms/register' element={<Register></Register>}></Route>
        </Routes>
        </>
    )
} 

export default Account