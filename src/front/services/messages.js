const API_URL = import.meta.env.VITE_BACKEND_URL;

export const fetchMyMessages = async (token) => {
  try {
    const resp = await fetch(`${API_URL}/api/my-messages`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await resp.json();
    if (!resp.ok) throw new Error(data.message || "Failed to fetch messages");
    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const markMessageAsRead = async (messageId, token) => {
  try {
    const response = await fetch(`${API_URL}/api/messages/read/${messageId}`, {
      method: "PUT",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    if (!response.ok)
      throw new Error(data.message || "Failed to update message");
    return data;
  } catch (error) {
    console.error(error);
    return { success: false, error: error.message };
  }
};

export const fetchMySentMessages = async (token) => {
  try {
    const response = await fetch(`${API_URL}/api/sent-messages`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Failed to fetch the sent messages ❌📩");
    }
    return data;
  } catch (error) {
    console.log(error);
    return [];
  }
};
