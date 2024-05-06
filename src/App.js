/** @format */
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./E-CommerceAdmin/forms/Login";
import ECategory from "./Pages/ECategory";
import Order from "./E-CommerceAdmin/pages/Orders/Order";
import SingleOrder from "./E-CommerceAdmin/pages/Orders/SingleOrder";
import Product from "./Pages/Product/Product";
import CreateProduct from "./Pages/Product/CreateProduct";
import EditProduct from "./Pages/Product/EditProduct";
import AboutUs from "./E-CommerceAdmin/pages/AboutUs/AboutUs";
import CreateAboutUs from "./E-CommerceAdmin/pages/AboutUs/create-about-us";
import Blog from "./E-CommerceAdmin/pages/Blog/Blog";
import UserData from "./Pages/Customer/UserData";
import Brand from "./E-CommerceAdmin/pages/Brand";
import Nutrition from "./E-CommerceAdmin/pages/Nutrition";
import Faq from "./E-CommerceAdmin/pages/FAQ/Faq";
import Gallery from "./E-CommerceAdmin/pages/Gallery/Gallery";
import { ReactNotifications } from "react-notifications-component";
import { useEffect } from "react";
import AdBanner from "./E-CommerceAdmin/pages/AdBanner";
import Events from "./E-CommerceAdmin/pages/Events";
import ForgetPassword from "./Pages/ForgetPassword";
import Dashboard from "./Pages/Dashboard";
import Customers from "./Pages/Customer/Customers";
import EditCustomer from "./Pages/Customer/EditCustomer";
import CustomerOrder from "./Pages/Orders/CustomerOrder";
import CustomerDiscount from "./Pages/Customer/CustomerDiscount";
import Vendors from "./Pages/Vendors/Vendors";
import CreateVendor from "./Pages/Vendors/CreateVendor";
import SubCategory from "./Pages/SubCategory";
import SingleProduct from "./Pages/Product/SingleProduct";
import ProductReviews from "./Pages/Product/ProductReviews";
import Inventory from "./Pages/Inventory/Inventory";
import ViewInventory from "./Pages/Inventory/ViewInventory";

function App() {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "instant",
    });
  }, []);
  return (
    <>
      <ToastContainer
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <ReactNotifications />

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/user" element={<Customers />} />
        <Route path="/user-data/:id" element={<UserData />} />
        <Route path="/adBanner" element={<AdBanner />} />
        <Route path="/Category" element={<ECategory />} />
        <Route path="/grocery-stores" element={<Nutrition />} />
        <Route path="/Product" element={<Product />} />
        <Route path="/create-product" element={<CreateProduct />} />
        <Route path="/edit-product/:product" element={<EditProduct />} />
        <Route path="/product/:id" element={<SingleProduct />} />
        <Route path="/product-review/:id" element={<ProductReviews />} />
        <Route path="/hotDeals" element={<Gallery />} />
        <Route path="/brand" element={<Brand />} />
        <Route path="/blogs" element={<Blog />} />
        <Route path="/events" element={<Events />} />
        <Route path="/Orders" element={<Order />} />
        <Route path="/order/:id" element={<SingleOrder />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/create-about-us" element={<CreateAboutUs />} />
        <Route path="/faq" element={<Faq />} />
        <Route path="/forget-password" element={<ForgetPassword />} />
        <Route path="/edit-customer/:id" element={<EditCustomer />} />
        <Route path="/customer-order" element={<CustomerOrder />} />
        <Route path="/customer-discount" element={<CustomerDiscount />} />
        <Route path="/vendors" element={<Vendors />} />
        <Route path="/create-vendors" element={<CreateVendor />} />
        <Route path="/sub-category" element={<SubCategory />} />
        <Route path="/inventory" element={<Inventory />} />
        <Route path="/view-inventory" element={<ViewInventory />} />
      </Routes>
    </>
  );
}

export default App;
