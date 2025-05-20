export const PetModal = ({ pet, onClose }) => {
    if (!pet) return null;

    return (
        <div className="modal fade show d-block" id="petModal" tabIndex="-1" aria-modal="true" role="dialog">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">{pet.name}</h5>
                        <button type="button" className="btn-close" onClick={onClose}></button>
                    </div>
                    <div className="modal-body text-center">
                        <img src={pet.img} alt={pet.name} className="img-fluid mb-3" />
                        <p><strong>Breed:</strong> {pet.breed}</p>
                        {pet.age && <p><strong>Age:</strong> {pet.age}</p>}
                        <p><strong>Type:</strong> {pet.type}</p>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={onClose}>Close</button>
                    </div>
                </div>
            </div>
        </div>
    );
};
