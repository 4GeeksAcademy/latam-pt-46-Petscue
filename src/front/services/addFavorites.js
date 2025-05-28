const API_URL = import.meta.env.VITE_BACKEND_URL;

export const getFavorites = async () => {
  const token = localStorage.getItem("token");
  try {
    const response = await fetch(`${API_URL}/api/favorites`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
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

export const toggleFavoriteAPI = async (animalId) => {
  const token = localStorage.getItem("token");
  try {
    const response = await fetch(`${API_URL}/api/favorites/${animalId}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Unknown error");
    }

    return data;
  } catch (error) {
    console.error("Error toggling favorite:", error);
    throw new Error(error.message || "An unexpected error occurred");
  }
};
