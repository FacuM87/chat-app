import User from "../db/models/user.model.js"
import UserDTO from "../dto/users.dto.js"

export const getUsers = async (req, res) => {
    try {
        const users = await User.find({})
        const usersDTO = users.map(user => new UserDTO(user))

        res.status(200).json({status: "get users success", usersDTO})
    } catch (error) {
        console.log("Error at getUsers controller: ", error)
        res.status(500).json({status: "get users fail", message: "Internal server error while getting users: "+error.message})
    }
}