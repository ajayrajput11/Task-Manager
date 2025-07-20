
import  { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signUp } from "../features/authSlice";
import { useNavigate, Link } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

const SignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const users = useSelector((state) => state.auth.users);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage("");

    const exists = users.find((u) => u.email === form.email);
    if (exists) {
      setErrorMessage("An account with this email already exists. Please log in or use a different email.");
      return;
    }

    const newUser = {
      ...form,
      provider: "manual",
    };

    dispatch(signUp(newUser));
    navigate("/login");
  };

  const handleGoogleSignup = (credentialResponse) => {
    const decoded = jwtDecode(credentialResponse.credential);

    const googleUser = {
      name: decoded.name,
      email: decoded.email,
      provider: "google",
    };

    dispatch(signUp(googleUser));
    navigate("/maincomp/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-10 bg-gray-100">
      <div className="max-w-md w-full bg-white shadow-lg rounded-xl p-8 space-y-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-center">Create Account</h2>

        {errorMessage && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
            <span className="block sm:inline">{errorMessage}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col space-y-1">
            <label htmlFor="fullname" className="text-gray-700 text-sm font-medium">Full Name:</label>
            <input
              id="fullname"
              type="text"
              placeholder="Full Name"
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />
          </div>

          <div className="flex flex-col space-y-1">
            <label htmlFor="email" className="text-gray-700 text-sm font-medium">Email:</label>
            <input
              id="email"
              type="email"
              placeholder="abc@example.com"
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />
          </div>

          <div className="flex flex-col space-y-1">
            <label htmlFor="password" className="text-gray-700 text-sm font-medium">Password:</label>
            <input
              id="password"
              type="password"
              placeholder="Password"
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gray-900 hover:bg-orange-500 text-white font-bold py-2 rounded-full transition duration-300 ease-in-out"
          >
            Sign Up
          </button>
        </form>

        <div className="relative flex py-5 items-center">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="flex-shrink mx-4 text-gray-500 text-sm">OR</span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>

        <div className="flex justify-center mt-4">
          <GoogleLogin
            onSuccess={handleGoogleSignup}
            onError={() => {
              console.log('Google Signup Failed');
              setErrorMessage("Google signup failed. Please try again.");
            }}
          />
        </div>

        <p className="text-sm text-center text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 hover:underline">
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
