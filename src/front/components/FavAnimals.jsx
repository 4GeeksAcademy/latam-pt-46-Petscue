import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";


const initialPets = [
  { id: 1, name: 'Gary', breed: 'Yorkshire Terrier', age: '3 years', type: 'dog', img: 'https://i.imgur.com/cfoiFb7.jpeg' },
  { id: 2, name: 'Peach', breed: 'Half-breed', type: 'cat', img: 'https://i.imgur.com/cfoiFb7.jpeg' },
  { id: 3, name: 'Moon', breed: 'Siberian cat', type: 'cat', img: 'https://i.imgur.com/cfoiFb7.jpeg' },
  { id: 4, name: 'Whitney', breed: 'British Longhair', age: '2 months', type: 'cat', img: 'https://i.imgur.com/cfoiFb7.jpeg' },
  { id: 5, name: 'Buggy', breed: 'Jack Russell Terrier', type: 'dog', img: 'https://i.imgur.com/cfoiFb7.jpeg' },
  { id: 6, name: 'Spike', breed: 'Maine Coon', type: 'cat', img: 'https://i.imgur.com/cfoiFb7.jpeg' },
  { id: 7, name: 'Cake', breed: 'Welsh Corgi', type: 'dog', img: 'https://i.imgur.com/cfoiFb7.jpeg' },
  { id: 8, name: 'Kiwi', breed: 'Yorkshire Terrier', type: 'dog', img: 'https://i.imgur.com/cfoiFb7.jpeg' },
  { id: 9, name: 'Cookie', breed: 'Samoyed', type: 'dog', img: 'https://i.imgur.com/cfoiFb7.jpeg' },
  { id: 10, name: 'Stitch', breed: 'European cat', type: 'cat', img: 'https://i.imgur.com/cfoiFb7.jpeg' },
];

export const FavAnimals = () => {
    const [filter, setFilter] = useState("all");
    const [favorites, setFavorites] = useState([]);
    const [selectedPet, setSelectedPet] = useState(null);

    const handleFavorite = (id) => {
        setFavorites((prev) =>
            prev.includes(id) ? prev.filter((fid) => fid !== id) : [...prev, id]
        );
    };

    const filteredPets = initialPets.filter(
        (pet) => filter === "all" || pet.type === filter
    );

    return (
        <div className="container py-4">
            <h2 className="mb-4">Your Matches</h2>

            <div className="btn-group mb-4">
                <button onClick={() => setFilter("all")} className={`btn btn-outline-primary ${filter === "all" && "active"}`}>
                    All
                </button>
                <button onClick={() => setFilter("cat")} className={`btn btn-outline-primary ${filter === "cat" && "active"}`}>
                    Cats
                </button>
                <button onClick={() => setFilter("dog")} className={`btn btn-outline-primary ${filter === "dog" && "active"}`}>
                    Dogs
                </button>
            </div>

            <div className="row">
                {filteredPets.map((pet) => (
                    <div className="col-md-4 mb-4" key={pet.id}>
                        <div className="card h-100">
                            <img src={pet.img} className="card-img-top" alt={pet.name} style={{ height: '250px', objectFit: 'cover' }} />
                            <div className="card-body d-flex flex-column">
                                <h5 className="card-title">{pet.name} {pet.age && <small className="text-muted">({pet.age})</small>}</h5>
                                <p className="card-text">{pet.breed}</p>
                                <div className="mt-auto d-flex justify-content-between">
                                    <button
                                        className="btn btn-outline-danger"
                                        onClick={() => handleFavorite(pet.id)}
                                    >
                                        {favorites.includes(pet.id) ? "💖" : "🤍"}
                                    </button>
                                    <button
                                        className="btn btn-primary"
                                        data-bs-toggle="modal"
                                        data-bs-target="#petModal"
                                        onClick={() => setSelectedPet(pet)}
                                    >
                                        Learn More
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Modal */}
            {selectedPet && (
                <div
                    className="modal fade"
                    id="petModal"
                    tabIndex="-1"
                    aria-labelledby="petModalLabel"
                    aria-hidden="true"
                >
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="petModalLabel">{selectedPet.name}</h5>
                                <button
                                    type="button"
                                    className="btn-close"
                                    data-bs-dismiss="modal"
                                    aria-label="Close"
                                ></button>
                            </div>
                            <div className="modal-body text-center">
                                <img src={selectedPet.img} alt={selectedPet.name} className="img-fluid mb-3" />
                                <p><strong>Breed:</strong> {selectedPet.breed}</p>
                                {selectedPet.age && <p><strong>Age:</strong> {selectedPet.age}</p>}
                                <p><strong>Type:</strong> {selectedPet.type}</p>
                            </div>
                            <div className="modal-footer">
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    data-bs-dismiss="modal"
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
