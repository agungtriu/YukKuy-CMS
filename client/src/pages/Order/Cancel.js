import React from 'react'
import { images } from '../../images'
import { Link } from 'react-router-dom'
import Navbar from '../../components/Navbar'

const Cancel = () => {
    return ( 
        <>
            <Navbar></Navbar>
            <h5 className='my-3'>Cancel</h5>
            <div class="card mb-2 border-0 shadow">
                <div class="card-body">
                    <img className='rounded-3 float-start me-3' style={{ height: "110px", width: "230px" }} src={images.komodo} alt=''></img>
                    <div className='row'>
                        <div className='col-sm-8'>
                            <h5 class="card-title">Komodo Island</h5>
                            <h6 class="card-text">by: Ayo Tour</h6>
                            <p className='card-text my-2'>Date : 12-May-2023 09.00AM</p>
                            <h7 className='my-5'>Stock: 8</h7>
                            <span className='mx-5'>Price: IDR. 8.000.000/pax</span>
                        </div>
                        <div className='col-sm-4'>
                            <p className='position-absolute top-0 end-0 mx-1'>Status</p>
                            <button className='btn btn-sm btn-light my-5'>Receipt</button>
                            <button className='btn btn-sm btn-light my-5'>Verification</button>
                            <button className='btn btn-sm btn-light my-5'>Reject</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Cancel