import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useContext } from "react";
import { ShopContext } from "../Context/ShopContext";
import { assets } from "../assets/assets";
import RelatedProducts from "../components/RelatedProducts";
import axios from "axios";

const Product = () => {
  const { productId } = useParams();
  const { products, currency, addToCart, backendUrl } = useContext(ShopContext);
  const [productData, setProductData] = useState(null);
  const [image, setImage] = useState("");
  const [sizeEl, setSizeEl] = useState("");
  const [error, setError] = useState(null); // State for error handling
  const [loading, setLoading] = useState(true); // State for loading

  // Fetch product from API
  const getProductItem = async () => {
    try {
      const response = await axios.get(
        `${backendUrl}/api/product/single/${productId}`
      );
      if (response.data.success) {
        const product = response.data.product;
        const imageArray = product.image.split(",");
        const sizeArray = JSON.parse(product.sizes);

        console.log(product, imageArray, sizes);

        setProductData({
          ...product,
          image: imageArray,
          sizes: sizeArray,
        });
        setImage(imageArray[0]);
        setLoading(false);
      } else {
        setError("Product not found");
        setLoading(false);
      }
    } catch (error) {
      setError("Error fetching product data");
      setLoading(false);
    }
  };

  // Fetch product from context if available
  const fetchProductData = () => {
    const product = products.find((p) => p.id === Number(productId));
    if (product) {
      const imageArray = product.image.split(",");
      const sizeArray = JSON.parse(product.sizes);

      setProductData({ ...product, image: imageArray, sizes: sizeArray });
      setImage(imageArray[0]);
      setLoading(false);
    } else {
      getProductItem(); // Fallback to API call if product not found in context
    }
  };

  useEffect(() => {
    if (products.length > 0) {
      fetchProductData();
    } else {
      getProductItem();
    }
    window.scrollTo(0, 0);
  }, [products, productId]); // Dependency on products and productId

  // Loading and error states
  if (loading) {
    return (
      <div className="flex justify-center items-center">
        <div className="spinner-border" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
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
                  alt={`product-${index}`}
                />
              ))}
            </div>
            <div className="w-full sm:w-[80%]">
              <img
                className="w-full h-auto"
                src={image || assets.fallbackImage}
                alt={productData.name}
              />
            </div>
          </div>
          <div className="flex-1">
            <h1 className="font-medium text-2xl mt-2">{productData.name}</h1>
            <div className="flex items-center gap-1 mt-2">
              {[...Array(5)].map((_, i) => (
                <img src={assets.star_icon} alt="" className="w-3.5" key={i} />
              ))}
              <p className="pl-2">122</p>
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
            <button
              onClick={() => addToCart(productData.id, sizeEl)}
              className={`bg-black text-white px-8 py-3 text-sm active:bg-gray-700 cursor-pointer ${
                !sizeEl ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={!sizeEl} // Disable button if no size selected
            >
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
            <p className="border px-5 py-3 text-sm">Reviews 122</p>
          </div>
          <div className="flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500">
            <p>
              Trendall is your go-to fashion destination for the latest trends
              in clothing and style. From casual basics to statement pieces, we
              bring you high-quality apparel for every occasion. Discover a
              seamless shopping experience with fast delivery and easy returns.
              Stay ahead in style — only with Trendall.
            </p>
            <p>
              At Trendall, we believe fashion should be accessible, expressive,
              and effortless. Our curated collections are updated regularly to
              keep up with the ever-evolving style scene. Whether you're
              dressing for college, work, or a night out, Trendall has something
              for everyone. Join thousands of fashion-forward users and redefine
              your wardrobe with confidence.
            </p>
          </div>
        </div>

        <RelatedProducts
          category={productData.category}
          subCategory={productData.subCategory}
        />
      </div>
    </div>
  );
};

export default Product;
