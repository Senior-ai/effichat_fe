import ForgotPassForm from "../components/auth/ForgotPassForm";

export default function ForgotPass() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8 overflow-hidden">
      {/* Header */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h1 className="mt-6 text-center text-3xl font-bold text-gray-900">
          Forgot password?
        </h1>
        <p className="mt-2 text-center text-sm text-gray-600 max-w">
          Remember your password?
          <a
            href="/register"
            className="font-medium text-blue-600 hover:text-blue-500"
          >
            {" "}
            Login here
          </a>
        </p>
      </div>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <ForgotPassForm />
      </div>
    </div>
  );
}
