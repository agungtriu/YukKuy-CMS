import React, { useState } from 'react'
import { images } from '../../images'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'
import Navbar from '../../components/Navbar'

const Order = () => {
 

    const verificationHandler = () => {
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: 'btn btn-success',
                cancelButton: 'btn btn-danger'
            },
            buttonsStyling: false
        })

        swalWithBootstrapButtons.fire({
            imageUrl: images.komodo,
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            // icon: 'warning',
            confirmButtonText: 'Verification',
            showCancelButton: true,
            cancelButtonText: 'Reject',
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                swalWithBootstrapButtons.fire(
                    'Sold!',
                    'Your Order has been Sold.',
                    'success'
                )
            } else if (
                /* Read more about handling dismissals below */
                result.dismiss === Swal.DismissReason.cancel
            ) {
                swalWithBootstrapButtons.fire(
                    'Rejected',
                    'Your Order has been Rejected',
                    'error'
                )
            }
        })

    }
    return (
        <>
            <Navbar></Navbar>
            <h5 className='my-3'>AllOrder</h5>
            <div className="card mb-2 border-0 shadow">
                <div className="card-body">
                    <img className='rounded-3 float-start me-3' style={{ height: "110px", width: "230px" }} src={images.komodo} alt=''></img>
                    <div className='row'>
                        <div className='col-sm-8'>
                            <h5 className="card-title">Komodo Island</h5>
                            <h6 className="card-text">by: Ayo Tour</h6>
                            <p className='card-text my-2'>Date : 12-May-2023 09.00AM</p>
                            <span className='my-5'>Stock: 8</span>
                            <span className='mx-5'>Price: IDR. 8.000.000/pax</span>
                        </div>
                        <div className='col-sm-4'>
                            <p className='position-absolute top-0 end-0 mx-1'>Status</p>
                            <Link
                                className='btn btn-sm btn-light my-5'
                                onClick={verificationHandler}
                            >Receipt
                            </Link>
                            <button className='btn btn-sm btn-light my-5'>Verification</button>
                            <button className='btn btn-sm btn-light my-5'>Reject</button>
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}

export default Order