import StatusCodes from "http-status-codes";
import Job from "../models/UserJobs.js";
import User from "../models/User.js";
import JobOpportunity from "../models/JobOpportunity.js";

import mongoose from "mongoose";
import moment from "moment";
import {
  BadRequestError,
  NotFoundError,
  UnauthenticatedError,
} from "../errors/index.js";

const createJob = async (req, res) => {
  const { company, position } = req.body;
  if (!company || !position) {
    throw new BadRequestError("Please provide all values");
  }
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
  if (status && status !== "All") {
    queryObject.status = status;
  }
  if (jobType && jobType !== "All") {
    queryObject.jobType = jobType;
  }
  if (search) {
    queryObject.position = { $regex: search, $options: "i" };
  }

  // NO AWAIT
  let result = Job.find(queryObject);

  // chain sort conditions
  if (sort === "Latest") {
    result = result.sort("-createdAt");
  }
  if (sort === "Oldest") {
    result = result.sort("createdAt");
  }
  if (sort === "A-Z") {
    result = result.sort("position");
  }
  if (sort === "Z-A") {
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

const getAllOpportunities = async (req, res) => {
  const { search, position, jobType, sort } = req.query;

  const queryObject = {};
  if (position && position !== "All") {
    queryObject.position = position;
  }
  if (jobType && jobType !== "All") {
    queryObject.jobType = jobType;
  }
  if (search) {
    queryObject.company = { $regex: search, $options: "i" };
  }

  let result = await JobOpportunity.find(queryObject);

  // // chain sort conditions
  // if (sort === "Latest") {
  //   result = result.sort("-createdAt");
  // }
  // if (sort === "Oldest") {
  //   result = result.sort("createdAt");
  // }
  // if (sort === "A-Z") {
  //   result = result.sort("position");
  // }
  // if (sort === "Z-A") {
  //   result = result.sort("-position");
  // }
  // // setup pagination
  // const page = Number(req.query.page) || 1;
  // const limit = Number(req.query.limit) || 10;
  // const skip = (page - 1) * limit; //10
  // result = result.skip(skip).limit(limit);

  // let jobs = result.filter(function (ob) {
  //   for (let i = 0; i < ob.usersApplied.length; i++) {
  //     if (ob.usersApplied[i].userId._id == req.user.userId) {
  //       return false;
  //     }
  //   }
  //   return true;
  // });

  // res.status(StatusCodes.OK).json({ jobs });

  // ---- OLD -----
  // let result = await JobOpportunity.find({});
  // const page = Number(req.query.page) || 1;
  // const limit = Number(req.query.limit) || 10;
  // const skip = (page - 1) * limit; //10
  // result = result.skip(skip).limit(limit);

  let jobs = result.filter(function (ob) {
    for (let i = 0; i < ob.usersApplied.length; i++) {
      if (ob.usersApplied[i].userId._id == req.user.userId) {
        return false;
      }
    }
    return true;
  });

  res.status(StatusCodes.OK).json({ jobs });
};

const updateJob = async (req, res) => {
  const { id: jobId } = req.params;
  const { company, position } = req.body;
  if (!company || !position) {
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

// applied job
const appliedJob = async (req, res) => {
  const { id: jobId } = req.params;
  const { user, fileId, salaryExpectation } = req.body;
  if (!user || !fileId || !salaryExpectation) {
    throw new BadRequestError("Please Provide All Values");
  }
  const job = await JobOpportunity.findOne({ _id: jobId });
  console.log("opp found", job);
  if (!job) {
    throw new NotFoundError(`No job with id ${jobId}`);
  }
  if (job.usersApplied.find((o) => o.userId.toString() === req.user.userId)) {
    throw new UnauthenticatedError("Can't apply again to this job");
  }

  // update
  const update = {
    $push: {
      usersApplied: {
        userId: user._id,
        name: user.name,
        fileId: fileId,
        salaryExpectation: salaryExpectation,
        gender: user.gender,
        yoe: user.yoe,
      },
    },
  };
  const appliedJob = await JobOpportunity.findOneAndUpdate(
    { _id: jobId },
    update,
    {
      new: true,
      runValidators: true,
    }
  );

  // adding this job to user's array.
  const updateUser = {
    $push: { jobsApplied: { jobId, fileId, salaryExpectation } },
  };
  await User.findOneAndUpdate({ _id: user._id }, updateUser, {
    new: true,
    runValidators: true,
  });
  res.status(StatusCodes.OK).json({ appliedJob });
};

// showing jobs in which user has applied:

const getAppliedJobs = async (req, res) => {
  let result = await JobOpportunity.find({});
  let appliedJobs = result.filter(function (ob) {
    for (let i = 0; i < ob.usersApplied.length; i++) {
      if (ob.usersApplied[i].userId._id == req.user.userId) {
        return true;
      }
    }
    return false;
  });

  res.status(StatusCodes.OK).json({ appliedJobs });
};

const showStats = async (req, res) => {
  let stats = await Job.aggregate([
    { $match: { createdBy: mongoose.Types.ObjectId(req.user.userId) } },
    { $group: { _id: "$status", count: { $sum: 1 } } },
  ]);
  stats = stats.reduce((acc, curr) => {
    const { _id: title, count } = curr;
    acc[title] = count;
    return acc;
  }, {});
  const defaultStats = {
    pending: stats.Pending || 0,
    interview: stats.Interview || 0,
    declined: stats.Declined || 0,
  };
  let monthlyApplications = await Job.aggregate([
    { $match: { createdBy: mongoose.Types.ObjectId(req.user.userId) } },
    {
      $group: {
        _id: {
          year: {
            $year: "$createdAt",
          },
          month: {
            $month: "$createdAt",
          },
        },
        count: { $sum: 1 },
      },
    },
    { $sort: { "_id.year": -1, "_id.month": -1 } },
    { $limit: 6 },
  ]);
  monthlyApplications = monthlyApplications
    .map((item) => {
      const {
        _id: { year, month },
        count,
      } = item;
      // accepts 0-11
      const date = moment()
        .month(month - 1)
        .year(year)
        .format("MMM Y");
      return { date, count };
    })
    .reverse();
  res.status(StatusCodes.OK).json({ defaultStats, monthlyApplications });
};

export {
  createJob,
  appliedJob,
  deleteJob,
  updateJob,
  getAllJobs,
  getAllOpportunities,
  showStats,
  getAppliedJobs,
};
