import React from "react";
import { Form, Row, Col } from "react-bootstrap";

export const Filters = ({ filters, setFilters }) => {
  const handleChange = (e) =>
    setFilters({ ...filters, [e.target.name]: e.target.value });

  return (
    <Form className="mb-3">
      <Row>
        <Col>
          <Form.Select name="age" onChange={handleChange} value={filters.age}>
            <option value="">All Ages</option>
            <option value="Puppy">Puppy</option>
            <option value="Young">Young</option>
            <option value="Adult">Adult</option>
          </Form.Select>
        </Col>
        <Col>
          <Form.Select name="breed" onChange={handleChange} value={filters.race}>
            <option value="">All Breeds</option>
            <option value="Mixed Breed">Mixed Breed</option>
            <option value="Chihuahua Mix">Chihuahua Mix</option>
            <option value="Boxer Mix">Boxer Mix</option>
          </Form.Select>
        </Col>
      </Row>
    </Form>
  );
};