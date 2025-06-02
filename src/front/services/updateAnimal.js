const API_URL = import.meta.env.VITE_BACKEND_URL;

export const updateAnimal = async (animalId, updatedData, token) => {
  try {
    const response = await fetch(`${API_URL}/api/animals/${animalId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, 
      },
      body: JSON.stringify(updatedData),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.msg || "Error updating animal");
    }

    const updatedAnimal = await response.json();
    return updatedAnimal;
  } catch (error) {
    console.error("Update failed:", error.message);
  }
};
