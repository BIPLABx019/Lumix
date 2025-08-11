import { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../lib/axios";

const LoginPage = () => {
  const [loginData, setLoginData] = useState({
    usernameOrEmail: "",
    password: "",
  });

  const handleLogin = (e) => {
    e.preventDefault();
  }

  return (
    <div
      className="h-screen flex items-center justify-center p-4 sm:p-6 md:p-8"
      data-theme="light"
    >
      <div className="border border-primary/25 flex flex-col lg:flex-row w-full max-w-5xl mx-auto bg-base-100 rounded-xl overflow-hidden">
        <div className="w-full lg:w-1/2 p-4 sm:p-6 md:p-8 flex flex-col">
          <h1 className="text-2xl font-bold mb-4">Log In</h1>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block mb-2">Username/Email</label>
              <input
                type="text"
                className="input input-bordered w-full"
                value={loginData.usernameOrEmail}
                onChange={(e) => setLoginData({ ...loginData, usernameOrEmail: e.target.value })}
                required
              />
            </div>
            <div>
              <label className="block mb-2">Password</label>
              <input
                type="password"
                className="input input-bordered w-full"
                value={loginData.password}
                onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary w-full">
              Log In
            </button>
          </form>
          <p className="mt-4 text-sm text-gray-500">
            Don't have an account?{" "}
            <Link to="/signup" className="text-primary hover:underline">
                Sign Up
            </Link>
          </p>
        </div>

        <div className="w-[70%]">
          <img
            src="/images/login-illustration.svg"
            alt="Log In Illustration"
            className="w-full h-full hidden lg:block"
          />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
