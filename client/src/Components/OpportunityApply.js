import { FaLocationArrow, FaBriefcase, FaCalendarAlt } from "react-icons/fa";
import { MdDescription } from "react-icons/md";
import { FormRow } from "./";
import Wrapper from "../assets/wrappers/Opportunity";
import JobInfo from "./JobInfo";
import moment from "moment";
import { useState } from "react";
import { useAppContext } from "../Context/appContext";

const OpportunityApply = ({
  _id,
  position,
  company,
  jobLocation,
  jobType,
  jobDescription,
  createdAt,
}) => {
  const [show, setShow] = useState(false);
  const [resume, setResume] = useState("");
  const [salaryExpectation, setSalaryExpectation] = useState("");

  const { appliedJob } = useAppContext();

  const handleClose = (e) => {
    e.preventDefault();
    setShow(false);
  };
  const handleShow = () => setShow(true);

  const handleResumeInput = (e) => {
    e.preventDefault();
    setResume(e.target.value);
  };

  const handleSalaryInput = (e) => {
    e.preventDefault();
    setSalaryExpectation(e.target.value);
  };

  const handleSubmit = (e) => {
    // Handle Post Resume in appContext
    e.preventDefault();
    appliedJob(_id, resume, salaryExpectation);
  };

  let date = moment(createdAt);
  date = date.format("MMM Do, YYYY");

  return (
    <Wrapper>
      <header>
        <div className="main-icon">{company.charAt(0)}</div>
        <div className="info">
          <h5>{position}</h5>
          <p>{company}</p>
        </div>
      </header>
      <div className="content">
        <div className="content-center">
          <JobInfo icon={<FaLocationArrow />} text={jobLocation} />
          <JobInfo icon={<FaCalendarAlt />} text={date} />
          <JobInfo icon={<FaBriefcase />} text={jobType} />
        </div>
        <p>
          <strong id="jobD">
            <JobInfo icon={<MdDescription />} text="Job Description" />
          </strong>
          <div id="jobDesc">{jobDescription}</div>
        </p>
        <footer>
          <div className="actions">
            <button
              // to='/add-job'
              onClick={() => handleShow()}
              className="btn edit-btn"
            >
              Apply
            </button>
          </div>
          <div className={show ? undefined : "hidden"}>
            <div className="flex-container form-opp">
              <form>
                <div>
                  <FormRow
                    type="text"
                    labelText="Provide your resume drive link"
                    name="resumeId"
                    value={resume}
                    handleChange={handleResumeInput}
                  />
                  <FormRow
                    type="number"
                    labelText="Salary Expectation (Lakhs/Year)"
                    name="salaryExpectation"
                    value={salaryExpectation}
                    handleChange={handleSalaryInput}
                  />
                </div>
                <div className="btn-container">
                  <button
                    className="btn btn-block"
                    type="submit"
                    onClick={handleSubmit}
                  >
                    Submit
                  </button>
                  <button
                    className="btn btn-block delete-btn"
                    onClick={handleClose}
                  >
                    Cancel
                  </button>
                </div>
              </form>
              <div>
                <div className="job-note">Note:</div>
                <p className="job-note">
                  Please provide the google drive link of your resume and make
                  sure it's read access is set to public.
                </p>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </Wrapper>
  );
};

export default OpportunityApply;
