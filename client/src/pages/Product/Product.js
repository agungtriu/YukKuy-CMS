import React, { useEffect, useState } from 'react'
import { images } from '../../images'
import { Link } from 'react-router-dom'
import { getProducts } from '../../axios/productAxios'

const Product = () => {
    const [products, setProducts] = useState({})
    useEffect(() => {
        getProducts((result) => {
            setProducts(result)
        })
    }, [])
    return ( 
        <>
            <h5>Product</h5>
            <Link className=' card position-absolute top-0 end-0 mx-1 btn btn-outline-secondary text-black text-decoration-none' to={'/products/add'}>Add Product</Link>
            <div className="card mb-3 border-0 shadow" key={products.accountId}>
                <div className="card-body">
                    <img className='rounded-3 float-start me-3' style={{ height: "110px", width: "230px" }} src={images.komodo} alt='' ></img>
                    <div className='row'>
                        <div className='col-sm-8'>
                            <h5 className="card-title">Komodo Island</h5>
                            <h6 className="card-text">by: Ayo Tour</h6>
                            <p className='card-text my-2'>Date : 12-May-2023 09.00AM</p>
                            <text className='my-5'>Stock: 8</text>
                            <span className='mx-5'>Price: IDR. 8.000.000/pax</span>
                        </div>
                        <div className='col-sm-4'>
                            <p className='position-absolute top-0 end-0 mx-1'>Status</p>
                            <Link
                                className='btn btn-sm btn-light mx-2 my-5 text-decoration-none'
                                to={'/products/edit'}
                            >Edit</Link>
                            <button className='btn btn-sm btn-light mx-2 my-5'>Delete</button>
                            <button className='btn btn-sm btn-light mx-2 my-5'>Hide</button>
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}

export default Product