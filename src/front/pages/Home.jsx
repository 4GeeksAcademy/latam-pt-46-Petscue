import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { AnimalCard } from "../components/AnimalCard.jsx";
import { AnimalFilters } from "../components/AnimalFilters.jsx";
import { useState, useEffect } from "react";
import { pets } from "../services/pets";
import { Link } from "react-router-dom";

export const Home = () => {
  const [myAnimals, setMyAnimals] = useState([]);
  const [selectedAnimalType, setSelectedAnimalType] = useState("");

  useEffect(() => {
    const fetchAnimals = async () => {
      try {
        const animals = await pets();
        setMyAnimals(animals);
      } catch (error) {
        console.log(error);
      }
    };
    fetchAnimals();
  }, []);

  const filteredAnimals = myAnimals
    .filter((animal) => animal.status) // aca para que entonces solo muestre animalitos disponibles para adopcion
    .filter((animal) => {
      if (!selectedAnimalType) {
        return true;
      }
      return animal.animal_type === selectedAnimalType;
    });

  return (
    <div className="container mt-5">
      {/* Hero Section */}
      <div className="row">
        <div className="mb-4 col-5 ">
          <img
            src="/graficoDeAnimalitos.png"
            className="img-fluid border rounded-4"
            width="600"
          />
        </div>
        <div className="mb-4 col-7 d-flex flex-column justify-content-center align-items-center">
          <h1 className="">Welcome to Petscue! 🐾</h1>
          <p className="">Find your new best friend today</p>
          <Link to="/inicio" className="btn-orange text-center">
            See more pets!
          </Link>
        </div>
      </div>
      {/* seccion de caracteristicas de Petscue*/}
      <div className="justify-content-center text-center mb-5">
        <div className="contenedor-de-la-pata">
          <h2 className="overlapping text-center justify-content-center">
            Adopt without complications, your new best friend is waiting for
            you.
          </h2>
          <img src="/pata.png" alt="petscue-logo" width="300" />
        </div>
        <div className="row justify-content-center text-center mb-5">
          <div className="col-lg-4 col-md-6 mb-4">
            <div className="card border-0 shadow h-100">
              <div className="card-body">
                <h5 className="card-title">Easy to use</h5>
                <p className="card-text">
                  Easily publish and find animals with our intuitive interface.
                </p>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-md-6 mb-4">
            <div className="card border-0 shadow h-100">
              <div className="card-body">
                <h5 className="card-title">Secure connection</h5>
                <p className="card-text">
                  We make sure that every connection between adopters and
                  animals is safe and reliable.
                </p>
              </div>
            </div>
          </div>

          <div className="col-lg-4 col-md-6 mb-4">
            <div className="card border-0 shadow h-100">
              <div className="card-body">
                <h5 className="card-title">Bird thought of you</h5>
                <p className="card-text">
                  Explore the animals available to take you home in a user
                  interface designed for your comfort to help you find your new
                  best friend.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* el paso a paso para poder adoptr */}

      <div className="row my-5 justify-content-center">
        <h2 className="text-center mb-4 fw-bold">How does Petscue work?</h2>
        <div className="col-md-3 mb-4 d-flex flex-column align-items-center">
          <div
            className="bg-primary rounded-circle d-flex align-items-center justify-content-center mb-3"
            style={{ width: "70px", height: "70px" }}
          >
            <span style={{ fontSize: "2.5rem" }}>🐾</span>
          </div>
          <h5 className="fw-semibold">1. Discover Pets</h5>
          <p className="text-center">
            Browse the platform and find animals posted by rescuers and
            responsible owners.
          </p>
        </div>
        <div className="col-md-3 mb-4 d-flex flex-column align-items-center">
          <div
            className="bg-primary rounded-circle d-flex align-items-center justify-content-center mb-3"
            style={{ width: "70px", height: "70px" }}
          >
            <span style={{ fontSize: "2.5rem" }}>💬</span>
          </div>
          <h5 className="fw-semibold">2. Connect</h5>
          <p className="text-center">
            Interested in a pet? Log in and contact the carer directly to start
            the adoption process.
          </p>
        </div>
<div className="col-md-3 mb-4 d-flex flex-column align-items-center">
  <div className="bg-primary rounded-circle d-flex align-items-center justify-content-center mb-3" style={{width: "70px", height: "70px", color: "#fff"}}>
    <span style={{fontSize: "2.5rem"}}>📧</span>
  </div>
  <h5 className="fw-semibold">3. Reach Out</h5>
  <p className="text-center">
    Fill in the contact form and your message will be sent directly to the carer’s email. Arrange the adoption together and welcome your new friend home!
  </p>
</div>
      </div>

      {/* Seccion de cartas de los animalitos*/}
      <div className=" d-flex justify-content-around">
        <h2 className="mb-4 text-center">Our Animals</h2>
        <AnimalFilters
          selectedAnimalType={selectedAnimalType}
          onSelectedAnimalType={setSelectedAnimalType}
        />
      </div>

      <div className=" row gap-3 d-flex justify-content-center overflow-hidden pb-5">
        <div className=" custom-scroll d-flex align-items-stretch gap-3 overflow-x-auto flex-nowrap ">
          {filteredAnimals.slice(0, 7).map((animal) => (
            <AnimalCard
              key={animal.id}
              age={animal.age}
              name={animal.name}
              photo={animal.photo}
              description={animal.description}
            />
          ))}
        </div>
        <Link to="/inicio" className="btn-lemon w-25 p-3 text-center">
          See more pets!
        </Link>
      </div>
    </div>
  );
};
