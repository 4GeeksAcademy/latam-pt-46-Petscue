const API_URL = import.meta.env.VITE_BACKEND_URL;

export const deleteAnimal = async (id) => {
  const token = localStorage.getItem("token");
  try {
    const response = await fetch(`${API_URL}/api/animals/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.msg || "Error deleting animal");
    }

    return data; 
  } catch (error) {
    console.error("Error deleting animal:", error.message);
    throw error;
  }
};
