import { Link } from "react-router-dom"

export const SideBar = () => {
    return (
        <div>
            <ul className="nav flex-column">
                <li className="nav-item">
                    <Link to="/profile">Profile</Link>
                </li>
                <li className="nav-item">
                    <Link to="/profile/newanimal">Add new animal</Link>
                </li>

            </ul>
        </div>
    )
}