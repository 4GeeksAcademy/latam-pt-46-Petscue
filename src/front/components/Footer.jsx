import { Link } from "react-router-dom";

export const Footer = () => (
	<footer className="footer mt-auto mb-0 py-5 text-center footer text-white">
		<div className="container">
			<div className="row align-items-center">
				<div className="col-md-6 text-center text-md-left">
					<Link to="/">
						<img src="/petscue.png" alt="petscue-logo" width="350" />
					</Link>
					<p>Plataforma de adopción de animales</p>
				</div>

				<div className="col-md-6 text-md-left d-flex flex-column">
					<Link to="/login" className="text-decoration-none text-white" >
						Accede a tu Cuenta
					</Link>
					<Link to="/register" className="text-decoration-none text-white">
						Registrate
					</Link>
					<Link to="/terms-and-conditions" className="text-decoration-none text-white">
						Terminos y condiciones
					</Link>
				</div>
			</div>


			<div className=" text-center text-md-right">
				<p className="mb-0">
					© {new Date().getFullYear()} Petscue. Todos los derechos reservados.
				</p>
			</div>
		</div>
	</footer>
);
