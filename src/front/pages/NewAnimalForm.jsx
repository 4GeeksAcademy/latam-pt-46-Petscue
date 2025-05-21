import { useState } from "react"
import { createNewAnimal } from "../services/createNewAnimal"
import { useNavigate } from "react-router-dom"

export const NewAnimalForm = () => {

  const navigate = useNavigate()
  const [message, setMessage] = useState("");

  const [newAnimal, setNewAnimal] = useState({
    name: "",
    age: 0,
    animal_type: "",
    race: "",
    color: "",
    vaccines: "",
    photo: "",
  })

  const handleNewAnimal = async (e) => {
    e.preventDefault()
    console.log(newAnimal)
    try { 
      await createNewAnimal(newAnimal)
      setTimeout(() => navigate("/profile"), 1500);
    }
    catch (error) {
      const errorMsg = error?.response?.data?.message || error.message || "Error desconocido";
      setMessage("Registration error: " + errorMsg);
    }
  }
  return (
    <div className="container mb-5 d-flex justify-content-center ">
      <div className="card shadow-lg rounded-4 bg-light w-75" >
        <div className="card-body p-4">
          <h2 className="mb-4 text-center fw-bold " >
            Register New Animal
          </h2>
          <form
            onSubmit={handleNewAnimal}
          >
            <div className="mb-3">
              <label htmlFor="name" className="form-label">Name</label>
              <input onChange={(e) =>
                setNewAnimal({ ...newAnimal, name: e.target.value })
              } value={newAnimal.name} type="text" className="form-control" id="name" name="name" required autoFocus />
            </div>
            <div className="mb-3">
              <label htmlFor="age" className="form-label">Age</label>
              <input onChange={(e) =>
                setNewAnimal({ ...newAnimal, age: e.target.value })
              } value={newAnimal.age} type="number" className="form-control" id="age" name="age" min="0" required />
            </div>
            <div className="mb-3">
              <label htmlFor="animal_type" className="form-label">Type of animal</label>
              <select onChange={(e) => setNewAnimal({ ...newAnimal, animal_type: e.target.value })}
                value={newAnimal.animal_type} className="form-select" id="animal_type" name="animal_type" required>

                <option value="dog">Dog</option>
                <option value="cat">Cat</option>
                <option value="rabbit">Rabbit</option>

              </select>
            </div>

            <div className="mb-3">
              <label htmlFor="race" className="form-label">Breed</label>
              <input onChange={(e) =>
                setNewAnimal({ ...newAnimal, race: e.target.value })
              } value={newAnimal.race} type="text" className="form-control" id="race" name="race" required />
            </div>

            <div className="mb-3">
              <label htmlFor="color" className="form-label">Color</label>
              <input onChange={(e) =>
                setNewAnimal({ ...newAnimal, color: e.target.value })
              } value={newAnimal.color} type="text" className="form-control" id="color" name="color" required />
            </div>

            <div className="mb-3">
              <label htmlFor="vaccines" className="form-label">Vaccines</label>
              <textarea onChange={(e) =>
                setNewAnimal({ ...newAnimal, vaccines: e.target.value })
              } value={newAnimal.vaccines} className="form-control" id="vaccines" name="vaccines" placeholder="Vaccinations received (optional)" rows={2}></textarea>
            </div>

            <div className="mb-3">
              <label htmlFor="photo" className="form-label">Photos</label>
              <input onChange={(e) =>
                setNewAnimal({ ...newAnimal, photo: e.target.value })
              } value={newAnimal.photo} type="url" className="form-control" id="photo" name="photo" placeholder="Upload the pics!" />
            </div>
            <button
              type="submit"
              className="btn btn-lemon w-100 fw-semibold"

            >
              Upload to the platform!
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
