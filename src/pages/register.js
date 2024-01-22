import React from "react";
import RegisterForm from "../components/auth/RegisterForm";
import Logo from "../svg/logo512.png";
export default function Register() {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center overflow-hidden">
      <div class="max-w-screen-xl sm:m-4 bg-white shadow sm:rounded-lg flex justify-center flex-1">
        <div class="lg:w-1/2 xl:w-5/12 p-4 sm:p-12">
          {/* Logo Header */}
          <div className="flex flex-col items-center">
            <img src={Logo} alt="Logo" className="w-32 mx-auto" />
            <h1 className="text-xl xl:text-3xl font-bold">EffiChat</h1>
            <p class="mt-2 text-center text-sm text-gray-600 max-w">
              Already have an account?
              <a
                href="/login"
                class="font-medium text-blue-600 hover:text-blue-500"
              >
                {" "}
                Sign in
              </a>
            </p>
          </div>
          {/*Register Form*/}
          <RegisterForm />
        </div>
        {/* Image */}
        <div class="flex-1 bg-indigo-100 text-center hidden lg:flex">
          <img
            class="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat"
            src="https://storage.googleapis.com/devitary-image-host.appspot.com/15848031292911696601-undraw_designer_life_w96d.svg"
            alt=""
          ></img>
        </div>
      </div>
    </div>
  );
}
