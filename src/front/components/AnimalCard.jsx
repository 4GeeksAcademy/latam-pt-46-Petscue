export const AnimalCard = ({ name, race, age, description, photo }) => {
  return (    
    <div className="card shadow-sm col-3 card  px-0 pt-0 pb-3 border rounded-5 ">
      <img
        src={photo}
        className=" border rounded-5 img-animal-card "
        alt="Animal"
      />
    
      <div className="card-body d-flex flex-column ">
        <h5 className="card-title d-flex justify-content-center fs-2">
          Name: {name}
        </h5>
        <p className="card-text d-flex justify-content-center fs-5">
          Breed: {race}
        </p>
        <p className="card-text d-flex justify-content-center fs-5">
          Age: {age}
        </p>
        <p className="description card-text  d-flex justify-content-center  fs-5 text-center">
          {description}
        </p>
      </div>
    </div>
  );
};
