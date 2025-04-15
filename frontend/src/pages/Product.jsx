import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useContext } from "react";
import { ShopContext } from "../Context/ShopContext";
import { assets } from "../assets/assets";
import RelatedProducts from "../components/RelatedProducts";

const Product = () => {
  const { productId } = useParams();
  const { products, currency } = useContext(ShopContext);
  const [productData, setProductData] = useState(false);
  const [image, setImage] = useState("");
  const [sizeEl, setSizeEl] = useState("");

  const fetchProductData = async () => {
    products.map((product) => {
      if (product._id === productId) {
        setProductData(product);
        setImage(product.image[0]);
        console.log(product.image[0]);
        console.log(product);
      }
    });
  };

  useEffect(() => {
    fetchProductData();
  }, [products, productId]);

  return (
    <div>
      {productData && (
        <div className="border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100">
          <div className="flex gap-12 sm:gap-12 flex-col sm:flex-row">
            <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
              <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full">
                {productData.image.map((img, index) => (
                  <img
                    onClick={() => setImage(img)}
                    src={img}
                    key={index}
                    className="w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer"
                  />
                ))}
              </div>
              <div className="w-full sm:w-[80%]">
                <img className="w-full h-auto" src={image} alt="" />
              </div>
            </div>
            <div className="flex-1">
              <h1 className="font-medium text-2xl mt-2">{productData.name}</h1>
              <div className="flex items-center gap-1 mt-2">
                <img src={assets.star_icon} alt="" className="w-3 5" />
                <img src={assets.star_icon} alt="" className="w-3 5" />
                <img src={assets.star_icon} alt="" className="w-3 5" />
                <img src={assets.star_icon} alt="" className="w-3 5" />
                <img src={assets.star_icon} alt="" className="w-3 5" />
                <p className="pl-2">{122}</p>
              </div>
              <p className="mt-5 text-3xl font-medium">
                {currency} {productData.price}
              </p>
              <p className="mt-5 text-gray-500 md:w-4/5">
                {productData.description}
              </p>
              <div className="flex flex-col gap-4 my-8">
                <p>Select Size</p>
                <div className="flex gap-2">
                  {productData.sizes.map((size, index) => (
                    <button
                      onClick={() => setSizeEl(size)}
                      className={`border py-2 px-4 bg-gray-100 ${
                        size === sizeEl ? `border-orange-500` : ``
                      }`}
                      key={index}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
              <button className="bg-black text-white px-8 py-3 text-sm active:bg-gray-700 ">
                ADD TO CART
              </button>
              <hr className="mt-8 sm:2-4/5" />
              <div className="text-sm text-gray-500 mt-5 flex flex-col gap-1">
                <p>100% Original product.</p>
                <p>Cash on delivery is available on this product.</p>
                <p>Easy return and exchange policy within 7 days.</p>
              </div>
            </div>
          </div>
          <div className="mt-20">
            <div className="flex">
              <b className="border px-5 py-3 text-sm">Description</b>
              <p className="border px-5 py-3 text-sm">Reviews {122}</p>
            </div>
            <div className="flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500">
              <p>An e-commerce dummy text</p>
              <p>E Commerce websites typically display</p>
            </div>
          </div>

          <RelatedProducts
            category={productData.category}
            subCategory={productData.subCategory}
          />
        </div>
      )}
    </div>
  );
};

export default Product;
