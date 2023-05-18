import React, { useEffect, useRef, useState } from "react";
import { getHomeData } from "../../axios/homeAxios";
import { useNavigate } from "react-router-dom";
import { DateRangePicker } from "react-date-range";
import { addDays, subDays } from "date-fns";
import { formatDate, readableDate } from "../../helpers/TimeFormat";

const Dashboard = () => {
  const [clicked, setClicked] = useState(false);
  const [dashboard, setDashboard] = useState([]);

  const handleClick = () => {
    setClicked((clicked) => !clicked);
  };
  const navigate = useNavigate();
  const clickHandler = (link) => {
    navigate(link);
  };
  useEffect(() => {
    getHomeData(
      formatDate(range[0].startDate),
      formatDate(addDays(range[0].endDate, 1)),
      (result) => {
        setDashboard(result);
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
    getHomeData(
      formatDate(addDays(item.startDate, 1)),
      formatDate(addDays(item.endDate, 2)),
      (result) => {
        setDashboard(result);
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
                <DateRangePicker
                  onChange={(item) => {
                    changeHandler(item.selection);
                    setRange([item.selection]);
                  }}
                  editableDateInputs={true}
                  moveRangeOnFirstSelection={false}
                  ranges={range}
                  months={2}
                  direction="horizontal"
                  className="calendarElement"
                />
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div
          className="col btn btn-lg btn-primary ms-3 p-4"
          onClick={() => clickHandler("/products")}
        >
          <h6 className="text-start">All Product</h6>
          <h4 className="text-center my-4">{dashboard.countProduct}</h4>
        </div>
        <div
          className="col btn btn-lg btn-warning ms-3 p-4 text-white"
          onClick={() => clickHandler("/orders/new")}
        >
          <h6 className="text-start">New Order</h6>
          <h4 className="text-center my-4">{dashboard.countNewOrder}</h4>
        </div>
        <div className="col btn btn-lg btn-info ms-3 p-4 text-white">
          <div className="row">
            <h6 className="text-start col">Profile Seen</h6>
          </div>
          <h4 className="text-center my-4">{dashboard.countVisitAccount}</h4>
        </div>
        <div
          className="col btn btn-lg btn-success mx-3 p-4"
          onClick={handleClick}
        >
          {clicked ? true : false}
          <div className="row">
            <h6 className="text-start col">Product Seen</h6>
          </div>
          <h4 className="text-center my-4">{dashboard.countVisitProduct}</h4>
        </div>
      </div>
      {clicked === true ? (
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
      ) : null}
    </>
  );
};

export default Dashboard;
