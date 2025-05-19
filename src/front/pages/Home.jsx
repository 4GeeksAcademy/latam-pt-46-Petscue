import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { AnimalCard } from "../components/AnimalCard.jsx";
import { AnimalFilters } from "../components/AnimalFilters.jsx";

export const Home = () => {

	const { store, dispatch } = useGlobalReducer()

	return (
		<div className="container mt-5">
			{/* Hero Section */}
			<div className="row">
				<div className="mb-4 col-5 ">
					<img src="/graficoDeAnimalitos.png" className="img-fluid border rounded-4" width="600" />
				</div>
				<div className="mb-4 col-7 d-flex flex-column justify-content-center align-items-center">
					<h1 className="">Welcome to Petscue! 🐾</h1>
					<p className="">Find your new best friend today</p>
					<button className="btn btn-lemon">Register</button>
				</div>
			</div>
			{/* seccion de caracteristicas de Petscue*/}
			<div className="justify-content-center text-center mb-5">
				<div className="contenedor-de-la-pata">
					<h2 className="overlapping text-center justify-content-center">Adopt without complications, your new best friend is waiting for you.</h2>
					<img src="/pata.png" alt="petscue-logo" width="300" />
				</div>
				<div className="row justify-content-center text-center mb-5">

					<div className="col-lg-4 col-md-6 mb-4">
						<div className="card border-0 shadow h-100">
							<div className="card-body">
								<h5 className="card-title">Easy to use</h5>
								<p className="card-text">Easily publish and find animals with our intuitive interface.</p>

							</div>
						</div>
					</div>
					<div className="col-lg-4 col-md-6 mb-4">
						<div className="card border-0 shadow h-100">
							<div className="card-body">
								<h5 className="card-title">Secure connection</h5>
								<p className="card-text">We make sure that every connection between adopters and animals is safe and reliable.</p>
							</div>
						</div>
					</div>
					<div className="col-lg-4 col-md-6 mb-4">
						<div className="card border-0 shadow h-100">
							<div className="card-body">
								<h5 className="card-title">Bird thought of you</h5>
								<p className="card-text">Explore the animals available to take you home in a user interface designed for your comfort to help you find your new best friend.</p>
							</div>
						</div>
					</div>
				</div>
			</ div>


			{/* Seccion de cartas de los animalitos*/}
			<div className=" d-flex justify-content-around">
				<h2 className="mb-4 text-center">Our Animals</h2>
				<AnimalFilters />
			</div>

			<div className="row gap-3 d-flex justify-content-center pb-5">
				<AnimalCard />
				<AnimalCard />
				<AnimalCard />
			</div>
		</div>
	);
}; 