import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { loginUser } from '../../axios/accountAxios';
import { images } from '../../images';

const Login = (props) => {
    const [form, setForm] = useState({
        key: "",
        password: "",
    }) 

    const { loginCbHandler } = props;

    const loginHandler = (result) => {
        loginCbHandler(result)
    };

    const navigation = useNavigate();

    const submitHandler = () => {
        loginUser(form, (user) => {
            if (user.status) {
                loginHandler(user);
                navigation("/");
            }
        });
    }
    // console.log(submitHandler())

    return (
        <>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-lg-5 col-md-7">
                        <div className="card shadow-lg border-0 rounded-lg mt-5">
                            <div className="card-header">
                                <h3 className="font-weight-light my-4 mx-3">
                                <img src={images.logo} style={{ width: "110px" }} className='me-5' alt=''></img>
                                    Login
                                </h3>
                            </div>
                            <div className="card-body">
                                <form>
                                    <div className="form-floating mb-3">
                                        <input
                                            className="form-control"
                                            id="username"
                                            type="text"
                                            placeholder='Email or Username'
                                            value={form.key}
                                            onChange={(e) => setForm({ ...form, key: e.target.value })}
                                        />
                                        <label htmlFor="username">Email or Username</label>
                                    </div>
                                    <div className="form-floating mb-3">
                                        <input
                                            className="form-control"
                                            id="password"
                                            type="password"
                                            placeholder="Password"
                                            value={form.password}
                                            onChange={(e) => setForm({ ...form, password: e.target.value })}
                                        />
                                        <label htmlFor="password">Password</label>
                                    </div>
                                    <div className="form-check mb-3">
                                        <input className="form-check-input" id="rememberPasswordCheck" type="checkbox" value="" />
                                        <label className="form-check-label" htmlFor="rememberPasswordCheck">Remember Password</label>
                                    </div>
                                    <div className="d-flex align-items-center justify-content-center mt-4 mb-0">
                                        <Link className="btn btn-outline-primary" type="submit" onClick={() => submitHandler()}>Login</Link>
                                    </div>
                                    <p className="text-center">
                                        Don't have Account?
                                        <Link
                                            className="link-primary text-decoration-none ms-2"
                                            to="/cms/register"
                                        >
                                            Register
                                        </Link>
                                    </p>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}


export default Login