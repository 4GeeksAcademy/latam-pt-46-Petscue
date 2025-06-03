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
              className={`list-group-item d-flex p-5 justify-content-between align-items-start ${
                mensaje.read ? "opacity-50" : "fw-bold"
              }`}
              title={mensaje.content}
            >
              <div className="align-items-center gap-3">
                <h3>Message Sent to {mensaje.receiver?.first_name}</h3>
                <div>
                  <p className="text-secondary">
                    {new Date(mensaje.created_at).toLocaleString()}
                  </p>
                </div>
                <div className="d-flex row w-100">
                  <div className="mt-4 d-flex col-10">
                  
                    <img
                      src={
                        mensaje.receiver?.profile_picture
                      }
                      alt={mensaje.receiver?.first_name}
                      className="rounded-circle me-4"
                      style={{ width: 120, height: 120, objectFit: "cover" }}
                    />
                    <div>
                      <div classname="">
                        {/* Nombre y apellido destinatario */}
                        <h5 classname="mb-5">info of the Carer of {mensaje.animal.name}:</h5>
                        <b>
                          {mensaje.receiver?.first_name}{" "}
                          {mensaje.receiver?.last_name}
                        </b>
                        <span className="text-muted ms-2">
                          {mensaje.receiver?.email}
                        </span>
                      </div>
                      {/* Mensaje */}
                      <br/>
                      <div classname="">
                        <h6 classname="my-5">Message sent:</h6>
                        {mensaje.content}
                      </div>
                    </div>
                  </div>
                  <div div className="mt-4  col-2">
                    {/* Info del animal si existe */}
                    {mensaje.animal && (
                      <div className="text-secondary">
                        <img
                      src={mensaje.animal.photo}
                      alt={mensaje.animal.name}
                      className="rounded-circle me-4"
                      style={{ width: 120, height: 120, objectFit: "cover" }}
                    />
                        🐾 <b>{mensaje.animal.name}</b> (
                        {mensaje.animal.animal_type}, {mensaje.animal.race})
                        
                      </div>
                      
                    )}
                  </div>
                </div>
              </div>
              {/* Estado de mensaje LEÍDO por el destinatario */}
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
