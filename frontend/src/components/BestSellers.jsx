import React, { useContext, useState, useEffect } from "react";
import { ShopContext } from "../Context/ShopContext";
import ProductItem from "./ProductItem";

const BestSellers = () => {
  const { products, currency } = useContext(ShopContext);
  const [bestSellers, setBestSellers] = useState([]);

  useEffect(() => {
    const bestSeller = products.filter(
      (product) => product.bestSeller === true || product.bestSeller === "true"
    );
    console.log(bestSeller);
    setBestSellers(bestSeller.slice(0, 4));
  }, [products]);

  return (
    <div className="text-center">
      <h1 className="font-normal text-2xl text-center pt-5">Best Sellers</h1>
      <p className="font-light text-gray-600 pt-2">
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the
      </p>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 pt-5">
        {bestSellers.map((product) => (
          <ProductItem
            id={product._id}
            image={product.image}
            name={product.name}
            price={product.price}
            currency={currency}
          />
        ))}
      </div>
    </div>
  );
};

export default BestSellers;
