import React, { useEffect } from "react"
import rigoImageUrl from "../assets/img/rigo-baby.jpg";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { AnimalCard } from "../components/AnimalCard.jsx";
import { HomepageAnimalFilters } from "../components/HomepageAnimalFilters.jsx";

export const Home = () => {

	const { store, dispatch } = useGlobalReducer()

	const loadMessage = async () => {
		try {
			const backendUrl = import.meta.env.VITE_BACKEND_URL

			if (!backendUrl) throw new Error("VITE_BACKEND_URL is not defined in .env file")

			const response = await fetch(backendUrl + "/api/hello")
			const data = await response.json()

			if (response.ok) dispatch({ type: "set_hello", payload: data.message })

			return data

		} catch (error) {
			if (error.message) throw new Error(
				`Could not fetch the message from the backend.
				Please check if the backend is running and the backend port is public.`
			);
		}

	}

	useEffect(() => {
		loadMessage()
	}, [])

	return (
		<div className="container mt-5">
			{/* Hero Section */}
			<div className="row">
				<div className="mb-4 col-5 ">
					<img src="/graficoDeAnimalitos.png" className="img-fluid border rounded-4" width="600" />
				</div>
				<div className="mb-4 col-7 d-flex flex-column justify-content-center align-items-center">
					<h1 className="">Bienvenido a Petscue! 🐾</h1>
					<p className="">Encuentra a tu nuevo mejor amigo hoy</p>
					<button className="btn btn-limon">Registrate</button>
				</div>
			</div>
			{/* seccion de caracteristicas de Petscue*/}
			<div className="justify-content-center text-center mb-5">
			<div className="contenedor-de-la-pata">
				<h2 className="overlapping text-center justify-content-center">Adopta sin complicaciones, tu nuevo mejor amigo te espera.</h2>
				<img src="/pata.png" alt="petscue-logo" width="300" />
			</div>
			<div className="row justify-content-center text-center mb-5">

				<div className="col-lg-4 col-md-6 mb-4">
					<div className="card border-0 shadow h-100">
						<div className="card-body">
							<h5 className="card-title">Fácil de Usar</h5>
							<p className="card-text">Publica y encuentra animales fácilmente con nuestra intuitiva interfaz.</p>

						</div>
					</div>
				</div>
				<div className="col-lg-4 col-md-6 mb-4">
					<div className="card border-0 shadow h-100">
						<div className="card-body">
							<h5 className="card-title">Conexión Segura</h5>
							<p className="card-text">Nos aseguramos de que cada conexión entre adoptantes y animales sea segura y confiable.</p>
						</div>
					</div>
				</div>
				<div className="col-lg-4 col-md-6 mb-4">
					<div className="card border-0 shadow h-100">
						<div className="card-body">
							<h5 className="card-title">Navegacion Pensada en ti</h5>
							<p className="card-text">Explora los animales disponibles para llevarte a casa en una interfaz de usuario pensada para tu comodidad que te ayudara ea encontrar a tu nuevo mejor amigo.</p>
						</div>
					</div>
				</div>
			</div>
</ div>


			{/* Seccion de cartas de los animalitos*/}
			<div className=" d-flex justify-content-around">
				<h2 className="mb-4 text-center">Nuestros Animales</h2>
				<HomepageAnimalFilters />
			</div>

			<div className="row gap-3 d-flex justify-content-center pb-5">
				<AnimalCard />
				<AnimalCard />
				<AnimalCard />
			</div>
		</div>
	);
}; 