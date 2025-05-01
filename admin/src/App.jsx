import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import Navbar from "./components/Navbar";
import { Routes, Route } from "react-router-dom";

import "./App.css";
import Sidebar from "./components/Sidebar";
import AddItem from "./pages/AddItem";
import ListItem from "./pages/ListItem";
import Orders from "./pages/Orders";
import NotFound from "./components/NotFound";
import Login from "./components/Login";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));

  return (
    <>
      {token ? (
        <>
          <Navbar setToken={setToken} />
          <div className="flex min-h-screen">
            <Sidebar />
            <div className="flex-1 p-5">
              <Routes>
                <Route path="/add" element={<AddItem token={token} />} />
                <Route
                  path="/list"
                  element={<ListItem token={token} setToken={setToken} />}
                />
                <Route path="/orders" element={<Orders />} />
              </Routes>
            </div>
          </div>
        </>
      ) : (
        <Routes>
          <Route
            path="/login"
            element={<Login setToken={setToken} token={token} />}
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      )}
    </>
  );
}

export default App;
