import express from 'express'
import rateLimiter from 'express-rate-limit'
const router = express.Router()

import { register, login, update } from '../controllers/recruiterAuthController.js'
import authenticateRecruiter from '../middleware/auth.js'

const apiLimiter = rateLimiter({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 10,
    message:
        'Too many requests from this IP, please try again after 15 minutes',
})

router.route('/register-recruiter').post(apiLimiter, register)
router.route('/login-recruiter').post(apiLimiter, login)
router.route('/update-recruiter').patch(authenticateRecruiter, update)

export default router