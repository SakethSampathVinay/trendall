import React from "react";
import { useContext, useState, useEffect } from "react";
import { ShopContext } from "../Context/ShopContext";
import ProductItem from "./ProductItem";

const LatestCollections = () => {
  const { products, currency } = useContext(ShopContext);
  const [latestProducts, setLatestProducts] = useState([]);

  useEffect(() => {
    setLatestProducts(products.slice(0, 12));
  }, [products]);

  return (
    <div className="text-center">
      <h1 className="font-normal text-2xl text-center pt-5">
        Latest Collections
      </h1>
      <p className="font-light text-gray-600 pt-2">
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the
      </p>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 pt-5">
        {latestProducts.map((product) => (
          <ProductItem
            id={product.id}
            name={product.name}
            image={product.image}
            price={product.price}
            currency={currency}
          />
        ))}
      </div>
    </div>
  );
};

export default LatestCollections;
