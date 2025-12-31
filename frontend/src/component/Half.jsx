import React from "react";
import dtl from '../assets/dtl.png'
function Half() {
  return (
    <div className="py-16 mt-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        {/* 50/50 Split Container */}
        <div className="flex flex-col md:flex-row items-center gap-12">
          {/* Image Section (50%) */}
          <div className="w-full md:w-1/2">
            <img
              src={dtl}
              alt="Example"
              className="w-full h-auto "
            />
          </div>

          {/* Text Section (50%) */}
          <div className="w-full md:w-1/2 space-y-6">
            <h2 className="text-3xl font-bold text-gray-800">
             European excellence. <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">
        Swiss privacy.
          </span>

            </h2>
            <p className="text-lg text-gray-900">
              We're here to provide a reliable, secure cloud storage that puts your privacy first. As a Swiss-based cloud solution we follow the world’s strictest data privacy standards. And our rock-solid encryption ensures your files are always secure.
No compromises. No tracking. No third-party access.
            </p>
            
          </div>
        </div>
      </div>
    </div>
  );
}

export default Half;
