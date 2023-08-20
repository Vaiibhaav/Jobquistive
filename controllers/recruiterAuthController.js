import Recruiter from '../models/Recruiter.js'
import { StatusCodes } from 'http-status-codes'
import { BadRequestError, UnauthenticatedError } from '../errors/index.js'

const register = async (req, res) => {
    const { name, companyName, email, password } = req.body
    if (!name || !companyName || !email || !password) {
        throw new BadRequestError('Please provide all the details!')
    }
    const recruiterAlreadyExists = await Recruiter.findOne({ email })
    if (recruiterAlreadyExists) {
        throw new BadRequestError('Email already in use!')
    }
    const recruiter = await Recruiter.create({ name, companyName, email, password })
    const token = recruiter.createJWT()
    res.status(StatusCodes.CREATED).json({
        recruiter: {
           name: recruiter.name,
           companyName:recruiter.companyName,
            email: recruiter.email,
        },
        token,
    })
}
const login = async (req, res) => {
    const { email, password } = req.body
    if (!email || !password) {
        throw new BadRequestError('Please provide all values!')
    }
    const recruiter = await Recruiter.findOne({ email }).select('+password')
    if (!recruiter) {
        throw new UnauthenticatedError('Invalid Credentials')
    }
    const isPasswordCorrect = await recruiter.comparePassword(password)
    if (!isPasswordCorrect) {
        throw new UnauthenticatedError('Invalid Credentials')
    }
    const token = recruiter.createJWT()
    recruiter.password = undefined
    res.status(StatusCodes.OK).json({ recruiter, token })
}
const update = async (req, res) => {
    const {name, companyName, email } = req.body
    if (!name ||  !companyName ||  !email) {
        throw new BadRequestError('Please provide all details')
    }
    const recruiter = await Recruiter.findOne({ _id: req.user.userId })
    recruiter.name = name
    recruiter.companyName=companyName
    recruiter.email = email

    await recruiter.save()
    const token = recruiter.createJWT()
    res.status(StatusCodes.OK).json({ recruiter, token})
}

export { register, login, update }
