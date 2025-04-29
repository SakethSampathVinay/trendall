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
  const [token, setToken] = useState(null);

  return (
    <>
      {token ? (
        <>
          <Navbar setToken={setToken} />
          <div className="flex min-h-screen">
            <Sidebar />
            <div className="flex-1 p-5">
              <Routes>
                <Route path="/add" element={<AddItem />} />
                <Route path="/list" element={<ListItem />} />
                <Route path="/orders" element={<Orders />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </div>
          </div>
        </>
      ) : (
        <Routes>
          <Route path="/" element={<Login setToken={setToken} />} />
          <Route path="/login" element={<Login setToken={setToken} />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      )}
    </>
  );
}

export default App;
