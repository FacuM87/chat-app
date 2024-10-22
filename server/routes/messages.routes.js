import { Router } from 'express'
import { getMessages, sendMessage } from '../controllers/message.controller.js'
import { protectedRoute } from '../middlewares/protectedRoutes.js'

const router = Router()

router.post('/sendMessage/:receiver_id', protectedRoute, sendMessage)
router.get('/getMessages/:receiver_id', protectedRoute, getMessages)

export default router