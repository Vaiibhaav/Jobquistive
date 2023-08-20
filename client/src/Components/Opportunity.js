import { FaLocationArrow, FaBriefcase, FaCalendarAlt } from "react-icons/fa";
import { MdDescription } from "react-icons/md";
import { Link } from "react-router-dom";
import { useAppContext } from "../Context/appContext";
import Wrapper from "../assets/wrappers/Opportunity";
import JobInfo from "./JobInfo";
import moment from "moment";

const Opportunity = ({
  _id,
  position,
  company,
  jobLocation,
  jobType,
  jobDescription,
  createdAt,
}) => {
  const { setEditOpportunity, deleteOpportunity, setCurrentOpportunity } =
    useAppContext();

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
            <Link
              to="/add-job"
              onClick={() => setEditOpportunity(_id)}
              className="btn edit-btn"
            >
              Edit
            </Link>
            <button
              type="button"
              className="btn delete-btn"
              onClick={() => deleteOpportunity(_id)}
            >
              Delete
            </button>
            <Link
              to="/opportunity-details"
              className="btn edit-btn"
              onClick={() => {
                setCurrentOpportunity(_id);
              }}
            >
              Details
            </Link>
          </div>
        </footer>
      </div>
    </Wrapper>
  );
};

export default Opportunity;
