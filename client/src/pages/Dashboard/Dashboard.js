import React, { useEffect, useState } from "react";
import { getHomeData } from "../../axios/homeAxios";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [clicked, setClicked] = useState(false);
  const [dashboard, setDashboard] = useState([]);

  const handleClick = () => {
    setClicked((clicked) => !clicked);
  };

  useEffect(() => {
    getHomeData((result) => {
      setDashboard(result);
    });
  }, []);
  return (
    <>
      <div className="row row-cols-4">
        <div className="p-2">
          <div
            className="card  text-white"
            style={{
              maxWidth: "250px",
              backgroundColor: "#29CC39",
              borderColor: "#FFFF",
            }}
          >
            <div className="card-body">
              <h6 className="text-left">All Product</h6>
              <h4 className="text-center my-4">{dashboard.countProduct}</h4>
            </div>
          </div>
        </div>
        <Link className="p-2 text-decoration-none" to={"orders/new"}>
          <div
            className="card text-white"
            style={{
              maxWidth: "250px",
              backgroundColor: "#8833FF",
              borderColor: "#FFFF",
            }}
          >
            <div className="card-body">
              <h6 className="text-left">New Order</h6>
              <h4 className="text-center my-4">{dashboard.countNewOrder}</h4>
            </div>
          </div>
        </Link>
        <div className="p-2">
          <div
            className="card  text-white"
            style={{
              maxWidth: "250px",
              backgroundColor: "#FF6633",
              borderColor: "#FFFF",
            }}
          >
            <div className="card-body">
              <h6 className="text-left">Profile Seen</h6>
              <h4 className="text-center my-4">
                {dashboard.countVisitAccount}
              </h4>
            </div>
          </div>
        </div>
        <Link className="p-2 text-decoration-none" onClick={handleClick}>
          {clicked ? true : false}
          <div
            className="card  text-white"
            style={{
              maxWidth: "250px",
              backgroundColor: "#33BFFF",
              borderColor: "#FFFF",
            }}
          >
            <div className="card-body">
              <h6 className="text-left">Product Seen</h6>
              <h4 className="text-center my-4">
                {dashboard.countVisitProduct}
              </h4>
            </div>
          </div>
        </Link>
      </div>
      {clicked === true ? (
        <>
          <div className="my-2">ListProduct</div>
          <>
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">No</th>
                  <th scope="col">Product</th>
                  <th scope="col">Seen</th>
                </tr>
              </thead>
              <tbody className="table-group-divider">
                {dashboard.dataVisitProduct.map((item, index) => (
                  <tr key={index}>
                    <th scope="row">{index + 1}</th>
                    <td>{item.name}</td>
                    <td>{item.countVisit}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        </>
      ) : null}
    </>
  );
};

export default Dashboard;
