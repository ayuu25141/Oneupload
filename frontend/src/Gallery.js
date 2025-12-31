import axios from "axios";
import { API_URL } from "./config"; // fix the path

export const fetchMyGallery = async ({ page = 1, limit = 12 }) => {
  try {
    const token = localStorage.getItem("token");

    const res = await axios.get(`${API_URL}/getimage`, {
      params: { page, limit },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // Ensure each image has the required fields
return res.data.map((img) => ({
  public_id: img.public_id || "",
  image_url: img.image_url || "",
  file_name: img.file_name || "unknown.jpg",
  size_mb: img.size_mb || 0,
  uploaded_at: img.uploaded_at || new Date().toISOString(),
  share_url: img.share_url || "", // <-- include this
}));
  } catch (err) {
    console.error("Error fetching gallery:", err);
    return []; // return empty array if failed
  }
};
