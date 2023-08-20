import {
  FaLocationArrow,
  FaBriefcase,
  FaCalendarAlt,
  FaExternalLinkSquareAlt,
} from "react-icons/fa";
import { MdDescription } from "react-icons/md";
import Wrapper from "../assets/wrappers/Opportunity";
import JobInfo from "./JobInfo";
import moment from "moment";
import { useAppContext } from "../Context/appContext";

const OpportunityApplied = ({
  position,
  company,
  jobLocation,
  jobType,
  jobDescription,
  createdAt,
  usersApplied,
}) => {
  let date = moment(createdAt);
  date = date.format("MMM Do, YYYY");

  const { user } = useAppContext();

  const getResume = () => {
    console.log(user._id);
    for (let i = 0; i < usersApplied.length; i++) {
      if (usersApplied[i].userId === user._id) {
        return usersApplied[i].fileId;
      }
    }
  };

  const getSalaryExpectation = () => {
    console.log(user._id);
    for (let i = 0; i < usersApplied.length; i++) {
      if (usersApplied[i].userId === user._id) {
        return usersApplied[i].salaryExpectation;
      }
    }
  };

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
        <p>
          <strong id="jobD">
            <JobInfo icon={<MdDescription />} text="Salary Expectation" />
          </strong>
          <div id="jobDesc">{getSalaryExpectation()} Lakhs/Year</div>
        </p>
        <p>
          <strong>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={`${getResume()}`}
            >
              <JobInfo icon={<FaExternalLinkSquareAlt />} text="Resume" />
            </a>
          </strong>
        </p>
      </div>
    </Wrapper>
  );
};

export default OpportunityApplied;
