import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
// import UserJobs from './UserJobs.js'

const UserSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide name"],
    minLength: 3,
    maxLength: 20,
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Please provide email"],
    validate: {
      validator: validator.isEmail,
      message: "Please provide a valid email",
    },
    unique: true,
  },
  aspiringPosition: {
    type: String,
    enum: [
      "Software Engineer",
      "Product Manager",
      "Sales Manager",
      "Data Scientist",
    ],
  },
  password: {
    type: String,
    required: [true, "Please provide password"],
    minLength: 6,
    select: false,
  },
  location: {
    type: String,
    trim: true,
    maxLength: 20,
    default: "My City",
  },
  jobsApplied: [
    {
      jobId: {
        type: mongoose.Types.ObjectId,
        ref: "JobOpportunity",
      },
      fileId: {
        type: String,
      },
      salaryExpectation: {
        type: Number,
      },
    },
  ],
  gender: {
    type: String,
    enum: ["Male", "Female", "Others"],
  },
  yoe: {
    type: String,
    enum: [
      "0 - 2 years",
      "2 - 4 years",
      "4 - 6 years",
      "6 - 10 years",
      "10+ years",
    ],
  },
});

UserSchema.pre("save", async function () {
  if (!this.isModified("password")) {
    return;
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.methods.createJWT = function () {
  return jwt.sign({ userId: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_LIFETIME,
  });
};

UserSchema.methods.comparePassword = async function (candidatePassword) {
  const isMatch = await bcrypt.compare(candidatePassword, this.password);
  return isMatch;
};

export default mongoose.model("User", UserSchema);
