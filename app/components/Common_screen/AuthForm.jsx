"use client";

import { useState } from "react";
import LoginForm from "../Small_screen/Login";
import SignupForm from "../Small_screen/Signup";

export default function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="bg-white p-4 rounded-xl shadow-md">
      
      {/* Sliding Toggle */}
      <div className="relative w-64 mx-auto mb-6">
        {/* Toggle Background */}
        <div className="flex justify-between items-center bg-gray-200 rounded-full p-1 relative shadow-inner">
          {/* Sliding Indicator */}
          <div
            className={`absolute top-1 left-1 h-8 w-30 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full transition-all duration-300 ease-in-out ${
              isLogin ? "translate-x-0 w-[48%]" : "translate-x-full w-[48%]"
            }`}
          />

          {/* Login Option */}
          <button
            onClick={() => setIsLogin(true)}
            className={`z-10 w-1/2 text-sm font-semibold py-2 rounded-full transition-colors duration-300 ${
              isLogin ? "text-white" : "text-gray-700"
            }`}
          >
            Login
          </button>

          {/* Sign Up Option */}
          <button
            onClick={() => setIsLogin(false)}
            className={`z-10 w-1/2 text-sm font-semibold py-2 rounded-full transition-colors duration-300 ${
              !isLogin ? "text-white" : "text-gray-700"
            }`}
          >
            Sign Up
          </button>
        </div>
      </div>

      {/* Form */}
      {isLogin ? <LoginForm /> : <SignupForm />}
    </div>
  );
}
