export const updateAnimalStatus = async (animalId, newStatus) => {
  const token = localStorage.getItem("token");
  const response = await fetch(
    `${process.env.REACT_APP_API_URL}/animals/${animalId}/status`,
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