import axios from "axios";
import { toast } from "react-toastify";

export const ApiCall = async (url, method, data = {}, headers = {}) => {

  const user = localStorage.getItem("user");
  const token = user ? JSON.parse(user): null; 
  if (!token) {
    console.error("Token is missing or invalid in localStorage");
  }

  const config = {
    headers: {
      Authorization: token ? `Bearer ${token}` : '', 
      ...headers,
    },
  };

  try {
    const res = await axios({
      method,
      url,
      data,
      ...config,
    });
    return res.data;
  } catch (err) {
    const status = err?.response?.status;
    const errMessage = err?.response?.data?.message || "An error occurred";

    if (status === 400) {
      toast.error(errMessage);
    }

    // Always return a valid object to prevent null issues
    return { success: false, message: errMessage };
  }
};