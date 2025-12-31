



import { useRef, useState, useEffect } from "react";
import {
  FiUpload,
  FiX,
  FiLock,
  FiEye,
  FiEyeOff,
  FiClock,
  FiImage,
} from "react-icons/fi";
import axios from "axios";
import toast from "react-hot-toast";
import { API_URL } from "../config";

// JWT token
const token = localStorage.getItem("token");

const Upload = () => {
  const inputRef = useRef(null);
  const [image, setImage] = useState(null);
  const [expiryDays, setExpiryDays] = useState("1");
  const [password, setPassword] = useState("");
  const [isPasswordEnabled, setIsPasswordEnabled] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedLink, setUploadedLink] = useState("");

  // ======================
  // File selection
  // ======================
  const handleFileChange = (e) => {
    const file = e.target.files?.[0] || e.dataTransfer?.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please upload a valid image");
      return;
    }

    setImage({
      file,
      preview: URL.createObjectURL(file),
      name: file.name,
      size: (file.size / 1024 / 1024).toFixed(2) + " MB",
    });

    setUploadedLink("");
  };

  // ======================
  // Remove image
  // ======================
  const removeImage = () => {
    if (image?.preview) URL.revokeObjectURL(image.preview);
    setImage(null);
    setPassword("");
    setIsPasswordEnabled(false);
    setExpiryDays("1");
    setUploadedLink("");
    if (inputRef.current) inputRef.current.value = "";
  };

  // ======================
  // Cleanup
  // ======================
  useEffect(() => {
    if (!isPasswordEnabled) setPassword("");
    return () => {
      if (image?.preview) URL.revokeObjectURL(image.preview);
    };
  }, [isPasswordEnabled, image]);

  // ======================
  // Get Cloudinary signature
  // ======================
  const getCloudinarySignature = async () => {
    try {
      const res = await axios.get(`${API_URL}/cloudinary-signature`);
      return res.data;
    } catch (err) {
      console.error(err);
      toast.error("Cannot get upload signature");
    }
  };

  // ======================
  // Upload image
  // ======================
  const handleUpload = async () => {
    if (!image?.file) {
      toast.error("Select an image first");
      return;
    }

    setIsUploading(true);
    const toastId = toast.loading("Uploading image...");

    try {
      // 1. signature
      const sigData = await getCloudinarySignature();
      if (!sigData) throw new Error("Signature failed");

      // 2. cloudinary upload
      const cloudFormData = new FormData();
      cloudFormData.append("file", image.file);
      cloudFormData.append("api_key", sigData.apiKey);
      cloudFormData.append("timestamp", sigData.timestamp);
      cloudFormData.append("signature", sigData.signature);

      const cloudRes = await axios.post(
        `https://api.cloudinary.com/v1_1/${sigData.cloudName}/image/upload`,
        cloudFormData
      );

      // 3. backend save
      const body = {
        image_url: cloudRes.data.secure_url,
        public_id: cloudRes.data.public_id,
        file_name: image.name,
        file_size_mb: cloudRes.data.bytes / (1024 * 1024),
        expire_days: parseInt(expiryDays, 10),
        password: isPasswordEnabled ? password : "",
      };

      const backendRes = await axios.post(
        `${API_URL}/uploadimage`,
        body,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setUploadedLink(backendRes.data.link);

      toast.success("Image uploaded successfully 🎉", {
        id: toastId,
      });
    } catch (err) {
      console.error(err);
      toast.error("Upload failed. Please try again ❌", {
        id: toastId,
      });
    } finally {
      setIsUploading(false);
    }
  };

  // ======================
  // UI
  // ======================
  return (
    <div className="min-h-screen text-black bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden">
        {/* HEADER */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white">
            Secure Image Upload
          </h2>
          <p className="text-indigo-100 text-sm mt-2">
            Share images with expiry & optional password
          </p>
        </div>

        <div className="p-6 sm:p-8">
          {!image ? (
            <div
              onClick={() => inputRef.current?.click()}
              onDragOver={(e) => {
                e.preventDefault();
                setIsDragging(true);
              }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={(e) => {
                e.preventDefault();
                setIsDragging(false);
                handleFileChange(e);
              }}
              className={`border-2 border-dashed rounded-2xl p-10 sm:p-14 cursor-pointer transition ${
                isDragging
                  ? "border-indigo-500 bg-indigo-50"
                  : "border-slate-300 hover:border-indigo-500 bg-slate-50"
              }`}
            >
              <div className="flex flex-col items-center gap-4 text-center">
                <div className="h-16 w-16 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-2xl">
                  <FiUpload />
                </div>
                <p className="font-semibold text-slate-700">
                  Drag & drop your image
                </p>
                <span className="text-sm text-slate-400">
                  or{" "}
                  <span className="text-indigo-600 font-medium">
                    browse files
                  </span>
                </span>
                <p className="text-xs text-slate-400">
                  JPG, PNG, GIF, WebP (Max 10MB)
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {/* IMAGE PREVIEW */}
              <div className="rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
                <div className="relative h-64 sm:h-80 bg-slate-100 flex items-center justify-center">
                  <img
                    src={image.preview}
                    alt="preview"
                    className="max-h-full max-w-full object-contain p-4"
                  />
                  <button
                    onClick={removeImage}
                    className="absolute top-3 right-3 p-2 bg-white rounded-full shadow hover:bg-red-50 text-slate-600 hover:text-red-600"
                  >
                    <FiX />
                  </button>
                </div>
                <div className="p-4 flex justify-between items-center">
                  <div className="truncate">
                    <p className="text-sm font-medium truncate">
                      {image.name}
                    </p>
                    <p className="text-xs text-slate-500">{image.size}</p>
                  </div>
                  <div className="flex items-center text-xs text-slate-400">
                    <FiImage className="mr-1" />
                    {image.name.split(".").pop().toUpperCase()}
                  </div>
                </div>
              </div>

              {/* EXPIRY */}
              <div className="bg-slate-50 border rounded-xl p-5">
                <div className="flex items-center gap-2 mb-3 text-slate-700">
                  <FiClock className="text-indigo-600" />
                  <span className="font-medium text-sm">
                    Expires after
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  {["1", "7", "30"].map((day) => (
                    <button
                      key={day}
                      onClick={() => setExpiryDays(day)}
                      className={`py-2.5 rounded-xl text-sm font-medium transition ${
                        expiryDays === day
                          ? "bg-indigo-600 text-white shadow"
                          : "bg-white border hover:bg-slate-100"
                      }`}
                    >
                      {day} {day === "1" ? "Day" : "Days"}
                    </button>
                  ))}
                </div>
              </div>

              {/* PASSWORD */}
              <div className="bg-slate-50 border rounded-xl p-5">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <FiLock className="text-indigo-600" />
                    <span className="text-sm font-medium">
                      Password protection
                    </span>
                  </div>
                  <button
                    onClick={() =>
                      setIsPasswordEnabled(!isPasswordEnabled)
                    }
                    className={`w-11 h-6 rounded-full transition ${
                      isPasswordEnabled
                        ? "bg-indigo-600"
                        : "bg-slate-300"
                    }`}
                  >
                    <span
                      className={`block h-4 w-4 bg-white rounded-full transition ${
                        isPasswordEnabled
                          ? "translate-x-6"
                          : "translate-x-1"
                      }`}
                    />
                  </button>
                </div>

                {isPasswordEnabled && (
                  <div className="mt-4 relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) =>
                        setPassword(e.target.value)
                      }
                      placeholder="Enter password"
                      className="w-full border rounded-xl px-4 py-3 pr-10 focus:ring-2 focus:ring-indigo-500"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowPassword(!showPassword)
                      }
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500"
                    >
                      {showPassword ? (
                        <FiEyeOff />
                      ) : (
                        <FiEye />
                      )}
                    </button>
                  </div>
                )}
              </div>

              {/* ACTIONS */}
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={removeImage}
                  className="flex-1 py-3 rounded-xl border hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleUpload}
                  disabled={isUploading}
                  className="flex-1 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium shadow hover:opacity-90"
                >
                  {isUploading ? "Uploading…" : "Upload Image"}
                </button>
              </div>

              {/* LINK */}
              {uploadedLink && (
                <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-xl">
                  <p className="text-green-700 text-sm">
                    Uploaded successfully! Link:
                  </p>
                  <a
                    href={uploadedLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-indigo-600 break-all"
                  >
                    {uploadedLink}
                  </a>
                </div>
              )}
            </div>
          )}

          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            hidden
            onChange={handleFileChange}
          />
        </div>
      </div>
    </div>
  );
};

export default Upload;
