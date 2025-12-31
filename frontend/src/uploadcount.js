import axios from "axios";
import { API_URL } from "../src/config";

export const getUploadCount = async () => {
  try {
    const token = localStorage.getItem("token");

    const res = await axios.get(`${API_URL}/getimage`, {
      params: { page: 1, limit: 1000 }, // large limit for count
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res.data.length;
  } catch (error) {
    console.error("Failed to fetch upload count", error);
    return 0;
  }
};
