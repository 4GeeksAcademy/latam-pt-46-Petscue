import { Card, Button } from "react-bootstrap";
import { singlePet } from "../services/singlePet";
import { useParams } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { useEffect, useState } from "react";
import { AdoptionForm } from "../components/AdoptionForm"
import { Link } from "react-router-dom";

export const PetProfile = () => {
  const { id } = useParams();
  const { store, dispatch } = useGlobalReducer();
  const { currentPet } = store;
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPet = async () => {
      try {
        const petData = await singlePet(id);
        dispatch({ type: "SET_CURRENT_PET", payload: petData });
      } catch (err) {
        console.error("Error loading data:", err);
        setError("There was a problem loading the data.");
      }
    };

    fetchPet();
  }, [id, dispatch]);

  if (!currentPet) return <p>Loading...</p>;

  return (
    <Card
      className="p-4 shadow-lg mx-auto mt-5"
      style={{ maxWidth: "1000px", height: "550px", marginBottom: "85px" }}
    >
      <div className="d-flex flex-row">
        {/* Imagen o avatar del animal */}
        <div className="me-4">
          <div
            style={{
              width: "200px",
              height: "200px",
              borderRadius: "20px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {/* Imagen como placeholder */}
            <img
              src={currentPet.photo}
              alt="Pet"
              style={{ width: "200px", height: "200px", objectFit: "cover" }}
            />
          </div>
        </div>

        {/* Información principal */}
        <div className="flex-grow-1">
          <div className="d-flex justify-content-between align-items-start">
            <div>
              <h3 className="fw-bold mb-1">{currentPet.name}</h3>
            </div>
          </div>

          <div className="d-flex justify-content-between bg-light rounded p-3 my-3">
            <div>
              <small className="text-muted fs-5">Breed</small>
              <div className="fw-semibold fs-5">{currentPet.race}</div>
            </div>
            <div>
              <small className="text-muted fs-5">Age</small>
              <div className="fw-semibold fs-5">{currentPet.age}</div>
            </div>
            <div>
              <small className="text-muted ">Color</small>
              <div className="fw-semibold fs-5">{currentPet.color}</div>
            </div>
          </div>

          <p className="text-muted fs-5" style={{ lineHeight: "1.6" }}>
            {currentPet.description}. 🐾
            <br />
            <br />
            vaccines: <br />
            {currentPet.vaccines}
          </p>

          <hr />

          <div className="d-flex justify-content-between align-items-center mt-3">
            <div className="d-flex align-items-center">
        
              <div>
              
                <Link to="/inicio" className="text-decoration-none text-black font-bold"><strong>Go back to main</strong></Link>
                <div
                  className="text-muted fs-5"
                  style={{ fontSize: "0.9rem" }}
                ></div>
              </div>
            </div>
            <div>
         
            </div>

            {/* modallll */}
            <AdoptionForm name={currentPet.name} carerId={currentPet.added_by_id}/>
            
            {/* boton que abre el modal */}
            <button
              className="btn btn-lemon"
              data-bs-target="#exampleModalToggle"
              data-bs-toggle="modal"
            >
              Start Inquiry
            </button>
          </div>
        </div>
      </div>
    </Card>
  );
};
