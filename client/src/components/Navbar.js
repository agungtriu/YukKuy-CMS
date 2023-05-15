import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
    return (
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
    )
}

export default Navbar