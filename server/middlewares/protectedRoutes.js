import { verifyToken } from '../utils/jwt.js'
import User from '../db/models/user.model.js'
export const protectedRoute = async (req, res, next) => {
    const token = req.cookies.jwtCookie
    
    if (!token) {
        return res.status(401).json({status: "fail", message: 'Unauthorized - no token' })
    }

    const decodedToken = verifyToken(token)
    console.log(decodedToken);
    
    if (!decodedToken) {
        return res.status(401).json({status: "fail", message: 'Unauthorized - invalid token' })
    }

    const user = await User.findById(decodedToken.user.userId)
    
    if (!user) {
        return res.status(401).json({status: "fail", message: 'Unauthorized - user not found' })
    }

    req.user = decodedToken.user

    next()
}