import mongoose from "mongoose";

const JobOpportunitySchema = mongoose.Schema(
  {
    company: {
      type: String,
      required: [true, "Please provide company name"],
      maxlength: 50,
    },
    position: {
      type: String,
      required: [true, "Please provide position"],
      maxlength: 100,
    },
    jobType: {
      type: String,
      enum: ["Full-Time", "Part-Time", "Remote", "Internship"],
      default: "Full-Time",
    },
    jobLocation: {
      type: String,
      default: "My City",
      required: true,
    },
    jobDescription: {
      type: String,
      required: [true, "Please provide job description"],
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "Recruiter",
      required: [true, "Please provide recruiter"],
    },
    usersApplied: [
      {
        userId: {
          type: mongoose.Types.ObjectId,
          ref: "User",
        },
        name: {
          type: String,
        },
        fileId: {
          type: String,
        },
        salaryExpectation: {
          type: Number,
        },
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
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("JobOpportunity", JobOpportunitySchema);
