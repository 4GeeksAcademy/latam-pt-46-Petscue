import React from "react";
import { Card, Button, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const PetCardFav = ({

  photo,
  name,
  race,
  age,
  toggleFavorite,
  isFavorite,
  id,
  description,
}) => {
  const { dispatch } = useGlobalReducer();
  const navigate = useNavigate(); 

  const handleGoToPet = () => {
    dispatch({type: "SET_CURRENT_PET", payload: id})
    navigate(`/pet/${id}`);
  };

  return (
    <Col xs={12} sm={6} md={4} lg={3}>
      <Card className="pet-card">
        <Card.Img
          className="img-animal-card-inicio" variant="top"
          src={typeof photo === "string" ? photo : photo?.image}
        />
        <Card.Body className="text-center">
          <Card.Title className="card-Title">Name: {name}</Card.Title>
          <Card.Text className="Card-Text">Breed: {race}</Card.Text>
          <Card.Text className="text-muted Card-Text">Age: {age}</Card.Text>
          <Card.Text className="Card-Text description overflow-hidden overflow-y-scroll custom-scroll-2">{description}</Card.Text>
          <Button
            className="Card-Text me-3"
            variant={isFavorite ? "danger" : "outline-primary"}
            onClick={() => toggleFavorite(id)}
          >
            {isFavorite ? "❤️ Favorite" : "🤍 Add"}
          </Button>

          <Button  variant="outline-primary" onClick={handleGoToPet}>
            Learn More!
          </Button>
        </Card.Body>
      </Card>
    </Col>
  );
};
