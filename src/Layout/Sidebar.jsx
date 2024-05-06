/** @format */

import React from "react";
import { RiCloseLine } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import { BiLogOutCircle } from "react-icons/bi";
import { MdDashboardCustomize } from "react-icons/md";

const Sidebar = ({ hamb, setHamb }) => {
  const navigate = useNavigate();

  let nav = [
    {
      icon: <MdDashboardCustomize className="text-xl mr-3 rounded-full " />,
      link: "/dashboard ",
      name: "Dashboard",
    },
    {
      icon: <i className="fa-solid fa-user  text-xl mr-3 rounded-full"></i>,
      link: "/user",
      name: " Customer",
    },
    {
      icon: <i className="fa-solid fa-user  text-xl mr-3 rounded-full"></i>,
      link: "/vendors",
      name: " Vendors/Stores",
    },
    {
      icon: <i className="fa-solid fa-list  text-xl mr-3 rounded-full"></i>,
      link: "/Category",
      name: "Category",
    },
    {
      icon: <i className="fa-solid fa-list  text-xl mr-3 rounded-full"></i>,
      link: "/sub-category",
      name: "Sub Category",
    },

    {
      icon: (
        <i className="fa-solid fa-bag-shopping text-xl mr-3 rounded-full"></i>
      ),
      link: "/Product",
      name: "Products",
    },
    {
      icon: (
        <i className="fa-solid fa-warehouse text-xl mr-3 rounded-full"></i>
      ),
      link: "/inventory",
      name: "Inventory",
    },
    // {
    //   icon: <i className="fa-solid fa-image  text-xl mr-3 rounded-full"></i>,
    //   link: "/adBanner",
    //   name: "Ad banner's",
    // },

    // {
    //   icon: (
    //     <i className="fa-solid fa-address-card text-xl mr-3 rounded-full" />
    //   ),
    //   link: "/hotDeals",
    //   name: "Hot Deals",
    // },

    // {
    //   icon: <i className="fa-solid fa-user  text-xl mr-3 rounded-full"></i>,
    //   link: "/brand",
    //   name: "Brand",
    // },
    // {
    //   icon: <i className="fa-solid fa-user  text-xl mr-3 rounded-full"></i>,
    //   link: "/blogs",
    //   name: "Blogs",
    // },
    // {
    //   icon: <i className="fa-solid fa-user  text-xl mr-3 rounded-full"></i>,
    //   link: "/events",
    //   name: "Events",
    // },
    // {
    //   icon: (
    //     <i className="fa-solid fa-cart-shopping text-xl mr-3 rounded-full"></i>
    //   ),
    //   link: "/Orders",
    //   name: "Orders",
    // },
    // {
    //   icon: (
    //     <i className="fa-solid fa-address-card text-xl mr-3 rounded-full" />
    //   ),
    //   link: "/about-us",
    //   name: "About Us",
    // },
    // {
    //   icon: (
    //     <i className="fa-solid fa-address-card text-xl mr-3 rounded-full" />
    //   ),
    //   link: "/faq",
    //   name: "FAQ",
    // },
  ];

  const logOut = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <>
      <aside
        className="p-4 h-auto"
        style={{ backgroundColor: "#459948", minHeight: "100vh" }}
      >
        {/* Top */}
        <div className="w-full md:hidden relative  p-2 mb-4">
          <RiCloseLine
            onClick={() => setHamb(!hamb)}
            className="text-3xl  absolute top-2 sm:hover:rotate-[228deg] transition-transform font-bold right-2 sm:hover:text-[22px] text-[rgb(241,146,46)] cursor-pointer"
          />
        </div>{" "}
        <figure className="flex  flex-col items-center">
          <span
            className="font-bold text-[#fff]"
            style={{
              fontSize: "2rem",
              textAlign: "center",
              textTransform: "uppercase",
            }}
          >
            {" "}
            ADMIN PANEL
          </span>
        </figure>
        <nav className="py-6">
          {nav?.map((nav, index) => {
            return (
              <Link
                to={nav.link}
                key={index}
                style={{ textDecoration: "none", textTransform: "uppercase" }}
              >
                <span
                  className="flex my-3 items-center cursor-pointer text-gray-900  tracking-wider p-2 rounded-sm"
                  style={{ color: "#FFF" }}
                >
                  {nav.icon} {nav.name}
                </span>
              </Link>
            );
          })}
          <span
            className="flex my-3 items-center cursor-pointer text-gray-900    tracking-wider p-2 rounded-sm"
            onClick={() => logOut()}
            style={{ color: "#FFF", textTransform: "uppercase" }}
          >
            <BiLogOutCircle className="text-xl mr-3 rounded-full " /> LogOut
          </span>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
