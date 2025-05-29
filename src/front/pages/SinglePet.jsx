import { Card, Button} from "react-bootstrap";

export const PetProfile = () => {
  return (
    <Card className="p-4 shadow-lg mx-auto mt-5" style={{ maxWidth: "1000px", height: "450px", marginBottom: "85px" }}>
      <div className="d-flex flex-row">
        {/* Imagen o avatar del animal */}
        <div className="me-4">
          <div
            style={{
              width: "200px",
              height: "200px",
              background: "#f2f2ff",
              borderRadius: "20px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {/* Imagen como placeholder */}
            <img
              src= "/perrito.png"
              alt="Pet"
              style={{ width: "150px", height: "190px", objectFit: "cover" }}
            />
          </div>
        </div>

        {/* Información principal */}
        <div className="flex-grow-1">
          <div className="d-flex justify-content-between align-items-start">
            <div>
              <h3 className="fw-bold mb-1">Max</h3>
            </div>
          </div>

          <div className="d-flex justify-content-between bg-light rounded p-3 my-3">
            <div>
              <small className="text-muted fs-5">Age</small>
              <div className="fw-semibold fs-5">1 Year 5 Months</div>
            </div>
            <div>
              <small className="text-muted ">Color</small>
              <div className="fw-semibold fs-5">naranja</div>
            </div>
          </div>

          <p className="text-muted fs-5" style={{ lineHeight: "1.6" }}>
            Max is a friendly and lovable Golden Retriever with a heart as golden as his coat.
            Born on a sunny spring day, Max quickly became everyone's favorite. He loves
            playing with yarn, making new friends, and going on adventures. 🐾
          </p>

          <hr />

          <div className="d-flex justify-content-between align-items-center mt-3">
            <div className="d-flex align-items-center">
              <img
                src="https://img.icons8.com/emoji/48/person.png"
                alt="Owner"
                className="me-2"
                style={{ width: "40px", height: "40px" }}
              />
              <div>
                <strong className="fs-5">David Pash</strong>
                <div className="text-muted fs-5" style={{ fontSize: "0.9rem" }}>
                  Joined in 2024
                </div>
              </div>
            </div>
            <div>
              <Button variant="outline-warning" className="me-2">
                📞
              </Button>
              <Button variant="outline-primary">💬</Button>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};
