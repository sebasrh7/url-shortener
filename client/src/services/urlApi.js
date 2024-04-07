import axios from "../utils/axios";
const API = import.meta.env.VITE_API_URL;

export const shorten = async (url) => {
  try {
    const response = await fetch(`${API}/shorten`, {
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

export const getUrls = async () => {
  try {
    const response = await axios.get("/urls");
    return response.data;
  } catch (error) {
    throw new Error("Failed to get URLs");
  }
};

export const deleteUrl = async (id) => {
  try {
    const response = await axios.delete(`/delete/${id}`);
    return response.data;
  } catch (error) {
    throw new Error("Failed to delete URL");
  }
};

export const getUrl = async (id) => {
  try {
    const response = await axios.get(`/url/${id}`);
    return response.data;
  } catch (error) {
    throw new Error("Failed to get URL");
  }
};

export const updateUrl = async (editedUrl, id) => {
  try {
    const response = await axios.put(`/update/${id}`, editedUrl);
    return response.data;
  } catch (error) {
    throw new Error("Failed to edit URL");
  }
};
