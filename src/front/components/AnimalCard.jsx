export const AnimalCard = ({ name, race, age, description }) => {
  return (
    <div className="card shadow-sm col-3 card p-0 border rounded-5">
      <img
        src="https://picsum.photos/id/237/200/200"
        className="card-img-top w-100 border rounded-5 -m object-fit-cover"
        s
        alt="Animal"
      />
      <div className="card-body d-flex flex-column">
        <h5 className="card-title d-flex justify-content-center fs-2">
          Name: {name}
        </h5>
        <p className="card-text d-flex justify-content-center fs-5">
          Breed: {race}
        </p>
        <p className="card-text d-flex justify-content-center fs-5">
          Age: {age}
        </p>
        <p className="card-text d-flex justify-content-center fs-5 text-center">
          {description}
        </p>
      </div>
    </div>
  );
};
