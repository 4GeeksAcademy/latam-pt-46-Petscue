import React, { useEffect } from "react"
import rigoImageUrl from "../assets/img/rigo-baby.jpg";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { AnimalCard } from "../components/AnimalCard.jsx";

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
		<div className="text-center mt-5">
			<div className="row">
				<div className="mb-4 col-6">
					<img src="/perrito.png" className="img-fluid rounded shadow" />
				</div>
				<div className="mb-4 col-6">
				<h1 className="">Bienvenido a Petscue! 🐾</h1>
				<p className="">Encuentra a tu nuevo mejor amigo hoy</p>
				</div>
			</div>
			<div className="row ">

				<div className="col-3">
					<AnimalCard />
					<AnimalCard />
					<AnimalCard />


				</div>
			</div>

		</div>
	);
}; 