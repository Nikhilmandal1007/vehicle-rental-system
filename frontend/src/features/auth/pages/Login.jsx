import LoginForm from "../components/LoginForm";

export default function Login() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <div className="mx-auto grid min-h-screen max-w-7xl lg:grid-cols-2">
        {/* Left Side */}
        <div className="hidden lg:flex flex-col justify-center bg-gradient-to-br from-blue-700 via-blue-600 to-indigo-700 p-16 text-white">
          <h1 className="text-5xl font-bold leading-tight">
            Vehicle Rental
            <br />
            System
          </h1>

          <p className="mt-6 text-lg text-blue-100">
            Find, book and rent vehicles anywhere with a secure and reliable
            platform.
          </p>

          <div className="mt-12 space-y-3 text-blue-100">
            <p>✓ Secure Authentication</p>
            <p>✓ Verified Hosts</p>
            <p>✓ Easy Vehicle Booking</p>
            <p>✓ Fast & Responsive</p>
          </div>
        </div>

        {/* Right Side */}
        <div className="flex items-center justify-center px-6 py-12 sm:px-10">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
