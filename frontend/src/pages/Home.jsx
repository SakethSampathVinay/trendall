import React from "react";
import Hero from "../components/Hero";
import LatestCollections from "../components/LatestCollections.jsx";
import BestSellers from "../components/BestSellers.jsx";
import OurPolicy from "../components/OurPolicy.jsx";
import NewsletterBox from "../components/NewsletterBox.jsx";
import Footer from "../components/Footer.jsx";

const Home = () => {
  return (
    <div>
      <Hero />
      <LatestCollections />
      <BestSellers />
      <OurPolicy />
      <NewsletterBox />
    </div>
  );
};

export default Home;
