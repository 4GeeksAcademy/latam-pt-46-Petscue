import { Link, useNavigate } from "react-router-dom";
import { newUser } from "../Apiparts/createUser";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { useState } from "react";

export const CreateUser = () =>{
    const {dispatch} = useGlobalReducer
    const {navigate} = useNavigate
    const [useUser, setUser] = useState({
        first_name: "",
        last_name: "",
        email: "",
        phone: "",
        password: ""
    })

    const handleUser = async(e) =>{
        e.preventDefault()
        try{
            const userResponse = await newUser(useUser)
            dispatch({type:"LOGUP", payload: userResponse})
            navigate("/")
        }catch(error){
            console.log("Error to create", error)
        }
    }

    return(
        <div>
            <form onSubmit={handleUser}>
                <label></label>
                <input 
                    type="text"
                    className="form-control"
                    onChange={(e)=> setUser({...useUser, first_name:e.target.value})}
                    value={useUser.first_name}
                />

                <label></label>
                <input
                    type="text"
                    className="form-control"
                    onChange={(e)=> setUser({...useUser, last_name:e.target.value})}
                    value={useUser.last_name} 
                />

                <label></label>
                <input
                    type="text"
                    className="form-control"
                    onChange={(e)=> setUser({...useUser, email:e.target.value})}
                    value={useUser.email} 
                />

                <label></label>
                <input
                    type="text"
                    className="form-control"
                    onChange={(e)=> setUser({...useUser, phone:e.target.value})}
                    value={useUser.phone} 
                />

                <label></label>
                <input
                    type="text"
                    className="form-control"
                    onChange={(e)=> setUser({...useUser, password:e.target.value})}
                    value={useUser.password} 
                />
            </form>
            <Link to="/">Volver</Link>
        </div>
    )
}