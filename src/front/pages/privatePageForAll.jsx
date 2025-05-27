import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { privateMenu } from "../services/privateMenu";

export const AllDashboard = () => {
    const [roleData, setRoleData] = useState(null);
    const navigate = useNavigate()

    const routePrivateForAll = async () => {
        try {
            const data = await privateMenu()

            if (data && data.user_data && data.user_data.role === `OWNER`) {
                setRoleData(data.user_data)
            }
            else if (data && data.user_data && data.user_data.role === `ADOPTER`) {
                setRoleData(data.user_data)
            }
            else if (data && data.user_data && data.user_data.role === `RESCUER`) {
                setRoleData(data.user_data)
            } else {
                console.warn(`User is not exist: `, data.user_data)
                navigate("/login")
            }
        } catch (error) {
            console.error("Ocurrio un error al acceder a la información, ", error)
        }

    }

    useEffect(() => {
        routePrivateForAll()
    }, [])

    return (
        <div>
            {roleData ? (
                <>
                    <div className="card">
                        <div className="card-body">
                            <h3 className="card-title">
                                Profile:
                            </h3>
                            <div className="card-text">
                                <strong>Name :</strong> {roleData.first_name} {roleData.last_name}
                            </div>
                            <div className="card-text">
                                <strong>Phonen :</strong> {roleData.phone}
                            </div>
                            <div className="card-text">
                                <strong>Email :</strong> {roleData.email}
                            </div>
                        </div>
                        <div className="card mt-3">
                            <h3 className="card-title">Story :</h3>
                            <p className="card-text">{roleData.story}</p>
                        </div>
                    </div>
                </>
            ) : (
                <p>Cargando información del propietario...</p>
            )}
        </div>
    )
}