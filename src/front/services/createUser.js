const API_URL = import.meta.env.VITE_BACKEND_URL;

export const newUser = async (user) => {
  try {
    console.log("Enviando datos a /newUser:", user);
    const response = await fetch(`${API_URL}/api/user`, {
      method: "POST",
      body: JSON.stringify(user),
      headers: {
        "content-type": "application/json",
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