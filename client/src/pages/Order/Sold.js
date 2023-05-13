import React from 'react'
import { images } from '../../images'
import { Link } from 'react-router-dom'

const Sold = () => {
    return ( 
        <>
            <div className="row row-cols-5">
                <Link className="p-2 text-decoration-none" to={'/orders'}>
                    <div className="card text-white" style={{ maxWidth: "150px", backgroundColor: "#29CC39", borderColor: "#FFFF" }}>
                        <div className="card-body">
                            <h6 className="text-center my-3">All Order</h6>
                        </div>
                    </div>
                </Link>
                <Link className="p-2 text-decoration-none" to={'/orders/new'}>
                    <div className="card text-white" style={{ maxWidth: "150px", backgroundColor: "#8833FF", borderColor: "#FFFF" }}>
                        <div className="card-body">
                            <h6 className="text-center my-3">New Order</h6>
                        </div>
                    </div>
                </Link>
                <Link className="p-2 text-decoration-none" to={'/orders/sold'}>
                    <div className="card text-white" style={{ maxWidth: "150px", backgroundColor: "#FF6633", borderColor: "#FFFF" }}>
                        <div className="card-body">
                            <h6 className="text-center my-3">Sold</h6>
                        </div>
                    </div>
                </Link>
                <Link className="p-2 text-decoration-none" to={'/orders/reject'}>
                    <div className="card  text-white" style={{ maxWidth: "150px", backgroundColor: "#33BFFF", borderColor: "#FFFF" }}>
                        <div className="card-body">
                            <h6 className="text-center my-3">Rejected</h6>
                        </div>
                    </div>
                </Link>
                <Link className="p-2 text-decoration-none" to={'/orders/cancel'}>
                    <div className="card  text-white" style={{ maxWidth: "150px", backgroundColor: "#272629", borderColor: "#FFFF" }}>
                        <div className="card-body">
                            <h6 className="text-center my-3">Cancel</h6>
                        </div>
                    </div>
                </Link>
            </div>
            <h5 className='my-3'>Sold</h5>
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
                            <h5 className='btn btn-sm btn-light my-5'>10</h5>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Sold