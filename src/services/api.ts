import { User } from "../types/User";

const API_URL = "https://randomuser.me/api/";

export const fetchUsers = async (count: number): Promise<User[]> => {
  try {
    const axios = (await import("axios")).default;
    const response = await axios.get(`${API_URL}?results=${count}`);
    return response.data.results;
  } catch (error) {
    console.error("Error fetching users:", error);
    return [];
  }
};
