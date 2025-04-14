import React from "react";
import { useContext } from "react";
import { ShopContext } from "../Context/ShopContext";
import { Link } from "react-router-dom";

const ProductItem = ({ id, name, price, image }) => {
  const { currency } = useContext(ShopContext);

  return (
    <div>
      <Link className="text-gray-700 cursor-pointer" to={`/product/${id}`}>
        <div className="overflow-hidden">
          <img src={image} className="w-full object-cover" alt={name} />
        </div>
        <p className="text-gray-500 font-normal">{name}</p>
        <p className="font-bold text-gray-800">
          {currency} {price}
        </p>
      </Link>
    </div>
  );
};

export default ProductItem;
