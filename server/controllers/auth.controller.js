import User from "../db/models/user.model.js"
import UserDTO from "../dto/users.dto.js";
import { createHash, validatePassword } from "../utils/bcrypt.js";
import { generateToken } from "../utils/jwt.js";
import Mail from "../utils/nodemailer.js";

export const signupController = async (req, res) => {
    try {
        const {name, surname, nickname, gender, email, password} = req.body

        const user = await User.findOne({nickname})
        
        if(user) {
            return res.status(400).json({status: "fail", message: "User already exists"})
        }

        if(!name || !surname || !nickname || !gender || !email || !password) {
            return res.status(400).json({status: "fail", message: "All fields are required"})
        }

        const malePic = process.env.MALE_AVATAR_URL+`${nickname}`
        const femalePic = process.env.FEMALE_AVATAR_URL+`${nickname}`
        
        const newUser = new User({
            name,
            surname, 
            nickname, 
            gender,
            email, 
            password: createHash(password), 
            profilePic: gender === "male" ? malePic : femalePic}
        )
        
        const userDTO = new UserDTO(newUser)

        await newUser.save()
        
        const mailer = new Mail
        await mailer.sendRegisterConfirmationMail(name, nickname, email, password)

        const cookieOptions = {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 1000 * 60 * 60 * 24 * 7
        }

        res.cookie("jwtCookie", generateToken(userDTO), cookieOptions).status(201).json({status: "signup success", message: "User created"})

    } catch (error) {
        console.log("Error in signup controller: " + error);
        res.status(500).json({status: "signup failed", message: error.message})
    }

}


export const loginController = async(req, res) => { 
    try {
        const {nickname, password} = req.body

        if(!nickname || !password) {
            return res.status(400).json({status: "login fail", message: "All fields are required"})
        }

        const user = await User.findOne({nickname})

        if(!user || !validatePassword(password, user)) {
            return res.status(400).json({status: "login fail", message: "Invalid credentials"})
        }

        const cookieOptions = {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 1000 * 60 * 60 * 24 * 7
        }

        const userDTO = new UserDTO(user)
        
        return res.cookie("jwtCookie", generateToken(userDTO), cookieOptions).status(200).json({status: "login success", message: "User logged in", payload:{
            name: user.name,
            nickname: user.nickname,
            profilePic: user.profilePic 
        }})    
    } catch (error) {
        console.log("Error in login controller: " + error);
        res.status(500).json({status: "login failed", message: error.message})
    } 
    
}


export const logoutController = (req, res) => {

    res.clearCookie('jwtCookie', { 
        httpOnly: true, 
        secure: process.env.NODE_ENV === "production" 
    });
    
    return res.status(200).json({ message: 'Logout successful' });

}