import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const Navbar = () => {
  const { store } = useGlobalReducer()
	console.log("este es el token: ", store.token)

	return (
		<nav className="navbar ">
			<div className="container">
				<Link to="/">
					<img src="/petscue.png" alt="petscue-logo" width="200" />
				</Link>
				<div className="ml-auto gap-3 d-flex align-items-center">
					{store.token ?
						<>
						<Link to="/profile" className="nav-bar-link m-auto" >
						<button className="btn btn-warning">Profile</button>
					</Link>
						</> :
						
						<>	<Link to="/login" className="nav-bar-link m-auto" >
						<button className="btn btn-lemon">Access your Account</button>
					</Link>
					<Link to="/register" className="">
						<button className="btn btn-orange">Register</button>
					</Link>
					</>}

				</div>
			</div>
		</nav>
	);
};