import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import TabsOrder from "../../components/TabsOrder";
import { getOrders } from "../../axios/orderAxios";
import Order from "../../components/Order";
import DataEmpty from "../../components/DataEmpty";
import ReactLoading from "react-loading";

const Orders = (props) => {
  const { status } = props;
  const [orders, setOrders] = useState([]);
  const [done, setDone] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [OrderPerPage] = useState(5);

  const location = useLocation();
  useEffect(() => {
    if (!done) {
      getOrders(status, (result) => {
        setOrders(result.data);
        setDone(true);
      });
    }
  }, [location.key]);

  const indexOfLastOrder = currentPage * OrderPerPage;
  const indexOfFirstOrder = indexOfLastOrder - OrderPerPage;
  const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);
  const paginate = (num) => {
    setCurrentPage(num);
  };
  return (
    <>
      <TabsOrder></TabsOrder>
      {!done ? (
        <ReactLoading
          className="position-absolute top-50 start-50 translate-middle"
          type={"spin"}
          color={"#000000"}
          height={100}
          width={100}
        />
      ) : currentOrders.length > 0 ? (
        currentOrders.map((order) => {
          return (
            <div key={order.id}>
              <Order order={order}></Order>
            </div>
          );
        })
      ) : (
        <div className="mt-5 text-center">
          <DataEmpty></DataEmpty>
        </div>
      )}

      <div className=" d-flex justify-content-center my-2">
        <nav aria-label="Page navigation example">
          <ul className="pagination">
            {Array.from(
              { length: Math.ceil(orders.length / OrderPerPage) },
              (_, index) => {
                const pageNumber = index + 1;
                return (
                  <>
                    <li key={pageNumber} className="page-item">
                      <button
                        onClick={() => paginate(pageNumber)}
                        className="page-link"
                      >
                        {pageNumber}
                      </button>
                    </li>
                  </>
                );
              }
            )}
          </ul>
        </nav>
      </div>
    </>
  );
};

export default Orders;
