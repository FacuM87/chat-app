import User from "../db/models/user.model.js"
import UserDTO from "../dto/users.dto.js";
import { createHash, validatePassword } from "../utils/bcrypt.js";
import { generateToken, verifyToken } from "../utils/jwt.js";
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
            gender: gender.toLowerCase(),
            email, 
            password: createHash(password), 
            profilePic: gender.toLowerCase() === "male" ? malePic : femalePic}
        )
          
        await newUser.save()
        
        const mailer = new Mail
        await mailer.sendRegisterConfirmationMail(name, nickname, email, password)
        
        const cookieOptions = {
            httpOnly: true,
            secure: false,//process.env.NODE_ENV === "production",
            maxAge: 1000 * 60 * 60 * 24 * 7
        }
        
        const userDTO = new UserDTO(newUser)

        const token = generateToken(userDTO)
        
        res.cookie("jwtCookie", token, cookieOptions).status(201).json({status: "signup success", message: "User created"})

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
        
        return res.cookie("jwtCookie", generateToken(userDTO), cookieOptions).status(200).json({status: "success", message: "User logged in", payload:{
            name: user.name,
            surname: user.surname,
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

export const getUserFromToken = async (req, res) => {
    try {
       const jwtCookie = req.cookies.jwtCookie
       if(!jwtCookie) {
           console.log("No token");
           return res.status(401).json({status: "fail", message: "Unauthorized"})
       }else {
           const decodedToken = verifyToken(jwtCookie)

           if(!decodedToken) {
               return res.status(401).json({status: "fail", message: "Unauthorized"})
           }
           
           const user = await User.findOne({email: decodedToken.user.email})
           
           if(!user) {
               return res.status(401).json({status: "fail", message: "Unauthorized"})
           }

           const userDTO = new UserDTO(user)
           res.status(200).json({status: "get user success", userDTO})
       }
    } catch (error) {
        console.log("Error at getUserFromToken controller: ", error)
        res.status(500).json({status: "get user fail", message: "Internal server error while getting user: "+error.message})
    }
}