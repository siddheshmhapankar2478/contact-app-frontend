"use client";

import { useState } from "react";
import Link from "next/link";

import useFetchData from "./hooks/useFetchData";

export default function Register() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [currentScreen, setCurrentScreen] = useState("login");
  const [registerData, registerLoading, error, handleRegister] = useFetchData(
    `/api/user/register`,
    {
      makeApiCall: false,
      method: "POST",
    }
  );
  const [loginData, loginLoading, loginError, handleLogin] = useFetchData(
    `/api/user/login`,
    {
      makeApiCall: false,
      method: "POST",
    }
  );

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    await handleRegister(form);

    if (registerData) {
      console.log(registerData);
    }
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    await handleLogin(form);

    if (loginData) {
      console.log(loginData);
    }
  };

  const signupData = {
    login: {
      heading: "Welcome Back",
      button: "Login",
      toggleText: "Don't have an account?",
      toggleAction: "Sign Up",
      toggleActionFunction: () => setCurrentScreen("signup"),
      handleSubmit: handleLoginSubmit,
      loading: loginLoading,
    },
    signup: {
      heading: "Create Account",
      button: "Sign Up",
      toggleText: "Already have an account?",
      toggleAction: "Login",
      toggleActionFunction: () => setCurrentScreen("login"),
      handleSubmit: handleRegisterSubmit,
      loading: registerLoading,
    },
  };

  const screenData = signupData[currentScreen];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-purple-200 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 sm:p-10">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          {screenData.heading}
        </h2>
        <form onSubmit={screenData.handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
              placeholder="Enter your email"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
              placeholder="Create a password"
            />
          </div>
          <button
            type="submit"
            className={`w-full py-2 rounded-lg font-semibold flex justify-center items-center transition duration-200 ${
              screenData.loading
                ? "bg-blue-300 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 text-white"
            }`}
          >
            {screenData.button}
          </button>
        </form>
        <p className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link
            href="/"
            onClick={screenData.toggleActionFunction}
            className="text-blue-600 font-medium hover:underline"
          >
            {screenData.toggleAction}
          </Link>
        </p>
      </div>
    </div>
  );
}
