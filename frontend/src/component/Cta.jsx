import React from "react";
import { FaStar, FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Cta = () => {
    const navigate = useNavigate();
navigate("/register");
  return (
    <div className="flex justify-center my-12">
      <button className="relative group overflow-hidden px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 hover:from-blue-600 hover:to-purple-700">
        {/* Star effect - animated sparkles */}
        <div className="absolute inset-0 flex items-center justify-center">
          {[...Array(3)].map((_, i) => (
            <FaStar
              key={i}
              className={`absolute text-yellow-300 opacity-0 group-hover:opacity-100 transition-all duration-300 animate-pulse
                ${i === 0 ? 'top-2 left-4 text-xs' : ''}
                ${i === 1 ? 'bottom-2 right-4 text-sm' : ''}
                ${i === 2 ? 'top-1/2 right-2 text-xs' : ''}`}
              style={{ animationDelay: `${i * 100}ms` }}
            />
          ))}
        </div>

        {/* Button content */}
        <div className="relative z-10 flex items-center space-x-2">
          <span onClick={()=>navigate("/register")}>Get Started</span>
          <FaArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
        </div>
      </button>
    </div>
  );
};

export default Cta;
