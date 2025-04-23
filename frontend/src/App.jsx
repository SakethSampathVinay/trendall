import React from "react";
import Navbar from "./components/Navbar";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Footer from "./components/Footer.jsx";
import Collections from "./pages/Collections.jsx";
import Product from "./pages/Product.jsx";
import Cart from "./pages/Cart.jsx";
import PlaceOrder from "./pages/PlaceOrder.jsx";
import Orders from "./pages/Orders.jsx";
import About from "./pages/About.jsx";
import Contact from "./pages/ContactUs.jsx";

const App = () => {
  return (
    <div className="pl-10 pr-10 pt-3 md:pl-25 md:pr-25">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/collection" element={<Collections />} />
        <Route path="/product/:productId" element={<Product />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/place-order" element={<PlaceOrder />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
