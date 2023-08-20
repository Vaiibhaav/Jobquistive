import express from "express";
const router = express.Router();
import {
  createJob,
  deleteJob,
  updateJob,
  getAllJobs,
  getCurrentOpportunityDetails,
} from "../controllers/jobOpportunityController.js";

router.route("/").post(createJob).get(getAllJobs);
router.route("/:id").delete(deleteJob).patch(updateJob);
router.route("/opportunity/:id").get(getCurrentOpportunityDetails);

export default router;
