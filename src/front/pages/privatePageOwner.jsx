import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { privateMenu } from "../services/privateMenu";

 export const OwnerDashboard = () =>{
    const[ownerData, setOwnerData] = useState();
    const{navigate} = useNavigate

    const routePrivateOwner = async() => {
        try{
            const data = await privateMenu()

            if(data && data.user_data && data.user_data.role === `OWNER`){
                setOwnerData(data.user_data)
            } else {
                console.warn(`User is not OWNER: `, data.user_data)
                navigate("/login")
            }
        }catch(error){
            console.error("Ocurrio un error al acceder a la información, ", error)
        }
        
    }

    useEffect(() => { 
        routePrivateOwner()
    },[])

    return(
        <div>
            <div className="card">
                <div className="card-body">
                    <div className="card-text"><strong>Name :</strong> {ownerData.first_name} {ownerData.last_name}</div>
                    <div className="card-text"><strong>Phonen :</strong> {ownerData.phone}</div>
                    <div className="card-text"><strong>Email :</strong> {ownerData.email}</div>
                </div>
            </div>

            <Link to="">Publica a tu Mascota</Link>

            <div></div>

        </div>
    )
}