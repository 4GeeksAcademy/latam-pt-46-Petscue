const API_URL = "https://silver-rotary-phone-x5p5pq7gxgjr3xx6-3001.app.github.dev/api";

export const newUser = async (user) => {
  try {
    const response = await fetch(`${API_URL}/newUser`, {
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
