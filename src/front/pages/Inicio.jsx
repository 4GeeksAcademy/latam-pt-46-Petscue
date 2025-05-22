import React from "react";
import { PetCardFav } from "../components/PetCardFav";
import { Filters } from "../components/Filters";
import { pets } from "../services/pets";
import { Favorites } from "./Favorites";
import { Container, Row, Button } from "react-bootstrap";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { useNavigate } from "react-router-dom";

export const Inicio = () => {
  const { store, dispatch } = useGlobalReducer();
  const { favorites, filters, showFavorites } = store;
  const navigate = useNavigate();

  const handleGoToFavorites = () => {
    navigate("/favorites");
  };

  const toggleFavorite = (id) => {
    dispatch({ type: "TOGGLE_FAVORITE", payload: id });
  };

  const handleFilterChange = (newFilters) => {
    dispatch({ type: "SET_FILTERS", payload: newFilters });
  };

  const filteredPets = pets.filter(
    (p) =>
      (!filters.age || p.age === filters.age) &&
      (!filters.breed || p.breed === filters.breed)
  );

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

        <Filters filters={filters} setFilters={handleFilterChange} />
        <Row className="g-4">
          {filteredPets.map((pet) => (
            <PetCardFav
              key={pet.id}
              pet={pet}
              toggleFavorite={toggleFavorite}
              isFavorite={favorites.includes(pet.id)}
            />
          ))}
        </Row>
      </Container>
    </div>
  );
};
