import { useEffect, useState } from "react";
import { asAdmin, getAccounts } from "../../axios/accountAxios";
import ReactLoading from "react-loading";
import { GrUserAdmin } from "react-icons/gr";
import { useLocation, useNavigate } from "react-router-dom";
import TabsAccount from "../../components/TabsAccount";

const Accounts = (props) => {
  const { status } = props;
  const [accounts, setAccounts] = useState([]);
  const [filterAccounts, setFilterAccounts] = useState([]);
  const [done, setDone] = useState(false);
  const location = useLocation();
  const searchHandler = (key, data) => {
    if (key.length > 0) {
      setFilterAccounts(
        data.filter(
          (account) =>
            account.name.includes(key) ||
            account.username.toString().includes(key)
        )
      );
    } else {
      setFilterAccounts(data);
    }
    setCurrentAccountPage(1);
  };
  useEffect(() => {
    getAccounts((result) => {
      if (status !== undefined) {
        setFilterAccounts(
          result.filter((account) => account.role.includes(status))
        );
        setAccounts(result.filter((account) => account.role.includes(status)));
      } else {
        setFilterAccounts(result);
        setAccounts(result);
      }
      setDone(true);
    });
  }, [location.key]);

  const [currentAccountPage, setCurrentAccountPage] = useState(1);
  const [AccountPerPage] = useState(10);

  const indexOfLastAccount = currentAccountPage * AccountPerPage;
  const indexOfFirstAccount = indexOfLastAccount - AccountPerPage;
  const currentAcccounts = filterAccounts.slice(
    indexOfFirstAccount,
    indexOfLastAccount
  );
  const paginateAccount = (num) => {
    setCurrentAccountPage(num);
  };

  const navigate = useNavigate();
  const adminHandler = (id) => {
    asAdmin(id, (result) => {
      if (result) {
        navigate("/accounts");
        setDone(false);
      }
    });
  };
  return (
    <>
      <TabsAccount></TabsAccount>
      <input
        className="form-control ms-auto me-3 mt-3"
        type="search"
        placeholder="Search"
        aria-label="Search"
        style={{ width: "200px" }}
        onChange={(e) => searchHandler(e.target.value, accounts)}
      />
      <table className="table table-hover my-3">
        <thead>
          <tr className="table-active">
            <th scope="col">No</th>
            <th scope="col">Name</th>
            <th scope="col">Username</th>
            <th scope="col">Role</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {!done ? (
            <ReactLoading
              className="position-absolute top-50 start-50 translate-middle"
              type={"spin"}
              color={"#000000"}
              height={100}
              width={100}
            />
          ) : currentAcccounts.length > 0 ? (
            currentAcccounts.map((item, index) => (
              <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>{item.name}</td>
                <td>{item.username}</td>
                <td>{item.role}</td>
                <td>
                  {item.role !== "admin" ? (
                    <div
                      onClick={() => adminHandler(item.id)}
                      className="btn btn-outline-light border-0"
                    >
                      <GrUserAdmin />
                    </div>
                  ) : null}
                </td>
              </tr>
            ))
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
                length: Math.ceil(accounts.length / AccountPerPage),
              },
              (_, index) => {
                const pageNumber = index + 1;
                return (
                  <>
                    <li key={pageNumber} className="page-item">
                      <button
                        onClick={() => paginateAccount(pageNumber)}
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

export default Accounts;
