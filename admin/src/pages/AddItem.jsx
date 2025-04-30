import React, { useState } from "react";
import { assets } from "../assets/assets";
import axios from "axios";

const AddItem = ({ token }) => {
  const [image1, setImage1] = useState("");
  const [image2, setImage2] = useState("");
  const [image3, setImage3] = useState("");
  const [image4, setImage4] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Men");
  const [subCategory, setSubCategory] = useState("Topwear");
  const [price, setPrice] = useState("");
  const [size, setSizes] = useState([]);
  const [bestSeller, setBestSeller] = useState(false);

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData();

      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("subCategory", subCategory);
      formData.append("bestSeller", bestSeller);
      formData.append("sizes", JSON.stringify(size));

      image1 && formData.append("image1", image1);
      image2 && formData.append("image2", image2);
      image3 && formData.append("image3", image3);
      image4 && formData.append("image4", image4);

      const response = await axios.post(
        `${backendUrl}/api/product/add`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log(response.data);
    } catch (error) {
      console.log("Error Submitting Form: ", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col">
      <h1>Upload Image</h1>

      <div className="flex flex-row justify-start items-center gap-4 mt-5">
        <label htmlFor="image1">
          <img
            htmlFor="image1"
            src={!image1 ? assets.upload_area : URL.createObjectURL(image1)}
            alt="upload area"
            className="h-20"
          />
          <input
            onChange={(e) => setImage1(e.target.files[0])}
            id="image1"
            type="file"
            hidden
          />
        </label>
        <label htmlFor="image2">
          <img
            htmlFor="image2"
            src={!image2 ? assets.upload_area : URL.createObjectURL(image2)}
            alt="upload area"
            className="h-20"
          />
          <input
            onChange={(e) => setImage2(e.target.files[0])}
            id="image2"
            type="file"
            hidden
          />
        </label>
        <label htmlFor="image3">
          <img
            htmlFor="image3"
            src={!image3 ? assets.upload_area : URL.createObjectURL(image3)}
            alt="upload area"
            className="h-20"
          />
          <input
            onChange={(e) => setImage3(e.target.files[0])}
            id="image3"
            type="file"
            hidden
          />
        </label>
        <label htmlFor="image4">
          <img
            htmlFor="image4"
            src={!image4 ? assets.upload_area : URL.createObjectURL(image4)}
            alt="upload area"
            className="h-20"
          />
          <input
            onChange={(e) => setImage4(e.target.files[0])}
            id="image4"
            type="file"
            hidden
          />
        </label>
      </div>

      <div className="flex flex-col gap-2 mt-5">
        <label htmlFor="productname">Product name</label>
        <input
          onChange={(e) => setName(e.target.value)}
          value={name}
          id="productname"
          type="text"
          placeholder="Type here"
          className="w-75 p-2 border border-gray-200 rounded-md"
        />
      </div>

      <div className="flex flex-col gap-2 mt-5">
        <label htmlFor="productname">Product description</label>
        <textarea
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          id="productname"
          type="text"
          placeholder="Write content here"
          className="w-75 p-2 border border-gray-200 rounded-md"
        ></textarea>
      </div>

      <div className="flex flex-row gap-2 mt-5">
        <div className="flex flex-col gap-2">
          <label htmlFor="productcategory">Product category</label>
          <select
            id="productcategory"
            className="w-75 p-2 border border-gray-200 rounded-md"
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="men">Men</option>
            <option value="women">Women</option>
            <option value="kids">Kids</option>
          </select>
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="Subcategory">Sub category</label>
          <select
            onChange={(e) => setSubCategory(e.target.value)}
            id="Subcategory"
            className="w-75 p-2 border border-gray-200 rounded-md"
          >
            <option value="Topwear" selected>
              Topwear
            </option>
            <option value="Bottomwear">Bottomwear</option>
            <option value="Winterwear">Winterwear</option>
          </select>
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="ProductPrice">Product Price</label>
          <input
            onChange={(e) => setPrice(e.target.value)}
            value={price}
            id="ProductPrice"
            type="number"
            placeholder="25"
            className="w-25 p-2 border border-gray-200 rounded-md"
          />
        </div>
      </div>

      <div className="mt-5">
        <h1>Product Sizes</h1>
        <div className="flex flex-row gap-2 mt-5">
          <div
            onClick={() =>
              setSizes((prev) =>
                prev.includes("S")
                  ? prev.filter((item) => item !== "S")
                  : [...prev, "S"]
              )
            }
            className={`${
              size.includes("S") ? "bg-black text-white" : "bg-white-200 border"
            } p-3 rounded-md cursor-pointer`}
          >
            <p>S</p>
          </div>
          <div
            onClick={() =>
              setSizes((prev) =>
                prev.includes("M")
                  ? prev.filter((item) => item !== "M")
                  : [...prev, "M"]
              )
            }
            className={`${
              size.includes("M") ? "bg-black text-white" : "bg-white-200 border"
            } p-3 rounded-md cursor-pointer`}
          >
            <p>M</p>
          </div>
          <div
            onClick={() =>
              setSizes((prev) =>
                prev.includes("L")
                  ? prev.filter((item) => item !== "L")
                  : [...prev, "L"]
              )
            }
            className={`${
              size.includes("L") ? "bg-black text-white" : "bg-white-200 border"
            } p-3 rounded-md cursor-pointer`}
          >
            <p>L</p>
          </div>
          <div
            onClick={() =>
              setSizes((prev) =>
                prev.includes("XL")
                  ? prev.filter((item) => item !== "XL")
                  : [...prev, "XL"]
              )
            }
            className={`${
              size.includes("XL")
                ? "bg-black text-white"
                : "bg-white-200 border"
            } p-3 rounded-md cursor-pointer`}
          >
            <p>XL</p>
          </div>
          <div
            onClick={() =>
              setSizes((prev) =>
                prev.includes("XXL")
                  ? prev.filter((item) => item !== "XXL")
                  : [...prev, "XXL"]
              )
            }
            className={`${
              size.includes("XXL")
                ? "bg-black text-white"
                : "bg-white-200 border"
            } p-3 rounded-md cursor-pointer`}
          >
            <p>XXL</p>
          </div>
        </div>
      </div>

      <div className="mt-5">
        <input
          onChange={() => setBestSeller((prev) => !prev)}
          id="bestSeller"
          type="checkbox"
          checked={bestSeller}
        />
        <label htmlFor="bestSeller" className="p-3">
          Add to bestseller
        </label>
      </div>

      <button
        type="submit"
        className="bg-black p-3 w-15 text-white mt-5 cursor-pointer"
      >
        ADD
      </button>
    </form>
  );
};

export default AddItem;
