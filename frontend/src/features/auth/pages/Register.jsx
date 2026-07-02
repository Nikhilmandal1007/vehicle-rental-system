import RegisterForm from "../components/RegisterForm";

export default function Register() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <div className="mx-auto grid min-h-screen max-w-7xl lg:grid-cols-2">
        {/* Left Side */}
        <div className="hidden lg:flex flex-col justify-center bg-gradient-to-br from-green-700 via-green-600 to-emerald-700 p-16 text-white">
          <h1 className="text-5xl font-bold leading-tight">
            Join Our
            <br />
            Community
          </h1>

          <p className="mt-6 text-lg text-green-100">
            Register today and start renting vehicles or become a verified host.
          </p>

          <div className="mt-12 space-y-3 text-green-100">
            <p>✓ Create your account</p>
            <p>✓ Browse available vehicles</p>
            <p>✓ Become a verified host</p>
            <p>✓ Safe & Secure Platform</p>
          </div>
        </div>

        {/* Right Side */}
        <div className="flex items-center justify-center px-6 py-12 sm:px-10">
          <RegisterForm />
        </div>
      </div>
    </div>
  );
}
