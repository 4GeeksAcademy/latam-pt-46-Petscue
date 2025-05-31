const API_URL = import.meta.env.VITE_BACKEND_URL;

export const createNewAnimal = async (newAnimal) => {
  const token = localStorage.getItem("token")
  try {
    const response = await fetch(`${API_URL}/api/animals`, {
      method: "POST",
      body: JSON.stringify(newAnimal),
      headers: {
        "content-type": "application/json",
        "Authorization": `Bearer ${token}`
      },
    });
    const responseData = await response.json();

    if (!response.ok) {
      throw new Error(responseData.message || "Unknown error");
    }

    return responseData;
  } catch (error) {
    throw error;
  }
};