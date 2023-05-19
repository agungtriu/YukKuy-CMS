import React, { useEffect, useRef, useState } from "react";
import { getHomeData } from "../../axios/homeAxios";
import { useNavigate } from "react-router-dom";
import { DateRange } from "react-date-range";
import { addDays, subDays } from "date-fns";
import { formatDate, readableDate } from "../../helpers/TimeFormat";
import ReactLoading from "react-loading";

const Dashboard = () => {
  const [clicked, setClicked] = useState(false);
  const [dashboard, setDashboard] = useState([]);
  const [done, setDone] = useState(false);

  const handleClick = (clicked) => {
    setClicked(!clicked);
  };
  const navigate = useNavigate();
  const clickHandler = (link) => {
    navigate(link);
  };
  useEffect(() => {
    setDone(false);
    getHomeData(
      formatDate(range[0].startDate),
      formatDate(addDays(range[0].endDate, 1)),
      (result) => {
        setDashboard(result);
        setDone(true);
      }
    );
  }, []);

  const [range, setRange] = useState([
    {
      startDate: subDays(new Date(), 7),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const [open, setOpen] = useState(false);

  const refOne = useRef(null);

  useEffect(() => {
    document.addEventListener("keydown", hideOnEscape, true);
    document.addEventListener("click", hideOnClickOutside, true);
  }, []);

  const hideOnEscape = (e) => {
    if (e.key === "Escape") {
      setOpen(false);
    }
  };

  const hideOnClickOutside = (e) => {
    if (refOne.current && !refOne.current.contains(e.target)) {
      setOpen(false);
    }
  };
  const changeHandler = (item) => {
    setDone(false);
    getHomeData(
      formatDate(addDays(item.startDate, 1)),
      formatDate(addDays(item.endDate, 2)),
      (result) => {
        setDashboard(result);
        setDone(true);
      }
    );
  };
  return (
    <>
      <div className="row">
        <h5 className="m-3 col">Dashboard</h5>
        <div className="m-3 col text-end">
          <div className="calendarWrap">
            <button
              className="btn btn-light dropdown-toggle"
              onClick={() => setOpen((open) => !open)}
            >
              {`${readableDate(range[0].startDate)} - ${readableDate(
                range[0].endDate
              )}`}
            </button>

            <div ref={refOne}>
              {open && (
                <DateRange
                  onChange={(item) => {
                    changeHandler(item.selection);
                    setRange([item.selection]);
                  }}
                  editableDateInputs={true}
                  moveRangeOnFirstSelection={false}
                  ranges={range}
                  className="calendarElement"
                />
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div
          className="col btn btn-lg active text-white ms-3 p-4"
          onClick={() => clickHandler("/products")}
        >
          <h6 className="text-start">All Product</h6>
          <h4 className="text-center my-4">
            {!done ? (
              <ReactLoading
                className="mx-auto"
                type={"spin"}
                color={"#000000"}
                height={30}
                width={30}
              />
            ) : (
              dashboard.countProduct
            )}
          </h4>
        </div>
        <div
          className="col btn btn-lg active text-white ms-3 p-4"
          onClick={() => clickHandler("/orders/new")}
        >
          <h6 className="text-start">New Order</h6>
          <h4 className="text-center my-4">
            {!done ? (
              <ReactLoading
                className="mx-auto"
                type={"spin"}
                color={"#000000"}
                height={30}
                width={30}
              />
            ) : (
              dashboard.countNewOrder
            )}
          </h4>
        </div>
        <div
          className="col btn btn-lg active text-white  ms-3 p-4 text-white"
          onClick={() => handleClick(true)}
        >
          <div className="row">
            <h6 className="text-start col">Profile Seen</h6>
          </div>
          <h4 className="text-center my-4">
            {!done ? (
              <ReactLoading
                className="mx-auto"
                type={"spin"}
                color={"#000000"}
                height={30}
                width={30}
              />
            ) : (
              dashboard.countVisitAccount
            )}
          </h4>
        </div>
        <div
          className="col btn btn-lg active text-white mx-3 p-4"
          onClick={() => handleClick(clicked)}
        >
          <div className="row">
            <h6 className="text-start col">Product Seen</h6>
          </div>
          <h4 className="text-center my-4">
            {!done ? (
              <ReactLoading
                className="mx-auto"
                type={"spin"}
                color={"#000000"}
                height={30}
                width={30}
              />
            ) : (
              dashboard.countVisitProduct
            )}
          </h4>
        </div>
      </div>
      {clicked === true ? (
        <>
          {dashboard.countVisitProduct > 0 ? (
            <table className="table table-hover my-3">
              <thead>
                <tr className="table-active">
                  <th scope="col">No</th>
                  <th scope="col">Product</th>
                  <th scope="col">Seen</th>
                </tr>
              </thead>
              <tbody>
                {dashboard.dataVisitProduct.map((item, index) => (
                  <tr key={index}>
                    <th scope="row">{index + 1}</th>
                    <td>{item.name}</td>
                    <td>{item.countVisit}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : null}
        </>
      ) : null}
    </>
  );
};

export default Dashboard;
