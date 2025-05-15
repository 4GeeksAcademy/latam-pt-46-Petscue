export const Footer = () => (
	<footer className="footer mt-auto py-3 text-center">
		<div className="container">
			<div className="row">
				<div className="col-md-4 text-center text-md-left">
					<h5 className="mb-3">Petscue</h5>
					<p>Plataforma de adopción de animales</p>
				</div>
				<div className="col-md-4 my-3 my-md-0">
					<ul className="nav justify-content-center">

						<li className="nav-item">
							<Link to="/" className="nav-link text-white">
								Contacto
							</Link>
						</li>
						<li className="nav-item">
						<Link to="/" className="nav-link text-white">
								Terminos y condiciones
							</Link>
						</li>
					</ul>
				</div>
				<div className="col-md-4 text-center text-md-right">
					<p className="mb-0">
						© {new Date().getFullYear()} Petscue. Todos los derechos reservados.
					</p>
				</div>
			</div>
		</div>
	</footer>
);
