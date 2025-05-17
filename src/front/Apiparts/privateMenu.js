const API_URL = "https://silver-rotary-phone-x5p5pq7gxgjr3xx6-3001.app.github.dev/api";

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
    }catch(error){}
}