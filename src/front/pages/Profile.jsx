import { NewAnimalForm } from "./NewAnimalForm"
import { AnimalFilters } from "../components/AnimalFilters"
import { AnimalCard } from "../components/AnimalCard"

export const Profile = () => {
  return (
    <div className="">
      <ul className="nav nav-tabs" id="myTab" role="tablist">
        <li className="nav-item" role="presentation">
          <button className="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home-tab-pane" type="button" role="tab" aria-controls="home-tab-pane" aria-selected="true">Home</button>
        </li>
        <li className="nav-item" role="presentation">
          <button className="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile-tab-pane" type="button" role="tab" aria-controls="profile-tab-pane" aria-selected="false">Profile</button>
        </li>

      </ul>
      <div className="tab-content" id="myTabContent">
        <div className="tab-pane fade show active" id="home-tab-pane" role="tabpanel" aria-labelledby="home-tab" tabindex="0">
          <NewAnimalForm />
        </div>
        <div className="tab-pane fade" id="profile-tab-pane" role="tabpanel" aria-labelledby="profile-tab" tabindex="0">
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
      </div>

    </div>


  )
}
