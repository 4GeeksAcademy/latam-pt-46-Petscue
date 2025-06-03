import React, { useState } from "react";
import { createNewAnimal } from "../services/createNewAnimal";
import { useNavigate } from "react-router-dom";

export const NewAnimalForm = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [uploading, setUploading] = useState(false);

  const [newAnimal, setNewAnimal] = useState({
    name: "",
    age: 0,
    animal_type: "",
    race: "",
    color: "",
    vaccines: "",
    description: "",
    photo: ""
  });

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
      throw new Error("Failed to upload photo");
    }
    const uploaded = await res.json();
    if (uploaded.secure_url) {
      setNewAnimal((prev) => ({
        ...prev,
        photo: uploaded.secure_url
      }));
    }

    setUploading(false);
  };

  const handleNewAnimal = async (e) => {
    e.preventDefault();
    try {
      await createNewAnimal(newAnimal);
      setTimeout(() => navigate("/profile/profileanimal"), 1500);
    } catch (error) {
      const errorMsg =
        error?.response?.data?.message || error.message || "Error desconocido";
      setMessage("Registration error: " + errorMsg);
    }
  };
  return (
    <div className="container mb-5 d-flex justify-content-center ">
      <div className="card shadow-lg rounded-4 bg-light w-75">
        <div className="card-body p-4">
          <h2 className="mb-4 text-center fw-bold ">Register New Animal</h2>
          <form onSubmit={handleNewAnimal}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Name
              </label>
              <input
                onChange={(e) =>
                  setNewAnimal({ ...newAnimal, name: e.target.value })
                }
                value={newAnimal.name}
                type="text"
                className="form-control"
                id="name"
                name="name"
                required
                autoFocus
              />
            </div>
            <div className="mb-3">
              <label htmlFor="age" className="form-label">
                Age
              </label>
              <input
                onChange={(e) =>
                  setNewAnimal({ ...newAnimal, age: e.target.value })
                }
                value={newAnimal.age}
                type="number"
                className="form-control"
                id="age"
                name="age"
                min="0"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="animal_type" className="form-label">
                Type of animal
              </label>
              <select
                onChange={(e) =>
                  setNewAnimal({ ...newAnimal, animal_type: e.target.value })
                }
                value={newAnimal.animal_type}
                className="form-select"
                id="animal_type"
                name="animal_type"
                required
              >
                <option value="" disabled></option>
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
                onChange={(e) =>
                  setNewAnimal({ ...newAnimal, race: e.target.value })
                }
                value={newAnimal.race}
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
                onChange={(e) =>
                  setNewAnimal({ ...newAnimal, color: e.target.value })
                }
                value={newAnimal.color}
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
                onChange={(e) =>
                  setNewAnimal({ ...newAnimal, vaccines: e.target.value })
                }
                value={newAnimal.vaccines}
                className="form-control"
                id="vaccines"
                name="vaccines"
                placeholder="Vaccinations received "
                rows={3}
              ></textarea>
            </div>

            <div className="mb-3">
              <label htmlFor="photo" className="form-label">Upload photo</label>
              <input
                disabled={uploading}
                onChange={handlePhotoUpload}
                className="form-control"
                type="file"
                id="photo"
                multiple
                accept="image/*"
              />

              {NewAnimalForm.photo && (
                <img src={newAnimal.photo} alt="preview of the animal pic to upload" className="img-thumbnail mt-2" style={{ maxWidth: 120 }} />
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="description" className="form-label">
                Description
              </label>
              <textarea
                onChange={(e) =>
                  setNewAnimal({ ...newAnimal, description: e.target.value })
                }
                value={newAnimal.description}
                className="form-control"
                id="description"
                name="description"
                placeholder="describe the animal you're uploding"
                rows={2}
              ></textarea>
            </div>

            <button
              type="submit"
              className="btn btn-lemon w-100 fw-semibold"
              disabled={uploading}
            >
              {uploading ? "Uploading..." : "Upload to the platform!"}{" "}
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
