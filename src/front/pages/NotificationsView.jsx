import { useEffect, useState } from "react";
import { fetchMyMessages, markMessageAsRead } from "../services/messages";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const NotificationsView = () => {
  const { store } = useGlobalReducer();
  const token = store.token || localStorage.getItem("token") || "";
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMessages = async () => {
      setLoading(true);
      try {
        const data = await fetchMyMessages(token);
        setLoading(false);
        setMessages(data);
      } catch (error) {
        console.log(error);
        setMessages([]);
        setLoading(false);
      }
    };
    if (token) fetchMessages();
  }, [token]);

  const conteoDeMensajesNoLeidos = messages.filter(
    (mensaje) => !mensaje.read
  ).length;

  const handleRead = async (msjId) => {
    await markMessageAsRead(msjId, token);
    setMessages((msj) =>
      msj.map((mensaje) =>
        mensaje.id === msjId ? { ...mensaje, read: true } : mensaje
      )
    );
  };

  return (
    <div className="container py-5">
      <h2 className="mb-4">
        Notifications{" "}
        <span className="badge btn-lemon">{conteoDeMensajesNoLeidos}</span>
      </h2>
      {loading ? (
        <p>Loading...</p>
      ) : messages.length === 0 ? (
        <p>No notifications.</p>
      ) : (
        <ul className="list-group">
          {messages.map((mensaje) => (
            <li
              key={mensaje.id}
              className={`list-group-item d-flex justify-content-between align-items-start ${
                mensaje.read ? "opacity-50" : "fw-bold"
              }`}
              style={{ cursor: "pointer" }}
              onClick={() => handleRead(mensaje.id)}
              title={mensaje.content}
            >
              <div className="d-flex align-items-center gap-3">
                {/* Foto del remitente */}
                <img
                  src={
                    mensaje.sender?.profile_picture || "/default-profile.png"
                  }
                  alt={mensaje.sender?.first_name || "Sender"}
                  className="rounded-circle"
                  style={{ width: 40, height: 40, objectFit: "cover" }}
                />
                <div>
                  <div>
                    {/* Nombre y apellido remitente */}
                    <b>
                      {mensaje.sender?.first_name} {mensaje.sender?.last_name}
                    </b>
                    <span className="text-muted ms-2">
                      {mensaje.sender?.email}
                    </span>
                  </div>
                  {/* Mensaje */}
                  <div>{mensaje.content}</div>
                  {/* Info del animal si existe */}
                  {mensaje.animal && (
                    <div className="text-secondary">
                      🐾 <b>{mensaje.animal.name}</b> (
                      {mensaje.animal.animal_type}, {mensaje.animal.race})
                    </div>
                  )}
                  <div>
                    <p className="text-secondary">
                      {new Date(mensaje.created_at).toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
              {!mensaje.read && (
                <span className="badge btn-orange ms-2">New</span>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
