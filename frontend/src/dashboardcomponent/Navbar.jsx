import React, { useEffect, useState } from "react";
 import { Link } from "react-router-dom";
import { FaCloudUploadAlt } from "react-icons/fa";
import { getUploadCount } from "@/uploadcount";
const Navbar = () => {
   const [galleryCount, setGalleryCount] = useState(0);

  useEffect(() => {
    const fetchCount = async () => {
      const count = await getUploadCount();
      setGalleryCount(count);
    };
    fetchCount();
  }, []);
  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 md:h-20 items-center justify-between">

          {/* Left: Logo & Text */}
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center h-10 w-10 rounded-xl bg-purple-100">
              <FaCloudUploadAlt className="text-purple-600 text-xl" />
            </div>

            <div className="leading-tight">
           <Link to = "/">
                  <h1 className="text-base sm:text-lg font-semibold text-gray-900">
                My OneUpload
              </h1>
              </Link>
          
              <p className="hidden sm:block text-xs text-gray-500">
                Upload & manage your images
              </p>
            </div>
          </div>

          {/* Right: Gallery Badge */}
          <div className="flex items-center">
            <button className="group flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm transition hover:border-purple-300 hover:bg-purple-50">
              <span>Gallery</span>
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-purple-600 text-white text-xs font-semibold group-hover:bg-purple-700">
                {galleryCount }
              </span>
            </button>
          </div>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;
