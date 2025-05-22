import { AnimalFilters } from "../components/AnimalFilters"
import { AnimalCard } from "../components/AnimalCard"
import { getMyAnimals } from "../services/getMyAnimals"
import { useEffect, useState } from "react"


export const Profile = () => {

  const [myAnimals, setMyAnimals] = useState([])

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

  return (
    <div className="">
      <div className=" d-flex justify-content-around my-5">
        <h2 className="mb-4 text-center">Your Rescued Bros</h2>
        <AnimalFilters />
      </div>

      <div className="row gap-3 d-flex justify-content-center pb-5">
        {myAnimals.map((animal) => (
          <AnimalCard 
            key={animal.id}           
            age={animal.age}
            name={animal.name}
            race={animal.race} />
        ))}
      </div>
    </div>






  )
}
