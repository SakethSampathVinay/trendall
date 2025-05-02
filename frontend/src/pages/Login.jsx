import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ShopContext } from "../Context/ShopContext";

const Login = () => {
  const [currentState, setCurrentState] = useState("Register");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [token, setToken] = useState("");

  const { backendUrl, token, setToken } = useContext(ShopContext);

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (currentState === "Register") {
        const response = await axios.post(`${backendUrl}/api/user/register`, {
          name,
          email,
          password,
        });

        console.log(response.data);
        console.log(response.data.token);

        if (response.data.success) {
          setToken(response.data.token);
          localStorage.setItem("token", response.data.token);
          console.log("Registered Successfully");
        } else {
          console.log("Error doing Sign up");
        }
      } else {
        const response = await axios.post(`${backendUrl}/api/user/login`, {
          email,
          password,
        });

        console.log(response.data);
        console.log(response.data.token);

        if (response.data.success) {
          setToken(response.data.token);
          localStorage.setItem("token", response.data.token);
          console.log("Login Successfullly");
        } else {
          console.log("Error doing Login");
        }
      }
    } catch (error) {
      console.log("Error Getting into the app", error);
    }
  };

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 w-[400px] p-8 shadow-md rounded-lg"
      >
        <h1 className="text-2xl text-gray-700 font-bold text-center mb-2">
          {currentState}
        </h1>

        {currentState === "Register" && (
          <input
            onChange={(e) => setName(e.target.value)}
            value={name}
            required
            type="text"
            placeholder="Name"
            className="border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
          />
        )}

        <input
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          required
          type="email"
          placeholder="Email"
          className="border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
        />
        <input
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          required
          type="password"
          placeholder="Password"
          className="border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
        />

        <button
          type="submit"
          className="bg-black text-white py-2 rounded-lg w-full hover:bg-gray-900 transition"
        >
          {currentState}
        </button>

        <p className="text-center text-sm text-gray-600">
          {currentState === "Login" ? (
            <>
              Don't have an account?{" "}
              <span
                onClick={() => setCurrentState("Register")}
                className="text-black font-medium cursor-pointer"
              >
                Register
              </span>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <span
                onClick={() => setCurrentState("Login")}
                className="text-black font-medium cursor-pointer"
              >
                Login
              </span>
            </>
          )}
        </p>
      </form>
    </div>
  );
};

export default Login;
