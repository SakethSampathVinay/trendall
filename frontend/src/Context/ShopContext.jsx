import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  const currency = "$";
  const delivery_fee = 10;
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  // Initialize cartItems state from localStorage if available
  const [cartItems, setCartItems] = useState(() => {
    const localData = localStorage.getItem("cartItems");
    return localData ? JSON.parse(localData) : {}; // Default to an empty object if no data in localStorage
  });

  const [products, setProducts] = useState([]);
  const [token, setToken] = useState("");

  // Fetch products from the backend
  const getProductsData = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/product/list`);
      if (response.data.success) {
        setProducts(response.data.products);
      }
    } catch (error) {
      console.error("Error Fetching the Data: ", error);
    }
  };

  useEffect(() => {
    getProductsData();
  }, []);

  useEffect(() => {
    if (!token && localStorage.getItem("token")) {
      setToken(localStorage.getItem("token"));
    }
  }, []);

  // Add item to cart or increase quantity if item already exists
  const addToCart = (itemId, size) => {
    let cartData = structuredClone(cartItems);

    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1;
      } else {
        cartData[itemId][size] = 1;
      }
    } else {
      cartData[itemId] = {};
      cartData[itemId][size] = 1;
    }

    // Save the updated cartItems to localStorage
    localStorage.setItem("cartItems", JSON.stringify(cartData));

    setCartItems(cartData);
  };

  // Update quantity of an item or remove it if quantity is 0
  const updateQuantity = (itemId, size, quantity) => {
    let cartData = structuredClone(cartItems);

    if (quantity <= 0) {
      if (cartData[itemId]) {
        delete cartData[itemId][size];
        if (Object.keys(cartData[itemId]).length === 0) {
          delete cartData[itemId];
        }
      }
    } else {
      if (!cartData[itemId]) {
        cartData[itemId] = {};
      }
      cartData[itemId][size] = quantity;
    }

    // Save the updated cartItems to localStorage
    localStorage.setItem("cartItems", JSON.stringify(cartData));

    setCartItems(cartData);
  };

  // Calculate total price of items in the cart
  const getTotalPrice = () => {
    let total = 0;
    for (const productId in cartItems) {
      for (const size in cartItems[productId]) {
        const product = products.find((item) => item.id === Number(productId));
        if (product) {
          total += product.price * cartItems[productId][size];
        }
      }
    }
    return total;
  };

  // Calculate total number of items in the cart
  const getTotalItemsCount = () => {
    let total = 0;
    for (const productId in cartItems) {
      for (const size in cartItems[productId]) {
        total += cartItems[productId][size];
      }
    }
    return total;
  };

  const value = {
    products,
    currency,
    delivery_fee,
    cartItems,
    addToCart,
    setCartItems,
    updateQuantity,
    getTotalPrice,
    getTotalItemsCount,
    backendUrl,
    token,
    setToken,
  };

  return (
    <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>
  );
};

export default ShopContextProvider;
