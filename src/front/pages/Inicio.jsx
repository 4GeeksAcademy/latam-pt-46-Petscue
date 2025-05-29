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
  const { favorites, filters, token } = store;
  const [error, setError] = useState("");
  const [animals, setAnimals] = useState([]);
  const [localFilters, setLocalFilters] = useState({ age: "", race: "" });

  const navigate = useNavigate();

  const handleGoToFavorites = () => {
    navigate("/favorites");
  };


  const toggleFavorite = async (id) => {
    if (!token) {
      alert("You must log in to save favorites");
      return;
    }
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
        setAnimals(animalList);

        if (token) {
          const favoriteIds = await getFavorites();
          dispatch({ type: "SET_FAVORITES", payload: favoriteIds });
        } else {
          dispatch({ type: "SET_FAVORITES", payload: [] });
        }
      } catch (err) {
        console.error("Error loading data:", err);
        setError("There was a problem loading the data.");
      }
    };

    fetchData();
  }, [dispatch, token]);


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
        {error && <div className="alert alert-info mt-3">{error}</div>}
      </Container>
    </div>
  );
};
