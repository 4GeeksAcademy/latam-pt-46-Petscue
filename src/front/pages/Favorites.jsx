import React from "react";
import { Container, Row } from "react-bootstrap";
import { PetCardFav } from "../components/PetCardFav";
import { pets } from "../services/pets";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const Favorites = () => {
  const { store, dispatch } = useGlobalReducer();
  const { favorites } = store;

  const favoritePets = pets.filter((pet) => favorites.includes(pet.id));

  const toggleFavorite = (id) => {
    dispatch({ type: "TOGGLE_FAVORITE", payload: id });
  };

  return (
    <Container className="py-4">
      <h2 className="title mb-4 text-center">Tus Favoritos</h2>
      <Row className="g-4">
        {favoritePets.map((pet) => (
          <PetCardFav
            key={pet.id}
            pet={pet}
            toggleFavorite={toggleFavorite}
            isFavorite={true}
          />
        ))}
      </Row>
    </Container>
  );
};