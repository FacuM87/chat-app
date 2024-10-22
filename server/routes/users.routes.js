import { Router } from 'express'
import { getUsers } from '../controllers/users.controller.js'
import { protectedRoute } from '../middlewares/protectedRoutes.js'

const router = Router()

router.get('/getUsers', protectedRoute, getUsers)

export default router