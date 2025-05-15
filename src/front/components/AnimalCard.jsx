import React from 'react'

export const AnimalCard = () => {
    return (
        <div className="card shadow-sm">
            <img src="{placeholderImage}" className="card-img-top" alt="Animal" />
            <div className="card-body">
                <h5 className="card-title">Nombre del Animalitoo </h5>
                <p className="card-text">
                    Descripcion del animalitooo
                </p>
                <a href="#" className="btn btn-primary">
                    Adoptar
                </a>
            </div>
        </div>
    )
}
