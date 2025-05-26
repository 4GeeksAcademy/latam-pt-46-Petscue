import { Link } from "react-router-dom";
import { FaPaw, FaUserAlt } from "react-icons/fa";
import { privateMenu } from "../services/privateMenu";
import { useEffect, useState } from "react";

export const SideBar = () => {
    const[roleData, setRoleData] = useState(null);
    const data = async () => {
        try {
            const role = await privateMenu()
            if(role && role.user_data && role.user_data.role === `OWNER`){
                setRoleData(role.user_data)
            }
            else if(role && role.user_data && role.user_data.role === `RESCUER`){
                setRoleData(role.user_data)
            }
            else if(role && role.user_data && role.user_data.role === `ADOPTER`){
                setRoleData(role.user_data)
            } else {
                console.warn(`User is not exist: `, role.user_data)
            }
        } catch (error) { 
            console.error("fallo el sidebar",error)
        }
    }
    useEffect(()=>{
        data()
    },[])
    return (
        <div>
            {roleData && (roleData.role === "OWNER" || roleData.role === "RESCUER") ?
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
                : roleData && (roleData.role === "ADOPTER") ?
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
                    </ul>
                </div>
                :null
            }
        </div>
    )
}