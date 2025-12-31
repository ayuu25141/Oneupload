import React, { useEffect, useState } from "react";
import { FiUpload, FiImage } from "react-icons/fi";
import Upload from "../dashboardcomponent/Upload";
import Gallery from "../dashboardcomponent/Gallery";
import { getUploadCount } from "../uploadcount";

const Body = () => {
  const [activeTab, setActiveTab] = useState("upload");
  const [uploadCount, setUploadCount] = useState(0);

  // fetch count on load
  useEffect(() => {
    const fetchCount = async () => {
      const count = await getUploadCount();
      setUploadCount(count);
    };
    fetchCount();
  }, []);

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">

      {/* Toggle Header */}
      <div className="flex justify-center mb-10">
        <div className="flex rounded-full bg-gray-100 p-1 shadow-inner">

          {/* Upload Tab */}
          <button
            onClick={() => setActiveTab("upload")}
            className={`flex items-center gap-2 px-6 py-2 rounded-full text-sm font-medium transition
              ${
                activeTab === "upload"
                  ? "bg-white shadow text-black"
                  : "text-gray-500 hover:text-black"
              }`}
          >
            <FiUpload />
            Upload
          </button>

          {/* Gallery Tab */}
          <button
            onClick={() => setActiveTab("gallery")}
            className={`flex items-center gap-2 px-6 py-2 rounded-full text-sm font-medium transition
              ${
                activeTab === "gallery"
                  ? "bg-white shadow text-black"
                  : "text-gray-500 hover:text-black"
              }`}
          >
            <FiImage />
            Gallery ({uploadCount})
          </button>

        </div>
      </div>

      {/* Render Component */}
      <div>
        {activeTab === "upload" && <Upload />}
        {activeTab === "gallery" && <Gallery />}
      </div>

    </div>
  );
};

export default Body;
