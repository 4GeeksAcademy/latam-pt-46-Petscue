import React from "react";
import { Card, Button, Col } from "react-bootstrap";

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
  return (
    <Col xs={12} sm={6} md={4} lg={3}>
      <Card className="pet-card">
        <Card.Img
          variant="top"
          src={typeof photo === "string" ? photo : photo?.image}
        />
        <Card.Body className="text-center">
          <Card.Title className="card-Title">Name: {name}</Card.Title>
          <Card.Text className="Card-Text">Breed: {race}</Card.Text>
          <Card.Text className="text-muted Card-Text">Age: {age}</Card.Text>
          <Card.Text className="Card-Text">{description}</Card.Text>
          <Button
            className="Card-Text"
            variant={isFavorite ? "danger" : "outline-primary"}
            onClick={() => toggleFavorite(id)}
          >
            {isFavorite ? "❤️ Favorito" : "🤍 Agregar"}
          </Button>
        </Card.Body>
      </Card>
    </Col>
  );
};
