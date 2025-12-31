import React from "react";
import { useNavigate } from "react-router-dom";

function Hero() {
  const navigate = useNavigate();

  // 🔐 Check login state
  const isLoggedIn = Boolean(localStorage.getItem("token"));

  const handleClick = () => {
    if (isLoggedIn) {
      navigate("/dashboard");
    } else {
      navigate("/register");
    }
  };

  return (
    <div className="max-w-4xl mt-20 mx-auto text-center">
      {/* Main Headline */}
      <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-6">
        Keep your{" "}
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">
          files
        </span>{" "}
        safe and{" "}
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">
          private
        </span>
      </h1>

      {/* Subheading */}
      <h3 className="text-xl md:text-2xl text-gray-600 mb-4">
        Upload images, generate instant shareable links, and reach audiences worldwide.
      </h3>

      {/* Additional Info */}
      <h3 className="text-lg md:text-xl text-gray-600 mb-8">
        No signup required. Lightning fast. Always free.
      </h3>

      {/* CTA Button */}
      <button
        onClick={handleClick}
        className="px-8 py-3 bg-blue-600 text-white text-lg font-medium rounded-lg hover:bg-blue-700 transition shadow-lg"
      >
        {isLoggedIn ? "Go to Dashboard" : "Signup Free"}
      </button>
    </div>
  );
}

export default Hero;
