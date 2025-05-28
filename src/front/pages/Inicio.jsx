import React, { useEffect, useState } from "react";
import { PetCardFav } from "../components/PetCardFav";
import { Filters } from "../components/Filters";
import { Container, Row, Button } from "react-bootstrap";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { useNavigate } from "react-router-dom";
import { pets } from "../services/pets";
import { getFavorites, toggleFavoriteAPI } from "../services/addFavorites";

export const Inicio = () => {
  const { store, dispatch } = useGlobalReducer();
  const { favorites, filters } = store;
  const [error, setError] = useState("");
  const [animals, setAnimals] = useState([]);
  const [localFilters, setLocalFilters] = useState({ age: "", race: "" });

  const navigate = useNavigate();

  const handleGoToFavorites = () => {
    navigate("/favorites");
  };


  const toggleFavorite = async (id) => {
    try {
      await toggleFavoriteAPI(id);
      dispatch({ type: "TOGGLE_FAVORITE", payload: id });
    } catch (error) {
      console.error("Error toggling favorite:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const animalList = await pets();
        const favoriteIds = await getFavorites();

        setAnimals(animalList);
        dispatch({ type: "SET_FAVORITES", payload: favoriteIds });
      } catch (err) {
        console.error("Error al cargar datos:", err);
        setError("Hubo un problema al cargar los datos.");
      }
    };

    fetchData();
  }, [dispatch]);


  const filteredAnimals = animals.filter((pet) => {
    const matchesAge = localFilters.age ? pet.age === localFilters.age : true;
    const matchesRace = localFilters.race
      ? pet.race === localFilters.race
      : true;
    return matchesAge && matchesRace;
  });
  return (
    <div className="page-wrapper">
      <Container className="py-4">
        <h2 className="title mb-4 text-center">Adopt-a-Pet</h2>

        <div className="mb-4 d-flex justify-content-center gap-3">
          <Button variant="outline-primary" onClick={handleGoToFavorites}>
            see favorites ({favorites.length})
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
      </Container>
    </div>
  );
};
