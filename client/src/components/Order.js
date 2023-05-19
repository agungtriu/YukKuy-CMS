import { imageUrl } from "../config/config";
import RupiahFormatter from "../helpers/RupiahFormatter";
import { readableDate } from "../helpers/TimeFormat";
import { LazyLoadImage } from "react-lazy-load-image-component";

const Order = (props) => {
  const { order } = props;
  const statusHandler = (data) => {
    switch (data.status) {
      case "verification":
        return (
          <div className="btn btn-warning disable text-white my-5">{data.status}</div>
        );
      case "success":
        return (
          <div className="btn btn-success disable my-5">{data.status}</div>
        );
      case "payment":
        return (
          <div className="btn btn-primary disable my-5">{data.status}</div>
        );
      case "reject":
        return (
          <div className="btn btn-danger disable my-5">{data.status}</div>
        );
      case "cancel":
        return <div className="btn btn-dark disable my-5">{data.status}</div>;
      default:
        break;
    }
  };
  return (
    <>
      <div className="card mb-2 border-0 shadow" key={order.id}>
        <div className="card-body">
          <LazyLoadImage
            className="rounded-3 float-start me-3"
            style={{ height: "150px" }}
            src={imageUrl + order.product.imageProducts[0].src}
            alt={order.product.imageProducts[0].src}
          ></LazyLoadImage>
          <div className="row position-relative">
            <div className="col-sm-8">
              <h4 className="card-title">
                {order.product.name}
              </h4>
              <h5 className="card-text">by: {order.name}</h5>
              <h6 className="card-text my-2 text-dark">Order id : {order.id}</h6>
              <p className="card-text my-2">{readableDate(order.createdAt)}</p>
              <span className="my-5">Pax: {order.totalPackage}</span>
              <span className="mx-5">
                Price: {RupiahFormatter(+order.totalPrice)}
              </span>
            </div>
            <div className="col-sm-4">
              <div className="m-auto">{statusHandler(order.statusOrder)}</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Order;
