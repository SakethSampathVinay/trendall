import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../Context/ShopContext.jsx";
import ProductItem from "../components/ProductItem";

const Collections = () => {
  const [filter, setFilter] = useState(false);
  const { products, currency } = useContext(ShopContext);
  const [allProducts, setAllProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [sortType, setSortType] = useState("relevant");

  const toggleCategory = (event) => {
    const value = event.target.value;
    categories.includes(value)
      ? setCategories((prev) => prev.filter((item) => item !== value))
      : setCategories((prev) => [...prev, value]);
  };

  const toggleSubCategory = (event) => {
    const value = event.target.value;
    subCategories.includes(value)
      ? setSubCategories((prev) => prev.filter((item) => item !== value))
      : setSubCategories((prev) => [...prev, value]);
  };

  const toggleFilter = () => {
    setFilter((prev) => !prev);
  };

  // Filter and sort products based on selected categories, subCategories, and sortType
  useEffect(() => {
    let filteredProducts = [...products];

    // Filter by category
    if (categories.length > 0) {
      filteredProducts = filteredProducts.filter((product) =>
        categories.includes(product.category)
      );
    }

    // Filter by subCategory
    if (subCategories.length > 0) {
      filteredProducts = filteredProducts.filter((product) =>
        subCategories.includes(product.subCategory)
      );
    }

    // Sort the products based on selected sort type
    if (sortType === "lowToHigh") {
      filteredProducts = filteredProducts.sort((a, b) => a.price - b.price);
    } else if (sortType === "highToLow") {
      filteredProducts = filteredProducts.sort((a, b) => b.price - a.price);
    }

    setAllProducts(filteredProducts);
  }, [products, categories, subCategories, sortType]);

  // Handle sort selection change
  const handleSortChange = (e) => {
    const selectedSortType = e.target.value;
    setSortType(selectedSortType);
  };

  return (
    <>
      <hr className="w-full border border-gray-200" />
      <div className="flex flex-col w-full md:flex-row">
        {/* Large Screen */}
        <div className="md:flex md:flex-col hidden mt-4">
          <h1 className="font-normal text-2xl mt-3 mb-1 ">FILTERS</h1>
          <div className="flex flex-col border border-gray-300 p-3 rounded-2lg w-50 mt-5">
            <h1 className="font-bold">CATEGORIES</h1>
            <label htmlFor="men">
              <input
                type="checkbox"
                id="men"
                value="Men"
                onChange={toggleCategory}
              />
              <span className="pl-2">Men</span>
            </label>
            <label htmlFor="women">
              <input
                type="checkbox"
                id="women"
                value="Women"
                onChange={toggleCategory}
              />
              <span className="pl-2">Women</span>
            </label>
            <label htmlFor="kids">
              <input
                type="checkbox"
                id="kids"
                value="Kids"
                onChange={toggleCategory}
              />
              <span className="pl-2">Kids</span>
            </label>
          </div>
          <div className="flex flex-col border border-gray-300 p-3 rounded-2lg w-50 mt-5">
            <h1 className="font-bold">TYPE</h1>
            <label htmlFor="Topwear">
              <input
                type="checkbox"
                id="Topwear"
                value="Topwear"
                onChange={toggleSubCategory}
              />
              <span className="pl-2">Topwear</span>
            </label>
            <label htmlFor="Bottomwear">
              <input
                type="checkbox"
                id="Bottomwear"
                value="Bottomwear"
                onChange={toggleSubCategory}
              />
              <span className="pl-2">Bottomwear</span>
            </label>
            <label htmlFor="Winterwear">
              <input
                type="checkbox"
                id="Winterwear"
                value="Winterwear"
                onChange={toggleSubCategory}
              />
              <span className="pl-2">Winterwear</span>
            </label>
          </div>
        </div>
        {/* Small Screen */}
        <div className="sm:flex md:hidden flex flex-col">
          <div className="flex flex-row">
            <h1 className="font-normal text-2xl mt-3 ">FILTERS</h1>
            <button className="text-2xl pl-3 pt-3" onClick={toggleFilter}>
              {filter ? "✖" : "☰"}
            </button>
          </div>
          {filter && (
            <div className="sm:flex sm:flex-col">
              <div className="flex flex-col border border-gray-300 p-3 rounded-2lg w-full mt-5">
                <h1 className="font-bold">CATEGORIES</h1>
                <label htmlFor="men">
                  <input type="checkbox" id="men" />
                  <span className="pl-2">Men</span>
                </label>
                <label htmlFor="women">
                  <input type="checkbox" id="women" />
                  <span className="pl-2">Women</span>
                </label>
                <label htmlFor="kids">
                  <input type="checkbox" id="kids" />
                  <span className="pl-2">Kids</span>
                </label>
              </div>
              <div className="flex flex-col border border-gray-300 p-3 rounded-2lg w-full mt-5">
                <h1 className="font-bold">TYPE</h1>
                <label htmlFor="Topwear">
                  <input type="checkbox" id="Topwear" />
                  <span className="pl-2">Topwear</span>
                </label>
                <label htmlFor="Bottomwear">
                  <input type="checkbox" id="Bottomwear" />
                  <span className="pl-2">Bottomwear</span>
                </label>
                <label htmlFor="Winterwear">
                  <input type="checkbox" id="Winterwear" />
                  <span className="pl-2">Winterwear</span>
                </label>
              </div>
            </div>
          )}
        </div>
        <div className="flex flex-col w-full">
          <div className="flex flex-row justify-center items-start mt-5 pl-3">
            <h1 className="text-gray-700 font-bold pt-2 pr-5">
              ALL COLLECTIONS
            </h1>
            <select
              className="border border-gray-400 p-2 ml-auto"
              onChange={handleSortChange}
              value={sortType}
            >
              <option value="relevant">Sort by: Relevant</option>
              <option value="lowToHigh">Sort by: Low to High</option>
              <option value="highToLow">Sort by: High to Low</option>
            </select>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 pt-5 ml-3">
            {allProducts.map((product) => (
              <ProductItem
                key={product._id}
                id={product._id}
                name={product.name}
                image={product.image}
                price={product.price}
                currency={currency}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Collections;
