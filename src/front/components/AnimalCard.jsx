import React from 'react'

export const AnimalCard = () => {
    return (
        <div className="card shadow-sm col-3 card p-0 border rounded-5">
            <img src="https://picsum.photos/id/237/200/200" className="card-img-top w-100 border rounded-5 -m" alt="Animal" />
            <div className="card-body">
                <h5 className="card-title">Nombre </h5>
                <p className="card-text">
                   Raza
                </p>
               
            </div>
        </div>
    )
}
