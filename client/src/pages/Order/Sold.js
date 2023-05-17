import React, { useEffect, useState } from "react";
import TabsOrder from "../../components/TabsOrder";
import { getOrdersByStatus } from "../../axios/orderAxios";
import { imageUrl } from "../../config/config";
import { readableDate } from "../../helpers/TimeFormat";
import DataEmpty from "../../components/DataEmpty";
import ReactLoading from "react-loading";
import ModalDetailOrderSuccess from "../../components/ModalDetailOrderSuccess";
import { getDetailGuide } from "../../axios/guideAxios";

const Sold = () => {
  const [products, setProducts] = useState([]);
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

  const guideHanlder = (guideId) => {
    getDetailGuide(guideId, (result) => {
      setGuide(result.data);
    });
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
  return (
    <>
      <TabsOrder></TabsOrder>
      <h5 className="my-3">Sold</h5>
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
                onClick={() => guideHanlder(product.guideId)}
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
              <ModalDetailOrderSuccess
                product={product}
                guide={guide}
              ></ModalDetailOrderSuccess>
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
    </>
  );
};

export default Sold;
