
// export default Viewimage;
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../config";
 import { FaCloudUploadAlt } from "react-icons/fa";
 import { Link } from "react-router-dom";
const ViewImage = () => {
  const { public_id } = useParams();
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordRequired, setPasswordRequired] = useState(false);
  const [accessGranted, setAccessGranted] = useState(false);

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const res = await axios.get(`${API_URL}/view/${public_id}`);
        setImage(res.data);
        if (res.data.password_required) {
          setPasswordRequired(true);
        } else {
          setAccessGranted(true);
        }
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load image");
      } finally {
        setLoading(false);
      }
    };
    fetchImage();
  }, [public_id]);

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API_URL}/view/${public_id}/verify`, { password });
      if (res.data.access_granted) {
        setAccessGranted(true);
        setPasswordRequired(false);
        setError("");
      } else {
        setError("Incorrect password. Try again.");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Password verification failed");
    }
  };

  const handleDownload = async () => {
    try {
      const res = await axios.get(image.image_url, { responseType: "blob" });
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", image.file_name);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      alert("Download failed");
    }
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;

  return (
    <>
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
          
    
            </div>
          </div>
        </nav>
       <div className=" text-black min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
      {!accessGranted && passwordRequired ? (
        <form
          onSubmit={handlePasswordSubmit}
          className="bg-white p-6 rounded-xl shadow-lg w-full max-w-sm text-center"
        >
          <h2 className="text-xl font-bold mb-4">Enter password to view</h2>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full px-4 py-2 border rounded-lg mb-4 focus:ring-2 focus:ring-blue-500 outline-none"
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Submit
          </button>
          {error && <p className="text-red-500 mt-2 text-sm">{error}</p>}
        </form>
      ) : (
        <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-xl flex flex-col items-center">
          <h2 className="text-2xl font-bold mb-4">{image.file_name}</h2>
          <img
            src={image.image_url}
            alt={image.file_name}
            className="max-w-full max-h-[70vh] object-contain rounded-lg shadow-lg mb-4"
          />
          <p className="text-gray-600 mb-4">{image.size_mb.toFixed(2)} MB</p>
          <button
            onClick={handleDownload}
            className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
          >
            Download
          </button>
        </div>
      )}
    </div>
    </>
 
  );
};

export default ViewImage;
