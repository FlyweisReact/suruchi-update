/** @format */
import {  Table } from "react-bootstrap";
import Pagination from "../../Component/Pagination";
import HOC from "../../Layout/HOC";

const Payment = () => {
  return (
    <>
      <section className="sectionCont">
        <div className="pb-4  w-full flex justify-between items-center">
          <span
            className="tracking-widest text-slate-900 font-semibold"
            style={{ fontSize: "1.5rem" }}
          >
            Manage payments (Total : 1)
          </span>
        </div>
        <div className="filterBox">
          <img
            src="https://t4.ftcdn.net/jpg/01/41/97/61/360_F_141976137_kQrdYIvfn3e0RT1EWbZOmQciOKLMgCwG.jpg"
            alt=""
          />
          <input type="search" placeholder="Search by OrderId" />
        </div>
        <div className="searchByDate">
          <div>
            <label>Starting Date </label>
            <input type="date" />
          </div>

          <div>
            <label>Ending Date </label>
            <input type="date" />
          </div>
        </div>
        <div className="searchByDate">
          <div>
            <label>Status : </label>
            <select>
              <option> Select order status </option>
              <option value="10">Approve </option>
              <option value="10"> Past orders </option>
              <option value="20"> Pending orders </option>
              <option value="50"> Ongoing orders </option>
              <option value="100"> Canceled orders </option>
            </select>
          </div>
        </div>

        <div className="overFlowCont">
          <Table>
            <thead>
              <tr>
                <th>SNo.</th>
                <th>Customer</th>
                <th>OrderId</th>
                <th>Vendor</th>
                <th>Driver</th>
                <th>Amount</th>
                <th>Payment Method</th>
                <th>Withdraw Request</th>
                <th>Refund</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>John Doe</td>
                <td> EOV7IM7Z3</td>
                <th>David Beckham</th>
                <th>Alice Smith</th>
                <td>
                  <i className="fa-solid fa-indian-rupee-sign"></i>1000
                </td>
                <td>Cash</td>
                <td>
                  <span className="flexCont">
                    <i className="fa-solid fa-check"></i>
                    <i className="fa-solid fa-xmark reject-icon "></i>
                  </span>
                </td>
                <td>
                  <span className="flexCont">
                    <i className="fa-solid fa-check"></i>
                    <i className="fa-solid fa-xmark reject-icon "></i>
                  </span>
                </td>
                <td>01/22/2024</td>
              </tr>
            </tbody>
          </Table>
        </div>

        <Pagination />
      </section>
    </>
  );
};

export default HOC(Payment);
