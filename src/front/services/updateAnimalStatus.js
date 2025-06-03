const API_URL = import.meta.env.VITE_BACKEND_URL; 

export const updateAnimalStatus = async (animalId, newStatus) => {
  const token = localStorage.getItem("token");
  const response = await fetch(
    `${API_URL}/api/animals/${animalId}/status`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ status: newStatus })
    }
  );
  if (!response.ok) {
    throw new Error("Failed to update animal status");
  }
  return await response.json();
};