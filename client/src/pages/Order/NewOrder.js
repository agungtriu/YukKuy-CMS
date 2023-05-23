import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import TabsOrder from "../../components/TabsOrder";
import { getBankById, getOrdersByStatus } from "../../axios/orderAxios";
import Order from "../../components/Order";
import DataEmpty from "../../components/DataEmpty";
import ReactLoading from "react-loading";
import ModalVerification from "../../components/ModalVerification";

const NewOrder = () => {
  const [orders, setOrders] = useState([]);
  const [order, setOrder] = useState({
    id: 0,
    imageReceipt: "",
    productName: "",
    totalPrice: 0,
  });
  const [done, setDone] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [OrderPerPage] = useState(5);
  const location = useLocation();
  useEffect(() => {
    getOrdersByStatus("verification", (result) => {
      setOrders(result.data);
      setDone(true);
    });
  }, [location.key]);

  const [bank, setBank] = useState({
    bank: "",
    name: "",
    number: "",
  });

  const clickHandler = (data) => {
    getBankById(data.verificationPayments[0].bankId, (result) => {
      setBank({
        bank: result.bank,
        name: result.name,
        number: result.number,
      });
    });
    setOrder({
      id: +data.id,
      imageReceipt: data.verificationPayments[0].imageReceipt,
      productName: data.product.name,
      totalPrice: +data.totalPrice,
    });
  };
  const indexOfLastOrder = currentPage * OrderPerPage;
  const indexOfFirstOrder = indexOfLastOrder - OrderPerPage;
  const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);
  const paginate = (num) => {
    setCurrentPage(num);
  };
  return (
    <>
      <TabsOrder></TabsOrder>
      <h5 className="my-3">New Order</h5>
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
            <>
              <div
                key={order.id}
                data-bs-toggle="modal"
                data-bs-target="#verificationModal"
                onClick={() => {
                  clickHandler(order);
                }}
              >
                <Order order={order}></Order>
              </div>
            </>
          );
        })
      ) : (
        <div className="mt-5 text-center">
          <DataEmpty></DataEmpty>
        </div>
      )}
      <ModalVerification order={order} bank={bank}></ModalVerification>

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

export default NewOrder;
