/** @format */
import React, { useEffect } from "react";
import HOC from "../../layout/HOC";
import { ValueChecker } from "../../../utils/utils";
import data from "../../../Constant/constant.json";

const SingleOrder = () => {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "instant",
    });
  }, []);

  return (
    <>
      <section className="sectionCont">
        {ValueChecker(data?.orders?.[0]?.orderId, "Order Id")}
        {ValueChecker(data?.orders?.[0]?.date, "Date")}
        {ValueChecker(data?.orders?.[0]?.total, "Total")}
        {ValueChecker(data?.orders?.[0]?.OrderStatus, "Order Status")}
        {ValueChecker(data?.orders?.[0]?.paymentStatus, "Payment Status")}
      </section>
    </>
  );
};

export default HOC(SingleOrder);
