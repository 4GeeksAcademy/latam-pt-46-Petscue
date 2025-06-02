const API_URL = import.meta.env.VITE_BACKEND_URL;

export const singlePet = async (animal_id) => {
  try {
    const response = await fetch(`${API_URL}/api/animal/${animal_id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Unknown error");
    }

    return data;
  } catch (error) {
    console.error("Error getting animal:", error);
    throw new Error(error.message || "An unexpected error occurred");
  }
};
