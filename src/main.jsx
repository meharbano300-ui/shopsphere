import React from "react";
import ReactDOM from 'react-dom/client';
import { createRoot } from "react-dom/client";
import { BrowserRouter , Routes, Route, } from 'react-router-dom';
import App from "./App.jsx";
import "./index.css";
import Product_Listing from "./Components/Product_Listing";
import Product_Listing2 from "./Components/Product_Listing2";
import Product_Listing3 from "./Components/Product_Listing3";
import Product_Listing4 from "./Components/Product_Listing4";
import Product_Listing5 from "./Components/Product_Listing5";
import Product_Listing6 from "./Components/Product_Listing6";
import Product_Detail  from "./Components/Product_Detail";
import Shop from "./Components/Shop";
import Cart_Page from "./Components/Cart_Page.jsx";
import LoginModal from "./Components/LoginModal";
import SignUp from "./Components/SignUp"; 
import UserProfile from "./Components/UserProfile";
import Checkout from "./Components/Checkout";
import Services from "./Components/Services";
import DealsModal from "./Components/DealsModal";
import Categories from "./Components/Categories";
import PriceModal from "./Components/PriceModal";


//  Only one root declaration
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/Product_Listing" element={<Product_Listing />} />
        <Route path="/Product_Detail" element={<Product_Detail/>} />
        <Route path="/Product_Listing2" element={<Product_Listing2/>} />
        <Route path="/Product_Listing3" element={<Product_Listing3/>} />
        <Route path="/Product_Listing4" element={<Product_Listing4/>} />
        <Route path="/Product_Listing5" element={<Product_Listing5/>} />
        <Route path="/Product_Listing6" element={<Product_Listing6/>} />
         <Route path="/Services" element={<Services/>} />
        <Route path="/Shop" element={<Shop/>} />
         <Route path="/Cart_Page" element={<Cart_Page />} />
         <Route path="/LoginModal" element={<LoginModal />} />
         <Route path="/UserProfile" element={<UserProfile />} />
         <Route path="/Checkout" element={<Checkout/>} />
          <Route path="/SignUp" element={<SignUp />} />
         <Route path="/DealsModal" element={<DealsModal />} />
         <Route path="/Categories" element={<Categories/>} />
         <Route path="/PriceModal" element={<PriceModal/>} />
        <Route path="/cart" element={<Cart_Page />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);


