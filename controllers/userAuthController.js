import User from "../models/User.js";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, UnauthenticatedError } from "../errors/index.js";

const register = async (req, res) => {
  const { name, email, password, aspiringPosition, gender, yoe } = req.body;
  if (!name || !email || !password || !aspiringPosition || !gender || !yoe) {
    throw new BadRequestError("Please provide all the details!");
  }
  const userAlreadyExists = await User.findOne({ email });
  if (userAlreadyExists) {
    throw new BadRequestError("Email already in use!");
  }
  const user = await User.create({
    name,
    email,
    password,
    aspiringPosition,
    gender,
    yoe,
  });
  const token = user.createJWT();
  res.status(StatusCodes.CREATED).json({
    user: {
      email: user.email,
      name: user.name,
      location: user.location,
      aspiringPosition: user.aspiringPosition,
      gender: user.gender,
      yoe: user.yoe,
    },
    token,
    location: user.location,
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new BadRequestError("Please provide all values!");
  }
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    throw new UnauthenticatedError("Invalid Credentials");
  }
  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new UnauthenticatedError("Invalid Credentials");
  }
  const token = user.createJWT();
  user.password = undefined;
  res.status(StatusCodes.OK).json({ user, token, location: user.location });
};

const update = async (req, res) => {
  const { email, name, location, aspiringPosition, gender, yoe } = req.body;
  if (!email || !name || !location || !aspiringPosition || !gender || !yoe) {
    throw new BadRequestError("Please provide all details");
  }
  const user = await User.findOne({ _id: req.user.userId });
  user.email = email;
  user.name = name;
  user.location = location;
  user.aspiringPosition = aspiringPosition;
  user.gender = gender;
  user.yoe = yoe;

  await user.save();
  const token = user.createJWT();
  res.status(StatusCodes.OK).json({ user, token, location: user.location });
};

export { register, login, update };
