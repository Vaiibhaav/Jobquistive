import express from 'express'
import rateLimiter from 'express-rate-limit'
const router = express.Router()

import { register, login, update } from '../controllers/userAuthController.js'
import authenticateUser from '../middleware/auth.js'

const apiLimiter = rateLimiter({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 10,
    message:
        'Too many requests from this IP, please try again after 15 minutes',
})

router.route('/register-user').post(apiLimiter, register)
router.route('/login-user').post(apiLimiter, login)
router.route('/update-user').patch(authenticateUser, update)

export default router