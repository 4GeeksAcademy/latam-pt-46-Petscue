const API_URL = import.meta.env.VITE_BACKEND_URL;

export const getAnimalById = async (id) => {
  const token = localStorage.getItem("token");
  try {
    const response = await fetch(`${API_URL}/api/animals/${id}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || "Unknown error");
    return data.animal; // Asegúrate de que el backend devuelva la propiedad 'animal'
  } catch (error) {
    console.error(error);
    throw error;
  }
};
