import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiUser } from "react-icons/fi";

function Nav({ heroRef, detailsRef, featuresRef }) {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  // 🔐 login check
  const isLoggedIn = Boolean(localStorage.getItem("token"));

  const scrollTo = (ref) => {
    setIsOpen(false);
    ref?.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center py-4">

          {/* Logo */}
          <div
            onClick={() => navigate("/")}
            className="flex items-center gap-2 cursor-pointer"
          >
            <img
              src="https://cdn-icons-png.flaticon.com/512/9857/9857996.png"
              alt="Logo"
              className="h-8 w-8"
            />
            <h1 className="text-2xl font-bold text-blue-600">OneUpload</h1>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            <button onClick={() => scrollTo(heroRef)} className="nav-btn">
              Explore
            </button>
            <button onClick={() => scrollTo(detailsRef)} className="nav-btn">
              Features
            </button>
            <button onClick={() => scrollTo(featuresRef)} className="nav-btn">
              Why Choose Us
            </button>
          </div>

          {/* Desktop Right */}
          <div className="hidden md:flex items-center">
            {!isLoggedIn ? (
              <button
                onClick={() => navigate("/login")}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                Sign In
              </button>
            ) : (
              <div className="h-10 w-10 flex items-center justify-center rounded-full bg-blue-600 text-white cursor-pointer hover:bg-blue-700 transition">
                <FiUser size={18} />
              </div>
            )}
          </div>

          {/* Mobile Toggle */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)}>
              <svg className="h-6 w-6" viewBox="0 0 24 24">
                {isOpen ? (
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M18.278 16.864a1 1 0 0 1-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 0 1-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 0 1 1.414-1.414l4.829 4.828 4.828-4.828a1 1 0 1 1 1.414 1.414l-4.828 4.829 4.828 4.828z"
                  />
                ) : (
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2z"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden bg-white px-4 pb-4 space-y-2">
            <button onClick={() => scrollTo(heroRef)} className="mobile-btn">
              Explore
            </button>
            <button onClick={() => scrollTo(detailsRef)} className="mobile-btn">
              Features
            </button>
            <button onClick={() => scrollTo(featuresRef)} className="mobile-btn">
              Why Choose Us
            </button>

            {!isLoggedIn ? (
              <button
                onClick={() => navigate("/login")}
                className="w-full mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg"
              >
                Sign In
              </button>
            ) : (
              <div className="w-full flex justify-center mt-2">
                <div className="h-10 w-10 flex items-center justify-center rounded-full bg-blue-600 text-white">
                  <FiUser />
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}

export default Nav;
