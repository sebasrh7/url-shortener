import axios from "../utils/axios";
const API = import.meta.env.VITE_API_URL;

export const guestShorten = async (url) => {
  try {
    const response = await fetch(`${API}/guest/shorten`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ originalUrl: url }),
    });
    return response.json();
  } catch (error) {
    throw new Error("Failed to shorten URL");
  }
};

export const guestGetUrls = async () => {
  try {
    const response = await axios.get("/guest/urls");
    return response.data;
  } catch (error) {
    throw new Error("Failed to get URLs");
  }
};

export const guestGetUrl = async (id) => {
  try {
    const response = await axios.get(`/guest/url/${id}`);
    return response.data;
  } catch (error) {
    throw new Error("Failed to get URL");
  }
};

export const guestDeleteUrl = async (id) => {
  try {
    const response = await axios.delete(`/guest/delete/${id}`);
    return response.data;
  } catch (error) {
    throw new Error("Failed to delete URL");
  }
};

export const guestDeleteSelected = async (urls) => {
  try {
    const response = await axios.delete("/guest/deleteSelected", {
      data: { urls },
    });
    return response.data;
  } catch (error) {
    throw new Error("Failed to delete URLs");
  }
};