import { Link, useNavigate } from "react-router-dom";
import { newUser } from "../Apiparts/createUser";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { useState } from "react";

export const CreateUser = () => {
    const { dispatch } = useGlobalReducer
    const { navigate } = useNavigate
    const [useUser, setUser] = useState({
        first_name: "",
        last_name: "",
        email: "",
        phone: "",
        password: ""
    })

    const handleUser = async (e) => {
        e.preventDefault()
        try {
            const userResponse = await newUser(useUser)
            dispatch({ type: "LOGUP", payload: userResponse })
            navigate("/")
        } catch (error) {
            console.log("Error to create", error)
        }
    }

    return (
        <div>
            <div className="d-flex justify-content-end m-5">
                <form className="" style={{ width: "100%", height: "100%" }} onSubmit={handleUser}>
                    <img className="ms-5" style={{float:"left", width:"40%"}} src="/elgato.png"/>
                    <div style={{width: "30%",float: "right"}}>
                        <div className="justify-content-end">
                            <label>First Name</label>
                            <input
                                type="text"
                                className="form-control"
                                onChange={(e) => setUser({ ...useUser, first_name: e.target.value })}
                                value={useUser.first_name}
                            />
                        </div>
                        <div className="justify-content-end">
                            <label>Last Name</label>
                            <input
                                type="text"
                                className="form-control"
                                onChange={(e) => setUser({ ...useUser, last_name: e.target.value })}
                                value={useUser.last_name}
                            />
                        </div>
                        <div className="justify-content-end">
                            <label>Email</label>
                            <input
                                type="text"
                                className="form-control"
                                onChange={(e) => setUser({ ...useUser, email: e.target.value })}
                                value={useUser.email}
                            />
                        </div>
                        <div className="justify-content-end">
                            <label>Phone</label>
                            <input
                                type="text"
                                className="form-control"
                                onChange={(e) => setUser({ ...useUser, phone: e.target.value })}
                                value={useUser.phone}
                            />
                        </div>
                        <div className="justify-content-end">
                            <label>Password</label>
                            <input
                                type="text"
                                className="form-control"
                                onChange={(e) => setUser({ ...useUser, password: e.target.value })}
                                value={useUser.password}
                            />
                        </div>
                        <div className="justify-content-end">
                            <label>Rol</label>
                            <select className="form-select" defaultValue={"Selecciona un rol"}>
                                <option>Selecciona un rol</option>
                                <option value="admin">Administrador</option>
                                <option value="adopter">Adoptante</option>
                                <option value="rescue">Rescatista</option>
                            </select>
                        </div>
                        <br/>
                        <div className="d-flex justify-content-between">
                            <button type="submit" className="btn btn-warning">Guardar</button>
                            <Link to="/" style={{color: "rgb(175,275,0)"}}>Volver</Link>
                        </div>
                    </div>
                </form >
            </div>
        </div >
    )
}