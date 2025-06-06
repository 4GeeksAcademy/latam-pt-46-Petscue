import { Button } from "react-bootstrap";

export const AnimalCard = ({
  id,
  name,
  race,
  age,
  description,
  photo,
  status,
  onEdit,
  handleDelete,
  onToggleStatus,
}) => {
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
        <p className="description card-text  d-flex justify-content-center fs-5 text-center overflow-hidden overflow-y-scroll custom-scroll-2">
          {description}
        </p>
        <div className="d-flex justify-content-center mb-2">
          
        </div>
        <div className="d-flex justify-content-center gap-4 flex-nowrap">
          {onToggleStatus && (
            <Button
              className="text-black"
              variant={status ? "outline-warning" : "outline-success"}
              onClick={() => onToggleStatus(id, !status)}
            >
              {status ? "Mark as Adopted" : "Mark as Available"}
            </Button>
          )}
          {onEdit && (
            <Button variant="outline-primary" onClick={() => onEdit(id)}>
              Edit
            </Button>
          )}
          {handleDelete && (
            <Button variant="outline-danger" onClick={() => handleDelete(id)}>
              Delete animal
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
