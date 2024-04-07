import axios from "../utils/axios";

export const getProfile = async () => {
  try {
    const response = await axios.get("/login/success", {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw new Error();
  }
};

export const deleteAccount = async () => {
  try {
    const response = await axios.delete("/delete/account", {
      withCredentials: true,
    });
    console.log(response);
    return response.data;
  } catch (error) {
    throw new Error();
  }
};
