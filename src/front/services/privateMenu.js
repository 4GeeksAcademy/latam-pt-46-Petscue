const API_URL = import.meta.env.VITE_BACKEND_URL;

export const privateMenu = async() =>{
    const token = localStorage.getItem("token")
    if (!token){
        throw new Error("token invalido")
    }
    try{
        const response = await fetch(`${API_URL}/private`,{
            method: "GET",
            headers:{
                'authorization': `Bearer ${token}`,
                'content-type': 'aplication/json'
            }
        })
        if (responseData){
                await response.json()
        }

    }catch(error){}
}