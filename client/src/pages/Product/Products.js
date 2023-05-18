import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { deleteProduct, getProducts, getShow } from "../../axios/productAxios";
import { imageUrl } from "../../config/config";
import { readableDate } from "../../helpers/TimeFormat";
import DataEmpty from "../../components/DataEmpty";
import RupiahFormatter from "../../helpers/RupiahFormatter";
import ReactLoading from "react-loading";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [done, setDone] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [ProductPerPage] = useState(5);

  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    getProducts((result) => {
      setProducts(result.data);
      setDone(true);
    });
  }, [location.key]);

  const hideClick = (id, isLive) => {
    const newIsLive = isLive === 1 ? 0 : 1;
    const form = { isLive: newIsLive };
    getShow(id, form, (result) => {
      if (result.status) {
        navigate("/products");
      }
    });
  };

  const deleteClick = (id) => {
    deleteProduct(id, (result) => {
      if (result.status) {
        navigate("/products");
      }
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
      <h5 className="m-3">Product</h5>
      <Link
        className=" card position-absolute top-0 end-0 m-3 btn btn-outline-secondary text-black text-decoration-none"
        to={"/products/add"}
      >
        Add Product
      </Link>
      {!done ? (
        <ReactLoading
          className="position-absolute top-50 start-50 translate-middle"
          type={"spin"}
          color={"#000000"}
          height={100}
          width={100}
        />
      ) : currentProducts.length > 0 ? (
        currentProducts.map((item, index) => (
          <div className="card m-3 border-0 shadow" key={index}>
            <div
              className={
                +item.isLive === 0
                  ? "card-body bg-dark text-white rounded-3"
                  : "card-body"
              }
            >
              <img
                className="rounded-3 float-start me-3"
                style={{ height: "150px" }}
                src={imageUrl + item.imageProducts[0].src}
                alt={item.imageProducts[0].src}
                key={imageUrl + item.imageProducts[0].src}
              ></img>
              <div className="row">
                <div className="col-sm-8">
                  <h4 className="card-title">{item.name}</h4>
                  <h5 className="card-text">#{item.id}</h5>
                  <p className="card-text">
                    <span>{readableDate(item.dateStart)}</span> -{" "}
                    <span>{readableDate(item.dateEnd)}</span>
                  </p>
                  <p className="card-text">{RupiahFormatter(item.price)}/pax</p>
                </div>
                <div className="col-sm-4 my-5" key={item.id}>
                  <Link
                    className="btn btn-sm btn-light mx-2 my-1 text-decoration-none"
                    to={`edit/${item.id}`}
                  >
                    Edit
                  </Link>
                  <button
                    className="btn btn-sm btn-light mx-2 my-1"
                    onClick={() => deleteClick(item.id)}
                  >
                    Delete
                  </button>
                  <button
                    className="btn btn-sm btn-light mx-2 my-1"
                    onClick={() => hideClick(item.id, item.isLive)}
                  >
                    {item.isLive === 1 ? "Hide" : "Show"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))
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

export default Products;
