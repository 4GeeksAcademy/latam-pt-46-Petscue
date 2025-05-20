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
                'content-type': 'application/json'
            }
        })
        if ( !response.ok){
                throw new Error(`Error fetching data: ${response.status}`)
        } else{
            const data = await response.json();
            return data
        }


    }catch(error){
        console.error(`Error fetching private data: `, error)
        throw error
    }
}