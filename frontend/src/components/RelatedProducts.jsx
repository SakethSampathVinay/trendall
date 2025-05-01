import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../Context/ShopContext";
import ProductItem from "./ProductItem";

const RelatedProducts = ({ category, subCategory }) => {
  const { products } = useContext(ShopContext);
  const [relatedProduct, setRelatedProduct] = useState([]);

  useEffect(() => {
    if (products.length > 0) {
      const filteredProducts = products.filter((product) => {
        return (
          product.category === category && product.subCategory === subCategory
        );
      });
      setRelatedProduct(filteredProducts.slice(0, 5));
      window.scrollTo(0, 0);
    }
  }, [category, subCategory, products]);

  return (
    <div>
      <h1 className="text-gray-700 text-2xl font-bold pt-2 pr-5">
        Related Products
      </h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5 mt-5">
        {relatedProduct.map((item, index) => (
          <ProductItem
            key={index}
            id={item.id}
            name={item.name}
            image={item.image.split(",")[0]}
            price={item.price}
          />
        ))}
      </div>
    </div>
  );
};

export default RelatedProducts;
