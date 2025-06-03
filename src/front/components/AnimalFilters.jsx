import { light } from "@cloudinary/url-gen/qualifiers/fontWeight"
import React from "react"

export const AnimalFilters = ({selectedAnimalType, onSelectedAnimalType}) => {
  return (
    <div className="d-flex justify-content-center align-items-center mb-4 gap-2">
    
    <button 
      className={`btn btn-light border rounded-pill px-3 py-2 d-flex align-items-center gap-2 ${selectedAnimalType === "" ? "btn-primary text-black" : "btn-light"}`} 
      type="button"
      onClick={() => onSelectedAnimalType("")}
    >
      All
    </button>
    <button 
      className={`btn btn-light border rounded-pill px-3 py-2 d-flex align-items-center gap-2 ${selectedAnimalType === "cat" ? "btn-primary text-white" : "btn-light"}`} 
      type="button"
      onClick={() => onSelectedAnimalType("cat")}
    >
      <span>🐱</span> Cats
    </button>
    <button
      className={`btn btn-light border rounded-pill px-3 py-2 d-flex align-items-center gap-2 ${selectedAnimalType === "dog" ? "btn-primary text-white" : "btn-light"}`} 
      type="button"
      onClick={() => onSelectedAnimalType("dog")}
    >
      <span >🐶</span> Dogs
    </button>
    <button
      className={`btn btn-light border rounded-pill px-3 py-2 d-flex align-items-center gap-2 ${selectedAnimalType === "rabbit" ? "btn-primary text-white" : "btn-light"}`} 
      type="button"
      onClick={() => onSelectedAnimalType("rabbit")}
    >      <span >🐰</span> Rabbits
    </button>
  </div>
  )
}
