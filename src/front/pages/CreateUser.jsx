import { Link, useNavigate } from "react-router-dom";
import { newUser } from "../services/createUser";
import { useState } from "react";

export const CreateUser = () => {
    const navigate = useNavigate()
    const [message, setMessage] = useState("");
    const [useUser, setUser] = useState({
        first_name: "",
        last_name: "",
        email: "",
        phone: "",
        password: "",
        role: ""
    })

    const handleUser = async (e) => {
        e.preventDefault()
        try {
            await newUser(useUser)
            setMessage("Successful registration, please log in.");
            setTimeout(() => navigate("/"), 1500);
        } catch (error) {
            const errorMsg = error?.response?.data?.message || error.message || "Error desconocido";
            setMessage("Registration error: " + errorMsg);
        }
    }

    return (
        <div>
            <div className="d-flex justify-content-end m-5">
                <form className="" style={{ width: "100%", height: "100%" }} onSubmit={handleUser}>
                    <img className="ms-5" style={{ float: "left", width: "40%" }} src="/elgato.png" />
                    <div style={{ width: "30%", float: "right" }}>
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
                                type="email"
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
                                type="password"
                                className="form-control"
                                onChange={(e) => setUser({ ...useUser, password: e.target.value })}
                                value={useUser.password}
                            />
                        </div>
                        <div className="justify-content-end">
                            <label>Rol</label>
                            <select
                                className="form-select"
                                value={useUser.role || ""}
                                onChange={(e) => setUser({ ...useUser, role: e.target.value })}
                                required
                            >
                                <option value="">Select a role</option>
                                <option value="ADMIN">Administrator</option>
                                <option value="ADOPTER">Adoptant</option>
                                <option value="OWNER">Owner</option>
                                <option value="RESCUER">Rescuer</option>
                            </select>
                        </div>
                        <br />
                        <div className="d-flex justify-content-between">
                            <button type="submit" className="btn btn-warning">Save</button>
                            <Link to="/" style={{ color: "rgb(175,275,0)" }}>Back</Link>
                        </div>
                    </div>
                    {message && <div className="alert alert-info mt-3">{message}</div>}
                </form >
            </div>
        </div >
    )
}