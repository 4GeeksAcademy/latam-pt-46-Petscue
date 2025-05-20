import { useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const CloseSession = () => {
    const navigate = useNavigate();
    const { dispatch } = useGlobalReducer();

    const handleLogout = () => {
        localStorage.removeItem("token");

        dispatch({ type: "LOGOUT" });

        navigate("/login");
    };
    
    return (
        <>
            <button className="btn btn-danger" onClick={handleLogout}>Cerrar sesión</button>
        </>
    );
};