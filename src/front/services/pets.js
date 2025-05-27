const API_URL = import.meta.env.VITE_BACKEND_URL;

export const pets = async () => {
  try {
    const response = await fetch(`${API_URL}/api/animals_rescued`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || "Unknown error");
    return data.animals || [];
  } catch (error) {
    console.log("Error fetching animals:", error.message);
    return [];
  }
};
