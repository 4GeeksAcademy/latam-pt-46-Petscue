import React from "react";
import { Form, Row, Col } from "react-bootstrap";
import { TiPen } from "react-icons/ti";

export const Filters = ({ filters, setFilters }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters(prevFilters => {
      const newFilters = { ...prevFilters, [name]: value };
      if (name === "animal_type") {
        newFilters.race = "";
        newFilters.age = "";
      }
      return newFilters;
    });
  };
  const selectedAnimalType = filters.animal_type

  const getRaceOptions = (animalType) => {
    const commonAllOption = <option value="">Todas las Razas</option>;
    switch (animalType) {
      case "dog":
        return (
          <>
            {commonAllOption}
            <option value="Labrador">Labrador</option>
            <option value="Poodle">Poodle</option>
            <option value="German Shepherd">Pastor Alemán</option>
            <option value="Boxer">Bóxer</option>
            <option value="Chihuahua">Chihuahua</option>
            <option value="Mixed Breed">Mezcla</option> 
          
          </>
        );
      case "cat":
        return (
          <>
            {commonAllOption}
            <option value="Siamese">Siamés</option>
            <option value="Persian">Persa</option>
            <option value="Maine Coon">Maine Coon</option>
            <option value="Bengal">Bengalí</option>
            
          </>
        );
      case "rabbit":
        return (
          <>
            {commonAllOption}
            <option value="Netherland Dwarf">Netherland Dwarf</option>
            <option value="Holland Lop">Holland Lop</option>
            <option value="Lionhead">Lionhead</option>
            
          </>
        );
      default:
        return commonAllOption;
    }
  };

  
  const getAgeOptions = (animalType) => {
    const commonAllOption = <option value="">Todas las Edades</option>;
    
    switch (animalType) {
      case "dog":
        return (
          <>
            {commonAllOption}
            <option value="0-1">Cachorro (0-1 año)</option>
            <option value="2-7">Joven (2-7 años)</option>
            <option value="8+">Adulto (+8 años)</option>
          </>
        );
      case "cat":
        return (
          <>
            {commonAllOption}
            <option value="0-0.5">Gatito (0-6 meses)</option>
            <option value="0.5-2">Joven (6 meses-2 años)</option>
            <option value="3+">Adulto (+3 años)</option>
          </>
        );
      case "rabbit":
          return (
            <>
              {commonAllOption}
              <option value="0-0.5">Cría (0-6 meses)</option>
              <option value="0.5-3">Adulto joven (6 meses-3 años)</option>
              <option value="4+">Adulto (+4 años)</option>
          </>
        );
      default:
        return commonAllOption;
    }
  }

  return (
    <Form className="mb-3">
      <Row>
        <Col>
          <Form.Select name="animal_type" onChange={handleChange} value={filters.animal_type}>
            <option value="">Todos los Tipos</option>
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
          <Form.Select name="race" onChange={handleChange} value={filters.race}>
            {getRaceOptions(selectedAnimalType)}
          </Form.Select>
        </Col>
      </Row>
    </Form>
  );
};