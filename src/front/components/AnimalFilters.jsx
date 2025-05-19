export const AnimalFilters = () => {
  return (
    <div className="d-flex justify-content-center align-items-center mb-4 gap-2">
    
    <button className="btn btn-light border rounded-pill px-3 py-2 d-flex align-items-center gap-2 " type="button">
      <span>🐱</span> Cats
    </button>
    <button className="btn btn-light border rounded-pill px-3 py-2 d-flex align-items-center gap-2 " type="button">
      <span >🐶</span> Dogs
    </button>
    <button className="btn btn-light border rounded-pill px-3 py-2 d-flex align-items-center gap-2 " type="button">
      <span >🐰</span> Rabits
    </button>
  </div>
  )
}
