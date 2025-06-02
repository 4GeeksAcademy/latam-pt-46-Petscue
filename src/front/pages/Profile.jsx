import { AnimalFilters } from "../components/AnimalFilters";
import { AnimalCard } from "../components/AnimalCard";
import { getMyAnimals } from "../services/getMyAnimals";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteAnimal } from "../services/deleteAnimal";
import toast, { Toaster } from "react-hot-toast";
import { Button } from "react-bootstrap";

export const Profile = () => {
  const [myAnimals, setMyAnimals] = useState([]);
  const navigate = useNavigate();
  const [selectedAnimalType, setSelectedAnimalType] = useState("");

  useEffect(() => {
    const fetchAnimals = async () => {
      try {
        const animals = await getMyAnimals();
        setMyAnimals(animals);
      } catch (error) {
        console.log(error);
      }
    };
    fetchAnimals();
  }, []);

  const handleEdit = (id) => {
    navigate(`/profile/edit/${id}`);
  };

  const handleDelete = (id) => {
    toast((t) => (
      <span>
        Are you sure you want to <b>delete</b> this animal?
        <div className="d-flex justify-content-center">
          <Button
            className="mx-4"
            variant="outline-primary"
            onClick={async () => {
              try {
                await deleteAnimal(id);
                toast.success("Animal deleted");
                toast.dismiss(t.id);
                navigate("/profile");
              } catch (error) {
                toast.error("Error deleting animal");
                toast.dismiss(t.id);
              }
            }}
          >
            Yes
          </Button>
          <Button variant="outline-danger" onClick={() => toast.dismiss(t.id)}>
            Cancel
          </Button>
        </div>
      </span>
    ));
  };

  const filteredAnimals = myAnimals.filter((animal) => {
    if (!selectedAnimalType) {
      return true;
    }
    return animal.animal_type === selectedAnimalType;
  });

  return (
    <div className="">
      <Toaster position="top-center" reverseOrder={false} />
      <div className=" d-flex justify-content-around my-5">
        <h2 className="mb-4 text-center">Uploaded Animals</h2>
        <AnimalFilters 
          selectedAnimalType={selectedAnimalType}
          onSelectedAnimalType={setSelectedAnimalType}
        />
      </div>

      <div className="row gap-4 d-flex justify-content-center pb-5">
        {filteredAnimals.map((animal) => (
          <AnimalCard
            key={animal.id}
            id={animal.id}
            age={animal.age}
            name={animal.name}
            race={animal.race}
            description={animal.description}
            photo={animal.photo}
            onEdit={handleEdit}
            handleDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
};
