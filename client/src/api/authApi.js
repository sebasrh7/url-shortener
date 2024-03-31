const API = import.meta.env.VITE_API_URL;

export const getProfile = async () => {
  try {
    const response = await fetch(`${API}/login/success`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      credentials: "include",
    });
    return response.json();
  } catch (error) {
    throw new Error("Failed to get profile");
  }
};