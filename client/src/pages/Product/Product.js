import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getProducts, getShow } from "../../axios/productAxios";
import { imageUrl } from "../../config/config";
import Swal from "sweetalert2";
import { formatTime } from "../../helpers/TimeFormat";

const Product = () => {
  const [products, setProducts] = useState([]);
  const [clicked, setClicked] = useState(1);
  const [status, setStatus] = useState({
    isLive: 0,
  });

  useEffect(() => {
    getProducts((result) => {
      setProducts(result.data);
      setClicked(result)
    });
  }, []);

  const handleClick = (id, isLive) => {
    const newIsLive = isLive === 1 ? 0 : 1;
    const form = { isLive: newIsLive };
    setStatus(form);
    getShow(id, form, (result) => {
      if (result) {
        // setClicked(newIsLive);
        window.location.reload();
      }
    });
  };
  console.log(status);
  console.log(clicked);
  return (
    <>
      <h5>Product</h5>
      <Link
        className=" card position-absolute top-0 end-0 mx-1 btn btn-outline-secondary text-black text-decoration-none"
        to={"/products/add"}
      >
        Add Product
      </Link>
      {products === null ? (
        <div>No Product Update</div>
      ) : (
        products.map((item, index) => (
          <div className="card mb-3 border-0 shadow" key={index}>
            <div className="card-body">
              <img
                className="rounded-3 float-start me-3"
                style={{ height: "150px", width: "230px" }}
                src={`${imageUrl}/${item.imageProducts[0].src}`}
                alt=""
                key={`${imageUrl}/${item.imageProducts[0].id}`}
              ></img>
              <div className="row">
                <div className="col-sm-8">
                  <h5 className="card-title">{item.name}</h5>
                  <h6 className="card-text">by: {item.accountId}</h6>
                  <p className="card-text my-2">
                    Date: {formatTime(item.dateStart)}
                  </p>
                  <span className="my-5">Stock:{item.guideId}</span>
                  <span className="mx-5">Price: IDR. {item.price}/pax</span>
                </div>
                <div className="col-sm-4" key={item.id}>
                  <p className="position-absolute top-0 end-0 mx-1">
                    {item.isLive === 1 ? "Available" : "Sold"}
                  </p>
                  <Link
                    className="btn btn-sm btn-light mx-2 my-5 text-decoration-none"
                    to={`edit/${item.id}`}
                  >
                    Edit
                  </Link>
                  <button className="btn btn-sm btn-light mx-2 my-5">
                    Delete
                  </button>
                  <button
                    className="btn btn-sm btn-light mx-2 my-5"
                    onClick={() => handleClick(item.id, item.isLive)}
                  >
                    {item.isLive === 1 ? "Hide" : "Show"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))
      )}
    </>
  );
};

export default Product;
