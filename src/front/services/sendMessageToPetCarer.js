const API_URL = import.meta.env.VITE_BACKEND_URL;

export const sendMessageToPetCarer = async ({ userId, message, token }) => {
  try {
    const resp = await fetch(`${API_URL}/api/send-email/contact/${userId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ message }),
      }
    );
    if (!resp.ok) throw new Error("Failed to send message");
    return await resp.json();
  } catch (err) {
    console.error("Error sending message:", err);
    throw err;
  }
};