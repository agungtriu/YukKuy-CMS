import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getProducts } from '../../axios/productAxios'

const Product = () => {
    const [products, setProducts] = useState([])
    useEffect(() => {
        getProducts((result) => {
            setProducts(result.data)
        })
    }, [])
    //    let value = products.data.map((item)=>{
    //         return item.name
    //     })
    console.log(products.map(item =>item.imageProducts.map(image => image.id)  ))
    return (
        <>
            <h5>Product</h5>
            <Link className=' card position-absolute top-0 end-0 mx-1 btn btn-outline-secondary text-black text-decoration-none' to={'/products/add'}>Add Product</Link>
            {
                products === null ?
                    <div>No Product Update</div> :
                    products.map((item,index) =>
                        <div className="card mb-3 border-0 shadow" key={index}>
                            <div className="card-body">
                                <img className='rounded-3 float-start me-3' style={{ height: "110px", width: "230px" }} src={item.imageProducts.map(image => image.src)} alt='' key={item.imageProducts.map(image => image.id)} ></img>
                                <div className='row'>
                                    <div className='col-sm-8'>
                                        <h5 className="card-title">{item.name}</h5>
                                        <h6 className="card-text">by: {item.accountId}</h6>
                                        <p className='card-text my-2'>Date: {item.dateStart}</p>
                                        <span className='my-5'>Stock:{item.guideId}</span>
                                        <span className='mx-5'>Price: IDR. {item.price}/pax</span>
                                    </div>
                                    <div className='col-sm-4'>
                                        <p className='position-absolute top-0 end-0 mx-1'>{item.isLive===1 ? "Available" : "Sold"}</p>
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
                    )
            }
        </>

    )
}

export default Product