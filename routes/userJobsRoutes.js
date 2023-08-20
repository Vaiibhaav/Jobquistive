import express from "express";
const router = express.Router();
import {
  createJob,
  appliedJob,
  deleteJob,
  updateJob,
  getAllJobs,
  getAllOpportunities,
  showStats,
  getAppliedJobs,
} from "../controllers/userJobsController.js";

router.route("/").post(createJob).get(getAllJobs);
router.route("/stats").get(showStats);
router.route("/:id").delete(deleteJob).patch(updateJob);
router.route("/opportunities").get(getAllOpportunities);
router.route("/apply/:id").patch(appliedJob);
router.route("/applied-jobs").get(getAppliedJobs);

export default router;
