export const AdoptionForm = ({ name }) => {
  return (
    <>
      <div
        className="modal fade"
        id="exampleModalToggle"
        aria-hidden="true"
        aria-labelledby="exampleModalToggleLabel"
        tabIndex="-1"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalToggleLabel">
                Fill the form to contact the carer of {name}
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>

            {/* modal body */}
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">
                    Message
                  </label>
                  <textarea
                    className="form-control"
                    id="description"
                    name="description"
                    placeholder={`Hey, I am interested in ${name}, and would like to know more and potentially meet`}
                    rows={3}
                  ></textarea>
                </div>
                {/* button */}
                <div className="modal-footer">
                  <button
                    className="btn btn-orange"
                    data-bs-target="#exampleModalToggle2"
                    data-bs-toggle="modal"
                  >
                    Send Message
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
