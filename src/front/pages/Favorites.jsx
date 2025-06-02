import { Container, Row, Spinner } from "react-bootstrap";
import { PetCardFav } from "../components/PetCardFav";
import { pets } from "../services/pets";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { Link } from "react-router-dom";
import { getFavorites, toggleFavoriteAPI } from "../services/addFavorites";
import { useEffect, useState } from "react";

export const Favorites = () => {
  const { store, dispatch } = useGlobalReducer();
  const { favorites, token } = store;
  const [allPets, setAllPets] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const petData = await pets();
        setAllPets(petData);

        if (token) {
          const favoriteIds = await getFavorites();
          dispatch({ type: "SET_FAVORITES", payload: favoriteIds });
        } else {
          dispatch({ type: "SET_FAVORITES", payload: [] });
        }
      } catch (error) {
        console.error("Error loading data:", error);
        setError("Your favorites could not be loaded. Try later.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [token, dispatch]);

  const favoritePets = allPets.filter((pet) => favorites.includes(pet.id));

  const toggleFavorite = async (id) => {
    try {
      await toggleFavoriteAPI(id);
      dispatch({ type: "TOGGLE_FAVORITE", payload: id });
    } catch (error) {
      console.error("Favorite update error:", error);
    }
  };

  return (
    <Container className="py-4">
      <h2 className="title mb-4 text-center" style={{ color: "black" }}>
        Your favorites
      </h2>

      {loading ? (
        <div className="text-center">
          <Spinner animation="border" variant="warning" />
          <p className="mt-2">Loading favorites ...</p>
        </div>
      ) : error ? (
        <p className="text-danger text-center">{error}</p>
      ) : favoritePets.length > 0 ? (
        <Row className="g-4">
          {favoritePets.map((pet) => (
            <PetCardFav
              key={pet.id}
              id={pet.id}
              photo={pet.photo}
              name={pet.name}
              race={pet.race}
              age={pet.age}
              description={pet.description}
              toggleFavorite={toggleFavorite}
              isFavorite={true}
            />
          ))}
        </Row>
      ) : (
        <p className="text-center">You haven't added pets to favorites yet.</p>
      )}
    </Container>
  );
};
