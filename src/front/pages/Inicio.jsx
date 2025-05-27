import React, { useEffect, useState } from "react";
import { PetCardFav } from "../components/PetCardFav";
import { Filters } from "../components/Filters";
import { Container, Row, Button } from "react-bootstrap";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { useNavigate } from "react-router-dom";
import { pets } from "../services/pets";


export const Inicio = () => {
  const { store, dispatch } = useGlobalReducer();
  const { favorites, filters, showFavorites } = store;
  const [animals, setAnimals] = useState([]);
  const [localFilters, setLocalFilters] = useState({ age: "", race: "" }); 

  const navigate = useNavigate();

  const handleGoToFavorites = () => {
    navigate("/favorites");
  };

  const toggleFavorite = (id) => {
    dispatch({ type: "TOGGLE_FAVORITE", payload: id });
  };


  useEffect(() => {
    const fetchAnimals = async () => {
      try {
        const animals = await pets();

        setAnimals(animals);
      } catch (error) {
        console.log(error);
      }
    };
    fetchAnimals();
  }, []);

  const filteredAnimals = animals.filter((pet) => {
    const matchesAge = localFilters.age ? pet.age === localFilters.age : true;
    const matchesRace = localFilters.race ? pet.race === localFilters.race : true;
    return matchesAge && matchesRace;
  });
  return (
    <div className="page-wrapper">
      <Container className="py-4">
        <h2 className="title mb-4 text-center">Adopt-a-Pet</h2>

        <div className="mb-4 d-flex justify-content-center gap-3">
          <Button
            variant={showFavorites ? "outline-primary" : "primary"}
            onClick={() =>
              dispatch({ type: "SET_SHOW_FAVORITES", payload: false })
            }
          >
            Ver Todos
          </Button>
          <Button variant="outline-primary" onClick={handleGoToFavorites}>
            Ver Favoritos ({favorites.length})
          </Button>
        </div>

        <div>
        <Filters filters={localFilters} setFilters={setLocalFilters} />
        </div>

        <Row className="g-4">
          {filteredAnimals.map((pet) => (
            <PetCardFav
              key={pet.id}
              id={pet.id}
              photo={pet.photo}
              name={pet.name}
              race={pet.race}
              age={pet.age}
              description={pet.description}
              toggleFavorite={toggleFavorite}
              isFavorite={favorites.includes(pet.id)}
            />

          ))}
        </Row>
      </Container >
    </div >
  );
};
