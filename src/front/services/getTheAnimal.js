const API_URL = import.meta.env.VITE_BACKEND_URL;

export const getTheAnimal = async() =>{
    try{
        const response = await fetch(`${API_URL}/api/animals`,{
            headers:{
                "content-type":"application/json"
            }
        })
        const data = await response.json()
        if (!response.ok) throw new Error("message: error")
        return data
        
    }catch(error){
        throw new Error("failure in response")
    }
}