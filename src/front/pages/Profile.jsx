
import { AnimalFilters } from "../components/AnimalFilters"
import { AnimalCard } from "../components/AnimalCard"

export const Profile = () => {
  return (
    <div className="">

          <div className=" d-flex justify-content-around my-5">
            <h2 className="mb-4 text-center">Your Rescued Bros</h2>
            <AnimalFilters />
          </div>

          <div className="row gap-3 d-flex justify-content-center pb-5">
            <AnimalCard />
            <AnimalCard />
            <AnimalCard />
          </div>
        </div>
     


    


  )
}
