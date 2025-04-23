import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [currentState, setCurrentState] = useState("Login");
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    navigate("/");
  };

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
            required
            type="text"
            placeholder="Name"
            className="border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
          />
        )}

        <input
          required
          type="email"
          placeholder="Email"
          className="border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
        />
        <input
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
