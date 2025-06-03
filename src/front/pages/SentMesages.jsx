import { useEffect, useState } from "react";
import { fetchMySentMessages } from "../services/messages";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const SentMessages = () => {
  const { store } = useGlobalReducer();
  const token = store.token || localStorage.getItem("token") || "";
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMessages = async () => {
      setLoading(true);
      try {
        const data = await fetchMySentMessages(token);
        setMessages(data);
      } catch (error) {
        console.error(error);
        setMessages([]);
      }
      setLoading(false);
    };
    if (token) fetchMessages();
  }, [token]);

  return (
    <div className="container py-5">
      <h2 className="mb-4">Sent Messages</h2>
      {loading ? (
        <p>Loading...</p>
      ) : messages.length === 0 ? (
        <p>You haven't sent any messages yet.</p>
      ) : (
        <ul className="list-group">
          {messages.map((mensaje) => (
            <li
              key={mensaje.id}
              className={`list-group-item d-flex justify-content-between align-items-start ${
                mensaje.read ? "opacity-50" : "fw-bold"
              }`}
              title={mensaje.content}
            >
              <div className="d-flex align-items-center gap-3">
                {/* la foto del destinatarioooo */}
                <img
                  src={
                    mensaje.receiver?.profile_picture || "/default-profile.png"
                  }
                  alt={mensaje.receiver?.first_name || "Receiver"}
                  className="rounded-circle"
                  style={{ width: 200, height: 200, objectFit: "cover" }}
                />
                <div>
                  <div>
                    {/* Name del destinatario */}
                    <b>
                      {mensaje.receiver?.first_name}
                      {mensaje.receiver?.last_name}
                    </b>
                    <span className="text-muted ms-2">
                      {mensaje.receiver?.email}
                    </span>
                  </div>
                  {/* El Mensajeee */}
                  <div>{mensaje.content}</div>
                  {/* Info del animal si es que existe */}
                  {mensaje.animal && (
                    <div className="mt-3 d-flex align-items-center gap-3 border-top border-light pt-3">
                      <img
                        src={mensaje.animal.photo || "/default-animal.png"}
                        alt={mensaje.animal.name}
                        className="rounded shadow"
                        style={{
                          width: 80,
                          height: 80,
                          objectFit: "cover",
                          border: "2px solid #e9e9e9",
                        }}
                      />
                      <div>
                        <div>
                          <span className="fw-bold">{mensaje.animal.name}</span>{" "}
                          <span className="text-muted">
                            ({mensaje.animal.animal_type}, {mensaje.animal.race}
                            )
                          </span>
                        </div>
                        <div className="text-secondary">
                          Color: {mensaje.animal.color}
                        </div>
                        <div className="text-secondary small">
                          {mensaje.animal.description}
                        </div>
                      </div>
                    </div>
                  )}
                  <div>
                    <p className="text-secondary">
                      {new Date(mensaje.created_at).toLocaleString()}
                    </p>
                  </div>
                  <img
                    src={mensaje.animal.photo}
                    alt={mensaje.receiver?.first_name || "Receiver"}
                    className="rounded-circle"
                    style={{ width: 200, height: 200, objectFit: "cover" }}
                  />
                </div>
              </div>
              {/* estado de mensaje marcado como leiiido por el destinatario */}
              {mensaje.read ? (
                <span className="badge bg-success ms-2">Read</span>
              ) : (
                <span className="badge bg-secondary ms-2">Not read yet</span>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
