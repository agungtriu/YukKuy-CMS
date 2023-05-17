import { useState } from "react";

const ModalDetailOrderSuccess = (props) => {
  const { product, guide } = props;
  const [orders, setOrders] = useState(product.orders);
  const [currentPage, setCurrentPage] = useState(1);
  const [OrderPerPage] = useState(5);
  const searchHandler = (key) => {
    if (key.length > 0) {
      setOrders(
        orders.filter(
          (order) =>
            order.name.includes(key) || order.id.toString().includes(key)
        )
      );
    } else {
      setOrders(product.orders);
    }
  };
  const indexOfLastOrder = currentPage * OrderPerPage;
  const indexOfFirstOrder = indexOfLastOrder - OrderPerPage;
  const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);
  const paginate = (num) => {
    setCurrentPage(num);
    window.scrollTo(0, 0);
  };
  return (
    <>
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
              <form className="ms-auto me-3">
                <input
                  className="form-control"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                  onChange={(e) => searchHandler(e.target.value)}
                />
              </form>

              <button
                type="button"
                className="btn-close ms-0"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <div className="modal-body m-2">
              <h6>Guide : {guide.name} ({guide.phone})</h6>
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
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ModalDetailOrderSuccess;
