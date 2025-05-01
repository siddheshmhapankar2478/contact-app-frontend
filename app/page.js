"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import useFetchData from "./hooks/useFetchData";
import { setCookie } from "./utils/utilityFunction";

const formFields = [
  {
    name: "name",
    label: "Full Name",
    placeholder: "Enter your full name",
    type: "text",
    showFor: "signup",
  },
  {
    name: "email",
    label: "Email Address",
    placeholder: "Enter your email",
    type: "email",
  },
  {
    name: "password",
    label: "Password",
    placeholder: "Create a password",
    type: "password",
  },
];

const Register = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [currentScreen, setCurrentScreen] = useState("login");
  const {
    isLoading: registerLoading,
    setIsLoading: setRegisterLoading,
    fetchData: handleRegister,
  } = useFetchData({
    url: `/api/user/register`,
    makeApiCall: false,
    method: "POST",
  });
  const {
    isLoading: loginLoading,
    setIsLoading: setLoginLoading,
    fetchData: handleLogin,
  } = useFetchData({
    url: `/api/user/login`,
    makeApiCall: false,
    method: "POST",
  });

  const router = useRouter();

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await handleRegister(form);

      if (response.data) {
        setCurrentScreen("login");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setRegisterLoading(false);
    }
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    try {
      const { email, password } = form;
      const response = await handleLogin({ email, password });

      if (response.data) {
        const { token, user_id } = response.data;

        setCookie({ key: "session_data", value: { user_id, token } });
        router.replace("/dashboard");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoginLoading(false);
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
    },
    signup: {
      heading: "Create Account",
      button: "Sign Up",
      toggleText: "Already have an account?",
      toggleAction: "Login",
      toggleActionFunction: () => setCurrentScreen("login"),
      handleSubmit: handleRegisterSubmit,
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
          {formFields
            .filter(
              (field) => !field.showFor || field.showFor === currentScreen
            )
            .map((field) => (
              <div key={field.name}>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {field.label}
                </label>
                <input
                  type={field.type}
                  value={form[field.name]}
                  onChange={(e) =>
                    setForm({ ...form, [field.name]: e.target.value })
                  }
                  required
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-40 text-black"
                  placeholder={field.placeholder}
                />
              </div>
            ))}

          {console.log({ loginLoading, registerLoading })}
          <button
            type="submit"
            className={`w-full py-2 rounded-lg font-semibold flex justify-center items-center transition duration-200 ${
              loginLoading || registerLoading
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
};

export default Register;
