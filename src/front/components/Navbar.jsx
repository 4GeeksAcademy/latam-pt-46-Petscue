import { Link } from "react-router-dom";

export const Navbar = () => {

	return (
		<nav className="navbar ">
			<div className="container">
				<Link to="/">
					<img src="/petscue.png" alt="petscue-logo" width="200" />
				</Link>
				<div className="ml-auto gap-3 d-flex align-items-center">
					<Link to="/login" className="nav-bar-link m-auto" >
						<button className="btn btn-warning" >Access your Account</button>
					</Link>
					<Link to="/register" className="">
						<button className="btn btn-warning" >Register</button>
					</Link>
				</div>
			</div>
		</nav>
	);
};