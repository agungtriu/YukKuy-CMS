import React, { useEffect, useState } from "react";
import TabsOrder from "../../components/TabsOrder";
import { getOrdersByStatus } from "../../axios/orderAxios";
import { imageUrl } from "../../config/config";
import { readableDate } from "../../helpers/TimeFormat";
import DataEmpty from "../../components/DataEmpty";
import ReactLoading from "react-loading";
import { getDetailGuide } from "../../axios/guideAxios";

const Success = () => {
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState({});
  const [orders, setOrders] = useState([]);
  const [guide, setGuide] = useState({});
  const [done, setDone] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [ProductPerPage] = useState(5);
  useEffect(() => {
    getOrdersByStatus("success", (result) => {
      setProducts(result.data);
      setDone(true);
    });
  }, []);

  const clickHanlder = (product) => {
    getDetailGuide(product.guideId, (result) => {
      setGuide(result.data);
    });
    setProduct(product);
    setOrders(product.orders);
  };

  const indexOfLastProduct = currentPage * ProductPerPage;
  const indexOfFirstProduct = indexOfLastProduct - ProductPerPage;
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const paginate = (num) => {
    setCurrentPage(num);
  };

  const [currentModalPage, setCurrentModalPage] = useState(1);
  const [OrderPerPage] = useState(10);
  const searchHandler = (key, orders) => {
    if (key.length > 0) {
      setOrders(
        orders.filter(
          (order) =>
            order.name.includes(key) || order.id.toString().includes(key)
        )
      );
    } else {
      setOrders(orders);
    }
    setCurrentModalPage(1);
  };
  const indexOfLastOrder = currentModalPage * OrderPerPage;
  const indexOfFirstOrder = indexOfLastOrder - OrderPerPage;
  const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);
  const paginateModal = (num) => {
    setCurrentModalPage(num);
  };
  return (
    <>
      <TabsOrder></TabsOrder>
      <h5 className="my-3">Success</h5>
      {!done ? (
        <ReactLoading
          className="position-absolute top-50 start-50 translate-middle"
          type={"spin"}
          color={"#000000"}
          height={100}
          width={100}
        />
      ) : currentProducts.length > 0 ? (
        currentProducts.map((product) => {
          return (
            <>
              <div
                className="card mb-2 border-0 shadow"
                key={product.id}
                data-bs-toggle="modal"
                data-bs-target="#detailSuccessModal"
                onClick={() => clickHanlder(product)}
              >
                <div className="card-body">
                  <img
                    className="rounded-3 float-start me-3"
                    style={{ height: "110px" }}
                    src={imageUrl + product.imageProducts[0].src}
                    alt={product.imageProducts[0].src}
                  ></img>
                  <div className="row">
                    <div className="col-sm-8">
                      <h5 className="card-title">
                        {product.name} #{product.id}
                      </h5>
                      <p className="card-text my-2">
                        {readableDate(product.dateStart)} -{" "}
                        {readableDate(product.dateEnd)}
                      </p>
                    </div>
                    <div className="col-sm-4">
                      <h5 className="btn btn-success my-5">
                        {product.orders.length}
                      </h5>
                    </div>
                  </div>
                </div>
              </div>
            </>
          );
        })
      ) : (
        <DataEmpty></DataEmpty>
      )}
      <div className=" d-flex justify-content-center my-2">
        <nav aria-label="Page navigation example">
          <ul className="pagination">
            {Array.from(
              { length: Math.ceil(products.length / ProductPerPage) },
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

      <div
        className="modal fade"
        id="detailSuccessModal"
        aria-labelledby="detailOrderSuccessModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-xl">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="detailOrderSuccessModalLabel">
                Detail Order {product.name}
              </h5>
              <input
                className="form-control ms-auto me-3"
                type="search"
                placeholder="Search"
                aria-label="Search"
                style={{ width: "200px" }}
                onChange={(e) => searchHandler(e.target.value, product.orders)}
              />

              <button
                type="button"
                className="btn-close ms-0"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <div className="modal-body m-2">
              <h6>
                Guide : {guide.name} ({guide.phone})
              </h6>
              <table className="table table-hover">
                <thead>
                  <tr className="table-active">
                    <th scope="col">Kode Order</th>
                    <th scope="col">Name</th>
                    <th scope="col">Phone</th>
                    <th scope="col">Email</th>
                    <th scope="col">Pax</th>
                  </tr>
                </thead>
                <tbody>
                  {currentOrders.length > 0 ? (
                    currentOrders.map((order) => {
                      return (
                        <tr key={order.id}>
                          <th scope="row">{order.id}</th>
                          <td>{order.name}</td>
                          <td>{order.phone}</td>
                          <td>{order.email}</td>
                          <td>{order.totalPackage}</td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan="5" className="text-center">
                        Not Found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>

              <div className=" d-flex justify-content-center">
                <nav aria-label="Page navigation example">
                  <ul className="pagination">
                    {Array.from(
                      {
                        length: Math.ceil(orders.length / OrderPerPage),
                      },
                      (_, index) => {
                        const pageNumber = index + 1;
                        return (
                          <>
                            <li key={pageNumber} className="page-item">
                              <button
                                onClick={() => paginateModal(pageNumber)}
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
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Success;
