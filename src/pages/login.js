import React from "react";
import LoginForm from "../components/auth/LoginForm";

export default function Login() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8 overflow-hidden">
      {/* Header */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h1 className="mt-6 text-center text-3xl font-bold text-gray-900">
          Sign in to your account
        </h1>
        <p className="mt-2 text-center text-sm text-gray-600 max-w">
          Or
          <a
            href="/register"
            className="font-medium text-blue-600 hover:text-blue-500"
          >
            {" "}
            create an account
          </a>
        </p>
      </div>
      {/*Container*/}
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        {/*Login Form*/}
        <LoginForm />
      </div>
    </div>
  );
}
