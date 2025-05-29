const API_URL = import.meta.env.VITE_BACKEND_URL;

export const getPet = async (animal_id) => {
  try {
    const headers = {
      "Content-Type": "application/json",
    };

    const response = await fetch(`${API_URL}/api/favorites/${animal_id}`, {
      method: "GET",
      headers,
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Unknown error");
    }

    return data;
  } catch (error) {
    console.error("Error getting favorites:", error);
    throw new Error(error.message || "An unexpected error occurred");
  }
};