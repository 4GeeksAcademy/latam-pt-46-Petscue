const API_URL = import.meta.env.VITE_BACKEND_URL;

export const getMyAnimals = async () =>{
    const token = localStorage.getItem("token")
    console.log("el tokeeen",token)
    try{
        const response = await fetch(`${API_URL}/api/animals/my-animals`, {
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      },
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || "Unknown error");
    return data.animals || [];

    } catch (error){
        console.log(error);
        return []
    }
}