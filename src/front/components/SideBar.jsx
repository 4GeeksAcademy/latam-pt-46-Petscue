import { Link } from "react-router-dom";
import { FaPaw, FaUserAlt } from "react-icons/fa";

export const SideBar = () => {
    return (
        <div className="  d-flex flex-column py-4 px-3 min-vh-100 blue text-white">
            <div className="mb-4 text-center">
                <h4 className="fw-bold mb-0">
                    Petscue
                </h4>
                <p className="mt-1">Your Panel</p>
            </div>
            <ul className="nav nav-pills flex-column gap-2">
                <li className="nav-item">
                    <Link to="/profile" className="nav-link d-flex align-items-center  text-white">
                        <span className="me-2"><FaPaw /></span>
                        Perfil
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to="profileanimal" className="nav-link d-flex align-items-center  text-white">
                        <span className="me-2"><FaPaw /></span>
                        Perfil del animal
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to="newanimal" className="nav-link d-flex align-items-center text-white">
                        <span className="me-2"><FaUserAlt /></span>
                        Add New Animal
                    </Link>
                </li>
            </ul>
        </div>
    )
}