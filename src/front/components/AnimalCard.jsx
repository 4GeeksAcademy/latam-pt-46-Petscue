export const AnimalCard = ({name, race, age}) => {
    return (
        <div className="card shadow-sm col-3 card p-0 border rounded-5">
            <img src="https://picsum.photos/id/237/200/200" className="card-img-top w-100 border rounded-5 -m" alt="Animal" />
            <div className="card-body">
                <h5 className="card-title">{name}</h5>
                <p className="card-text">
                   {race}
                </p>
                <p className="card-text">
                   {age}
                </p>
               
            </div>
        </div>
    )
}
