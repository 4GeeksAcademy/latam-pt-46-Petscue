import React, { useEffect, useState } from "react";
import { PetCardFav } from "../components/PetCardFav";
import { Filters } from "../components/Filters";
import { Container, Row, Button } from "react-bootstrap";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { useNavigate } from "react-router-dom";
import { pets } from "../services/pets";
import { getFavorites, toggleFavoriteAPI } from "../services/addFavorites";
import toast, { Toaster } from "react-hot-toast";
import { FaHeart } from "react-icons/fa";

export const Inicio = () => {
  const { store, dispatch } = useGlobalReducer();
  const { favorites, token } = store;
  const [error, setError] = useState("");
  const [animals, setAnimals] = useState([]);
  const [localFilters, setLocalFilters] = useState({
    animal_type: "",
    age: "",
    raceInitial: "",
  });

  const navigate = useNavigate();

  const handleGoToFavorites = () => {
    navigate("/profile/favorites");
  };

  const toggleFavorite = async (id) => {
    if (!token) {
      toast("You must log in to save favorites", {
        icon: "👏",
      });
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
    const matchesAnimalType = localFilters.animal_type
      ? pet.animal_type === localFilters.animal_type
      : true;

    const matchesAge = (() => {
      if (!localFilters.age) {
        return true;
      }
      const petAgeNum = parseInt(pet.age, 10);

      switch (localFilters.age) {
        case "0-1":
          return petAgeNum >= 0 && petAgeNum <= 1;
        case "2-7":
          return petAgeNum >= 2 && petAgeNum <= 7;
        case "8+":
          return petAgeNum >= 8;
        case "2-3":
          return petAgeNum >= 2 && petAgeNum <= 3;
        case "4+":
          return petAgeNum >= 4;
        default:
          return true;
      }
    })();

    const matchesRaceInitial = (() => {
      if (!localFilters.raceInitial) {
        return true;
      }
      const firstLetterOfRace = String(pet.race || "")
        .charAt(0)
        .toUpperCase();
      const selectedInitial = localFilters.raceInitial.toUpperCase();
      return firstLetterOfRace === selectedInitial;
    })();
    return matchesAnimalType && matchesAge && matchesRaceInitial;
  });

  return (
    <div className="page-wrapper">
      <Toaster position="top-center" reverseOrder={false} />
      <Container className="py-4">
        <h2 className="title mb-4 text-center">Adopt-a-Pet</h2>

        <div className="mb-4 d-flex justify-content-center gap-3">
          <button className="favorite-button" onClick={handleGoToFavorites}>
            <div className="heart-icon-container">
              <FaHeart className="heart-icon" />
              {favorites.length > 0 && (
                <span className="heart-badge">{favorites.length}</span>
              )}
            </div>
            See Favorites
          </button>
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
