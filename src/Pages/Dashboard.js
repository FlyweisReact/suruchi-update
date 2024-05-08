/** @format */

import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import HOC from "../Layout/HOC";

const card = [
  {
    title: "Total Customer",
    number: 24,
    icon: <i className="fa-solid fa-user text-2xl text-[#03AED2]"></i>,
    bg: "#03AED2",
    link: "/user",
  },
  {
    title: "Total orders",
    number: 24,
    icon: <i className="fa-solid fa-cart-shopping text-2xl text-[#0A6847]"></i>,
    bg: "#0A6847",
    link: "/Product",
  },
  {
    title: "New customers",
    number: 24,
    icon: <i className="fa-solid fa-user-plus text-2xl text-[#4D869C]"></i>,
    bg: "#4D869C",
    link: "/Product",
  },
  {
    title: "Total Vendors/Merchants",
    number: 24,
    icon: <i className="fa-solid fa-user-tie text-2xl text-[#00215E]"></i>,
    bg: "#00215E",
    link: "/Product",
  },
  {
    title: "Drivers section",
    number: 24,
    icon: <i className="fa-solid fa-id-card text-2xl text-[#042b26]"></i>,
    bg: "#042b26",
    link: "/Product",
  },
  {
    title: "Total Earning",
    number: 24,
    icon: <i className="fa-solid fa-money-bill text-2xl text-[#2C4E80]"></i>,
    bg: "#2C4E80",
    link: "/Product",
  },
  {
    title: "Products Inventory section",
    number: 24,
    icon: <i className="fa-solid fa-warehouse text-2xl text-[#3C5B6F]"></i>,
    bg: "#3C5B6F",
    link: "/Product",
  },

  {
    title: "Sub-admin section",
    number: 24,
    icon: (
      <i className="fa-solid fa-users-viewfinder text-2xl text-[#496989]"></i>
    ),
    bg: "#496989",
    link: "/Product",
  },
  {
    title: "Reporting Managemen",
    number: 24,
    icon: <i className="fa-solid fa-chart-simple text-2xl text-[#222831]"></i>,
    bg: "#222831",
    link: "/Product",
  },
  {},
  {},
  {},
];

const Dashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "instant",
    });
  }, []);

  return (
    <>
      <section className="CardDiv_Container">
        {card.map((card, index) => {
          return card.title ? (
            <div
              className="cardDiv"
              key={index}
              style={{
                backgroundColor: `${card.bg}`,
              }}
              onClick={() => navigate(`${card.link}`)}
            >
              <div className="grid  justify-between grid-cols-4">
                <div className="flex flex-col col-span-3 space-y-1">
                  <span
                    className="tracking-widest text-gray-900"
                    style={{ color: "#fff" }}
                  >
                    {card.title}
                  </span>
                  <span
                    className="tracking-wider text-gray-700 text-xl md:text-2xl font-semibold"
                    style={{ color: "#fff" }}
                  >
                    {card.number}
                  </span>
                </div>
                <div className="flex rounded-full w-10 h-10 sm:w-12 sm:h-12 bg-white justify-center items-center iCOn">
                  {card.icon}
                </div>
              </div>
            </div>
          ) : (
            <div style={{ width: "350px" }}></div>
          );
        })}
      </section>
    </>
  );
};

export default HOC(Dashboard);
