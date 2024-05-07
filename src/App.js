/** @format */
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./Pages/Login";
import ECategory from "./Pages/ECategory";
import Order from "./Pages/Orders/Order";
import SingleOrder from "./Pages/Orders/SingleOrder";
import Product from "./Pages/Product/Product";
import CreateProduct from "./Pages/Product/CreateProduct";
import EditProduct from "./Pages/Product/EditProduct";
import UserData from "./Pages/Customer/UserData";
import Faq from "./Pages/FAQ/Faq";
import { ReactNotifications } from "react-notifications-component";
import { useEffect } from "react";
import AdBanner from "./Pages/Banner/AdBanner";
import ForgetPassword from "./Pages/ForgetPassword";
import Dashboard from "./Pages/Dashboard";
import Customers from "./Pages/Customer/Customers";
import EditCustomer from "./Pages/Customer/EditCustomer";
import CustomerOrder from "./Pages/Customer/CustomerOrder";
import CustomerDiscount from "./Pages/Customer/CustomerDiscount";
import Vendors from "./Pages/Vendors/Vendors";
import CreateVendor from "./Pages/Vendors/CreateVendor";
import SubCategory from "./Pages/SubCategory";
import SingleProduct from "./Pages/Product/SingleProduct";
import ProductReviews from "./Pages/Product/ProductReviews";
import Inventory from "./Pages/Inventory/Inventory";
import ViewInventory from "./Pages/Inventory/ViewInventory";
import DeliveryCharges from "./Pages/Delivery Charges/DeliveryCharges";
import Payment from "./Pages/Payment/Payment";
import SubAdmin from "./Pages/SubAdmin/SubAdmin";
import Analytics from "./Pages/Analytics/Analytics";
import Discount from "./Pages/Discount/Discount";
import CreateDiscount from "./Pages/Discount/CreateDiscount";
import ViewDiscount from "./Pages/Discount/ViewDiscount";
import CreateBanner from "./Pages/Banner/CreateBanner";
import Support from "./Pages/Support/Support";
import Notification from "./Pages/Notification/Notification";
import Reviews from "./Pages/Reviews/Reviews";
import Privacy from "./Pages/Privacy/Privacy";

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
        <Route path="/Product" element={<Product />} />
        <Route path="/create-product" element={<CreateProduct />} />
        <Route path="/edit-product/:product" element={<EditProduct />} />
        <Route path="/product/:id" element={<SingleProduct />} />
        <Route path="/product-review/:id" element={<ProductReviews />} />
        <Route path="/Orders" element={<Order />} />
        <Route path="/order/:id" element={<SingleOrder />} />
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
        <Route path="/delivery-charges" element={<DeliveryCharges />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/sub-admin" element={<SubAdmin />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/coupon" element={<Discount />} />
        <Route path="/create-discount" element={<CreateDiscount />} />
        <Route path="/view-discount" element={<ViewDiscount />} />
        <Route path="/create-banner" element={<CreateBanner />} />
        <Route path="/customer-support" element={<Support />} />
        <Route path="/notification" element={<Notification />} />
        <Route path="/reviews" element={<Reviews />} />
        <Route path="/privacy" element={<Privacy />} />
      </Routes>
    </>
  );
}

export default App;
