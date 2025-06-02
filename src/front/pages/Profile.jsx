import { AnimalFilters } from "../components/AnimalFilters";
import { AnimalCard } from "../components/AnimalCard";
import { getMyAnimals } from "../services/getMyAnimals";
import { useEffect, useState } from "react";

export const Profile = () => {
  const [myAnimals, setMyAnimals] = useState([]);
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

  const filteredAnimals = myAnimals.filter((animal) => {
    if (!selectedAnimalType) {
      return true;
    }
    return animal.animal_type === selectedAnimalType;
  });

  return (
    <div className="">
      <div className=" d-flex justify-content-around my-5">
        <h2 className="mb-4 text-center">Uploaded Animals</h2>
        <AnimalFilters 
          selectedAnimalType={selectedAnimalType}
          onSelectedAnimalType={setSelectedAnimalType}
        />
      </div>

      <div className="row gap-3 d-flex justify-content-center pb-5">
        {filteredAnimals.map((animal) => (
          <AnimalCard
            key={animal.id}
            age={animal.age}
            name={animal.name}
            race={animal.race}
            description={animal.description}
            photo={animal.photo}
          />
        ))}
      </div>
    </div>
  );
};
