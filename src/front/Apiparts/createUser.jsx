const API_URL = "https://probable-zebra-x5pwq9j9v4gx3x9x-3001.app.github.dev/"

export const newUser = async(data) =>{
    try{
        const response = await fetch(API_URL/newUser,{
            method:"POST",
            body: JSON.stringify({
                "first_name": data.first_name,
                "last_name": data.last_name,
                "email": data.email,
                "phone": data.phone,
                "password": data.password
            }),
            headers:{
                "content-type": "application/json"
            }
        })
        if (response.status === 201){
            const responseData = await response.json()
            return responseData
        } else {
            consol.log("Error creating")
            throw new Error(`Error en la petición ${response.status}`);
            
        }
    }catch(error){
        console.log("Error creating: ", error)
    }
}
