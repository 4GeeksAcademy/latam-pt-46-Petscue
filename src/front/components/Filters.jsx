import React from "react";
import { Form, Row, Col } from "react-bootstrap";
import { TiPen } from "react-icons/ti";

export const Filters = ({ filters, setFilters }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters(prevFilters => {
      const newFilters = { ...prevFilters, [name]: value };
      if (name === "animal_type" && value !== prevFilters.animal_type) {
        newFilters.raceInitial = "";
        newFilters.age = "";
      }
      return newFilters;
    });
  };
  const selectedAnimalType = filters.animal_type

  const getAgeOptions = (animalType) => {
    const commonAllOption = <option value="">All age</option>;
    
    switch (animalType) {
      case "dog":
        return (
          <>
            {commonAllOption}
            <option value="0-1">Puppy (0-1 year)</option>
            <option value="2-7">Junior (2-7 years)</option>
            <option value="8+">Senior (+8 years)</option>
          </>
        );
      case "cat":
        return (
          <>
            {commonAllOption}
            <option value="0-1">Kitten (0-1 year)</option>
            <option value="2-3">Junior (2-3 years)</option>
            <option value="4+">Senior (+4 years)</option>
          </>
        );
      case "rabbit":
          return (
            <>
              {commonAllOption}
              <option value="0-1">Bunny (0-1 year)</option>
              <option value="2-3">junior (2-3 years)</option>
              <option value="4+">senior (+4 years)</option>
          </>
        );
      default:
        return commonAllOption;
    }
  }
  const getAlphabetOptions = () => {
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
    return (
      <>
        <option value="">Breed Initial</option>
        {alphabet.map((letter) => (
          <option key={letter} value={letter}>
            {letter}
          </option>
        ))}
      </>
    );
  };

  return (
    <Form className="mb-3">
      <Row>
        <Col>
          <Form.Select name="animal_type" onChange={handleChange} value={filters.animal_type}>
            <option value="">All types</option>
            <option value="dog">Dog</option>
            <option value="cat">Cat</option>
            <option value="rabbit">Rabbit</option>
          </Form.Select>
        </Col>
        <Col>
          <Form.Select name="age" onChange={handleChange} value={filters.age}>
            {getAgeOptions(selectedAnimalType)}
          </Form.Select>
        </Col>
        <Col>
          <Form.Select name="raceInitial" onChange={handleChange} value={filters.raceInitial}>
            {getAlphabetOptions()}
          </Form.Select>
        </Col>
      </Row>
    </Form>
  );
};