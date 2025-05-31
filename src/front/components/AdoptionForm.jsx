import { useState } from "react";
import { sendMessageToPetCarer } from "../services/sendMessageToPetCarer";
import useGlobalReducer from "../hooks/useGlobalReducer"

export const AdoptionForm = ({ name, carerId }) => {
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState(null);
  const { store } = useGlobalReducer();
  // Si el store no tiene token actualizado, puedes fallback al localStorage:
  const token = store.token || localStorage.getItem("token") || "";

    const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus(null);

    try {
      await sendMessageToPetCarer({
        userId: carerId,  // este es added_by_id
        message,
        token,
      });
      setStatus("Message sent! 🚀");
      setMessage("");
    } catch (error) {
      setStatus("Oops, something went wrong 😔");
    }
  }

  return (
    <>
      <div
        className="modal fade"
        id="exampleModalToggle"
        aria-hidden="true"
        aria-labelledby="exampleModalToggleLabel"
        tabIndex="-1"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalToggleLabel">
                Fill the form to contact the carer of {name}
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>

            {/* modal body */}
            <div className="modal-body">
              <form  onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">
                    Message
                  </label>
                  <textarea
                    className="form-control"
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                    id="description"
                    name="description"
                    placeholder={`Hey, I am interested in ${name}, and would like to know more and potentially meet`}
                    rows={3}
                  ></textarea>
                </div>
                {/* button */}
                <div className="modal-footer">
                  <button
                    className="btn btn-orange"
                    data-bs-target="#exampleModalToggle2"
                    data-bs-toggle="modal"
                  >
                    Send Message
                  </button>
                          {status && (
                  <div className="alert alert-info my-2" role="alert">
                    {status}
                  </div>
                )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
