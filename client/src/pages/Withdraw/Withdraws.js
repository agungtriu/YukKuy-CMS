import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import DataEmpty from "../../components/DataEmpty";
import ReactLoading from "react-loading";
import { getWithdraws } from "../../axios/withdrawAxios";
import TabsWithdraw from "../../components/TabsWithdraw";
import Withdraw from "./Withdraw";
import ModalProcessWithdraw from "../../components/ModalProcessWithdraw";

const Withdraws = (props) => {
  const { status } = props;
  const [withdraws, setWithdraws] = useState([]);
  const [done, setDone] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [WithdrawPerPage] = useState(5);

  const location = useLocation();
  useEffect(() => {
    getWithdraws(status, (result) => {
      setWithdraws(result);
      setDone(true);
    });
  }, [location.key]);

  const indexOfLastWithdraw = currentPage * WithdrawPerPage;
  const indexOfFirstWithdraw = indexOfLastWithdraw - WithdrawPerPage;
  const currentWithdraws = withdraws.slice(
    indexOfFirstWithdraw,
    indexOfLastWithdraw
  );
  const paginate = (num) => {
    setCurrentPage(num);
  };

  const [modalShow, setModalShow] = useState(false);

  const [withdraw, setWithdraw] = useState({
    id: 0,
    username: "",
    saldo: 0,
    amount: 0,
    bank: "",
    name: "",
    number: 0,
  });
  const clickHandler = (data) => {
    setWithdraw({
      id: data.id,
      username: data.account.username,
      saldo: data.account.saldo,
      amount: data.amount,
      bank: data.bank.bank,
      name: data.bank.name,
      number: data.bank.number,
    });
    setModalShow(true);
  };
  return (
    <>
      <TabsWithdraw></TabsWithdraw>
      {!done ? (
        <ReactLoading
          className="position-absolute top-50 start-50 translate-middle"
          type={"spin"}
          color={"#000000"}
          height={100}
          width={100}
        />
      ) : currentWithdraws.length > 0 ? (
        currentWithdraws.map((item) =>
          localStorage.role === "admin" &&
          item.statusWithdraw.status === "request" ? (
            <div key={item.id} onClick={() => clickHandler(item)}>
              <Withdraw item={item}></Withdraw>
            </div>
          ) : (
            <div key={item.id}>
              <Withdraw item={item}></Withdraw>
            </div>
          )
        )
      ) : (
        <div className="mt-5 text-center" key={0}>
          <DataEmpty></DataEmpty>
        </div>
      )}

      <ModalProcessWithdraw
        data={withdraw}
        show={modalShow}
        onHide={() => setModalShow(false)}
      ></ModalProcessWithdraw>

      <div className=" d-flex justify-content-center my-2">
        <nav aria-label="Page navigation example">
          <ul className="pagination">
            {Array.from(
              { length: Math.ceil(withdraws.length / WithdrawPerPage) },
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

export default Withdraws;
