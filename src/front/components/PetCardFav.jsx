import React from "react";
import { Card, Button, Col } from "react-bootstrap";

export const PetCardFav = ({ pet, toggleFavorite, isFavorite }) => {
  return (
    <Col xs={12} sm={6} md={4} lg={3}>
      <Card className="pet-card">
        <Card.Img variant="top" src={pet.image} className="pet-image" />
        <Card.Body className="text-center">
          <Card.Title>{pet.name}</Card.Title>
          <Card.Text>{pet.breed}</Card.Text>
          <Card.Text className="text-muted">{pet.age}</Card.Text>
          <Button
            variant={isFavorite ? "danger" : "outline-primary"}
            onClick={() => toggleFavorite(pet.id)}
          >
            {isFavorite ? "❤️ Favorito" : "🤍 Agregar"}
          </Button>
        </Card.Body>
      </Card>
    </Col>
  );
};
