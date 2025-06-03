import React, { useEffect, useState } from "react";
import { updateAnimal } from "../services/updateAnimal";
import { useNavigate, useParams } from "react-router-dom";
import { getAnimalById } from "../services/getAnimalByID";

export const EditAnimalForm = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // suponiendo que viene de /edit-animal/:id
  const [message, setMessage] = useState("");
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(true);

  const [animal, setAnimal] = useState({
    name: "",
    age: 0,
    animal_type: "",
    race: "",
    color: "",
    vaccines: "",
    description: "",
    photo: "",
  });

  useEffect(() => {
    const fetchAnimal = async () => {
      try {
        const data = await getAnimalById(id);
        setAnimal(data);
        setLoading(false);
      } catch (err) {
        setMessage("Error loading animal info");
        setLoading(false);
      }
    };
    fetchAnimal();
  }, [id]);

  const handlePhotoUpload = async (e) => {
    const files = e.target.files;
    if (!files.length) return;

    setUploading(true);

    const data = new FormData();
    data.append("file", files[0]);
    data.append("upload_preset", "petscue_preset");
    data.append("cloud_name", "dtljfvq5m");

    const res = await fetch(
      "https://api.cloudinary.com/v1_1/dtljfvq5m/image/upload",
      {
        method: "POST",
        body: data,
      }
    );

    if (!res.ok) {
      setUploading(false);
      throw new Error("Failed to upload photo");
    }
    const uploaded = await res.json();
    if (uploaded.secure_url) {
      setAnimal((prev) => ({
        ...prev,
        photo: uploaded.secure_url,
      }));
    }

    setUploading(false);
  };

  const handleEditAnimal = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    try {
      await updateAnimal(id, animal, token);
      navigate("/profile/profileanimal");
    } catch (error) {
      const errorMsg =
        error?.response?.data?.message || error.message || "Error desconocido";
      setMessage("Update error: " + errorMsg);
    }
  };

  if (loading) return <div className="text-center mt-5">Loading...</div>;

  return (
    <div className="container mb-5 d-flex justify-content-center">
      <div className="card shadow-lg rounded-4 bg-light w-75">
        <div className="card-body p-4">
          <h2 className="mb-4 text-center fw-bold">Edit Animal</h2>
          <form onSubmit={handleEditAnimal}>
            {/* Campos del formulario igual que antes, solo que usando `animal` */}
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Name
              </label>
              <input
                value={animal.name}
                onChange={(e) => setAnimal({ ...animal, name: e.target.value })}
                type="text"
                className="form-control"
                id="name"
                name="name"
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="age" className="form-label">
                Age
              </label>
              <input
                value={animal.age}
                onChange={(e) => setAnimal({ ...animal, age: e.target.value })}
                type="number"
                className="form-control"
                id="age"
                name="age"
                required
                min="0"
              />
            </div>

            <div className="mb-3">
              <label htmlFor="animal_type" className="form-label">
                Type of animal
              </label>
              <select
                value={animal.animal_type}
                onChange={(e) =>
                  setAnimal({ ...animal, animal_type: e.target.value })
                }
                className="form-select"
                id="animal_type"
                name="animal_type"
                required
              >
                <option value="dog">Dog</option>
                <option value="cat">Cat</option>
                <option value="rabbit">Rabbit</option>
              </select>
            </div>

            <div className="mb-3">
              <label htmlFor="race" className="form-label">
                Breed
              </label>
              <input
                value={animal.race}
                onChange={(e) => setAnimal({ ...animal, race: e.target.value })}
                type="text"
                className="form-control"
                id="race"
                name="race"
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="color" className="form-label">
                Color
              </label>
              <input
                value={animal.color}
                onChange={(e) =>
                  setAnimal({ ...animal, color: e.target.value })
                }
                type="text"
                className="form-control"
                id="color"
                name="color"
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="vaccines" className="form-label">
                Vaccines
              </label>
              <textarea
                value={animal.vaccines}
                onChange={(e) =>
                  setAnimal({ ...animal, vaccines: e.target.value })
                }
                className="form-control"
                id="vaccines"
                name="vaccines"
                rows={3}
              ></textarea>
            </div>

            <div className="mb-3">
              <label htmlFor="photo" className="form-label">
                Upload photo
              </label>
              <input
                onChange={handlePhotoUpload}
                disabled={uploading}
                className="form-control"
                type="file"
                id="photo"
                accept="image/*"
              />
              {animal.photo && (
                <img
                  src={animal.photo}
                  alt="Animal preview"
                  className="img-thumbnail mt-2"
                  style={{ maxWidth: 120 }}
                />
              )}
            </div>

            <div className="mb-3">
              <label htmlFor="description" className="form-label">
                Description
              </label>
              <textarea
                value={animal.description}
                onChange={(e) =>
                  setAnimal({ ...animal, description: e.target.value })
                }
                className="form-control"
                id="description"
                name="description"
                rows={2}
              ></textarea>
            </div>

            <button
              type="submit"
              className="btn btn-warning w-100 fw-semibold"
              disabled={uploading}
            >
              {uploading ? "Updating..." : "Update Animal"}
            </button>

            {message && (
              <div
                className="alert alert-warning text-center mt-3"
                role="alert"
              >
                {message}
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};
