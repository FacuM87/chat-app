import { useEffect, useState } from "react"
import toast from "react-hot-toast"

const useConversations = () => {
    const [conversations, setConversations] = useState([])

    useEffect(() => {
        const getConversations = async() =>{
            try {
                const response = await fetch(`${import.meta.env.VITE_USERS_URL}`,{
                    method: "GET",
                    credentials: "include"
                })
                const data = await response.json()
                console.log(data);
                
                setConversations(data.usersDTO)
                
            } catch (error) {
                toast.error(error.message)    
            }
        }

        getConversations()
    },[])
    return {conversations}
}

export default useConversations