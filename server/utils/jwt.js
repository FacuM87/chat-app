import jwt from 'jsonwebtoken'

export const generateToken = (user) => {
    return jwt.sign({ user }, process.env.JWT_SECRET, { expiresIn: "24h" })
}

export const verifyToken = (token) =>{
    try {
        const tokenData = jwt.verify(token, process.env.JWT_SECRET)
        return tokenData
    } catch (error) {
        console.log(error);
        return null
    }
}