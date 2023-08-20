import StatusCodes from "http-status-codes";
import Job from "../models/JobOpportunity.js";
import mongoose from "mongoose";
import moment from "moment";
import {
  BadRequestError,
  NotFoundError,
  UnauthenticatedError,
} from "../errors/index.js";

const createJob = async (req, res) => {
  const {
    company,
    position,
    jobType,
    jobLocation,
    jobDescription,
    usersApplied,
  } = req.body;
  if (
    !company ||
    !position ||
    !jobType ||
    !jobLocation ||
    !jobDescription ||
    !usersApplied
  ) {
    throw new BadRequestError("Please provide all values");
  }
  console.log(req);
  req.body.createdBy = req.user.userId;
  const job = await Job.create(req.body);

  res.status(StatusCodes.CREATED).json({ job });
};

const deleteJob = async (req, res) => {
  const { id: jobId } = req.params;

  const job = await Job.findOne({ _id: jobId });

  if (!job) {
    throw new CustomError.NotFoundError(`No job with id : ${jobId}`);
  }
  if (req.user.userId !== job.createdBy.toString()) {
    throw new UnauthenticatedError("Not Authorized to access this route");
  }
  await job.remove();
  res.status(StatusCodes.OK).json({ msg: "Success! Job removed" });
};

const getAllJobs = async (req, res) => {
  const { search, status, jobType, sort } = req.query;
  const queryObject = {
    createdBy: req.user.userId,
  };
  if (status && status !== "all") {
    queryObject.status = status;
  }
  if (jobType && jobType !== "all") {
    queryObject.jobType = jobType;
  }
  if (search) {
    queryObject.position = { $regex: search, $options: "i" };
  }

  // NO AWAIT
  let result = Job.find(queryObject);

  // chain sort conditions
  if (sort === "latest") {
    result = result.sort("-createdAt");
  }
  if (sort === "oldest") {
    result = result.sort("createdAt");
  }
  if (sort === "a-z") {
    result = result.sort("position");
  }
  if (sort === "z-a") {
    result = result.sort("-position");
  }
  // setup pagination
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit; //10
  result = result.skip(skip).limit(limit);

  const jobs = await result;
  const totalJobs = await Job.countDocuments(queryObject);
  const numOfPages = Math.ceil(totalJobs / limit);

  res.status(StatusCodes.OK).json({ jobs, totalJobs, numOfPages });
};

const updateJob = async (req, res) => {
  const { id: jobId } = req.params;
  const { company, position, jobType, jobLocation, jobDescription } = req.body;
  if (!company || !position || !jobType || !jobLocation || !jobDescription) {
    throw new BadRequestError("Please Provide All Values");
  }
  const job = await Job.findOne({ _id: jobId });
  if (!job) {
    throw new NotFoundError(`No job with id ${jobId}`);
  }
  //check permissions
  if (req.user.userId !== job.createdBy.toString()) {
    throw new UnauthenticatedError("Not Authorized to access this route");
  }
  // update
  const updatedJob = await Job.findOneAndUpdate({ _id: jobId }, req.body, {
    new: true,
    runValidators: true,
  });
  res.status(StatusCodes.OK).json({ updatedJob });
};

const getCurrentOpportunityDetails = async (req, res) => {
  const { id: jobId } = req.params;

  const job = await Job.findOne({ _id: jobId });

  res.status(StatusCodes.OK).json({ job });
};

export {
  createJob,
  deleteJob,
  updateJob,
  getAllJobs,
  getCurrentOpportunityDetails,
};
