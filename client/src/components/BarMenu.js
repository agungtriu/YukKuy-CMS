import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Swal from "sweetalert2";
import { Link } from 'react-router-dom';
import { images } from '../images';
import { imageUrl } from '../config/config';


const BarMenu = (props) => {
    const { loginStatus, loginCbHandler } = props
    const logoutHandler = () => {
        localStorage.clear();
        loginCbHandler({ status: false, data: {} });
        Swal.fire("Logout", "logout successful", "success");
    };
    return ( 
        <>
            <nav className="navbar navbar-expand-lg bg-body-tertiary my-3 shadow-sm" style={{ bcolor: 'Highlight' }} >
                <div className="container-fluid">
                    <a className="navbar-brand" href="/">
                        <img src={images.logo} alt='' style={{width: "120px"}} />
                    </a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                        <form className="mx-auto">
                            {/* <input className="form-control rounded-pill" type="search" placeholder="Search" aria-label="Search" /> */}
                        </form>
                        <div className="dropdown">
                            <a className="link-dark dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false" href='/'>
                                <img className='rounded-circle avatar-mini' src={`${imageUrl}${loginStatus.data.avatar}`} alt=''></img>
                            </a>
                            <ul className="dropdown-menu">
                                <li><Link className="dropdown-item" to={'/profile'}>My Profile</Link></li>
                                <li><Link className="dropdown-item" to={'/'} onClick={() => logoutHandler()}> Logout </Link></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default BarMenu