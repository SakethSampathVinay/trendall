import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const ListItem = ({ token, setToken }) => {
  const [list, setList] = useState([]);

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const removeProduct = async (id) => {
    try {
      const response = await axios.delete(
        `${backendUrl}/api/product/remove/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        console.log("Deleted Successfully");
        console.log(response.data.success);
        await fetchList();
        setList((prev) => prev.filter((item) => item.id !== id));
      } else {
        console.log("Error Deleting the Data");
      }
    } catch (error) {
      console.log("Error Deleting the Data: ", error);
    }
  };

  const fetchList = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/product/list`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.data.success) {
        setList(response.data.products);
        console.log(response.data.products);
      } else {
        console.log("Error fetching the data");
      }
    } catch (error) {
      console.log("Error Fetching the Data: ", error);
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <>
      {list.length > 0 ? (
        <div className="overflow-x-auto">
          <h1 className="text-xl font-bold mb-4">All Products List</h1>
          <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
            <thead className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
              <tr>
                <th className="py-3 px-6 text-left">Image</th>
                <th className="py-3 px-6 text-left">Name</th>
                <th className="py-3 px-6 text-left">Category</th>
                <th className="py-3 px-6 text-left">Price</th>
                <th className="py-3 px-6 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="text-gray-700 text-sm">
              {list.map((item, index) => (
                <tr key={index} className="border-b border-gray-200">
                  <td className="py-3 px-6">
                    <img
                      src={item.image.split(",")[0]}
                      alt={item.name}
                      className="h-16 w-16 object-cover"
                    />
                  </td>
                  <td className="py-3 px-6">{item.name}</td>
                  <td className="py-3 px-6">{item.category}</td>
                  <td className="py-3 px-6">₹{item.price}</td>
                  <td className="py-3 px-6 text-center">
                    <button
                      onClick={() => removeProduct(item.id)}
                      className="text-red-600 hover:underline ml-4 cursor-pointer"
                    >
                      X
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <h1 className="flex flex-row justify-center items-center">
          NO PRODUCTS TO DISPLAY
        </h1>
      )}
    </>
  );
};

export default ListItem;
