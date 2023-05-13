import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import ListProduct from './ListProduct'
import { getHomeData } from '../../axios/homeAxios'

const Home = () => {
    const [clicked, setClicked] = useState(false)
    const [dashboard, setDashboard] = useState([])

    const handleClick = () => {
        setClicked(clicked => !clicked)
    }

    useEffect(() => {
      getHomeData((result) => {
        setDashboard(result) 
      })
    }, [])
    // console.log(dashboard)
    return (
        <>
            <div className="row row-cols-4">
                <div className="p-2">
                    <div className="card  text-white" style={{ maxWidth: "250px", backgroundColor: "#29CC39", borderColor: "#FFFF" }}>
                        <div className="card-body">
                            <h6 className="text-left">All Product</h6>
                            <h4 className="text-center my-4">{dashboard.countProduct}</h4>
                        </div>
                    </div>
                </div>
                <div className="p-2">
                    <div className="card text-white" style={{ maxWidth: "250px", backgroundColor: "#8833FF", borderColor: "#FFFF" }}>
                        <div className="card-body">
                            <h6 className="text-left">New Product</h6>
                            <h4 className="text-center my-4">{dashboard.countNewOrder}</h4>
                        </div>
                    </div>
                </div>
                <div className="p-2">
                    <div className="card  text-white" style={{ maxWidth: "250px", backgroundColor: "#FF6633", borderColor: "#FFFF" }}>
                        <div className="card-body">
                            <h6 className="text-left">Profile Seen</h6>
                            <h4 className="text-center my-4">{dashboard.countVisitAccount}</h4>
                        </div>
                    </div>
                </div>
                <div className="p-2 text-white" onClick={handleClick}>{clicked ? true : false}
                    <div className="card  text-white" style={{ maxWidth: "250px", backgroundColor: "#33BFFF", borderColor: "#FFFF" }}>
                        <div className="card-body">
                            <h6 className="text-left">Product Seen</h6>
                            <h4 className="text-center my-4">{dashboard.countVisitProduct}</h4>
                        </div>
                    </div>
                </div>
            </div>
            {
                clicked === true ? (
                    <ListProduct></ListProduct>
                ) : null
            }
        </>
    )
}

export default Home