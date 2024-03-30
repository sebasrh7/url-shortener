const API = import.meta.env.VITE_API_URL;

export const shorten = async (url) => {
  try {
    const response = await fetch(`${API}/shorten`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(url),
    });
    return response.json();
  } catch (error) {
    throw new Error("Failed to shorten URL");
  }
};

export const getUrls = async () => {
  try {
    const response = await fetch(`${API}/urls`);
    return response.json();
  } catch (error) {
    throw new Error("Failed to get URLs");
  }
};

export const deleteUrl = async (id) => {
  try {
    const response = await fetch(`${API}/delete/${id}`, {
      method: "DELETE",
    });
    return response.json();
  } catch (error) {
    throw new Error("Failed to delete URL");
  }
};

export const getUrl = async (id) => {
  try {
    const response = await fetch(`${API}/url/${id}`);
    return response.json();
  } catch (error) {
    throw new Error("Failed to get URL");
  }
};

export const updateUrl = async (id) => {
  try {
    const response = await fetch(`${API}/update/${id}`, {
      method: "PUT",
    });
    return response.json();
  } catch (error) {
    throw new Error("Failed to edit URL");
  }
};
