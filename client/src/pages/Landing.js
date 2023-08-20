import main from "../assets/images/main-alternative.svg";
import Wrapper from "../assets/wrappers/LandingPage";
import { Logo } from "../Components";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <Wrapper>
      <nav>
        <Logo />
      </nav>
      <div className="container page">
        {/* info */}
        <div className="info">
          <h1>
            Job <span>Tracking</span> App
          </h1>
          <p>
            <strong>JOB FINDING AND HIRING MADE EASY</strong>
            <br />
          </p>

          <div className="flex-container">
            <div className="user-content">
              <p>
                Unlock infinite opportunities and also track your progress
                easily.
              </p>
              <strong>For Job Seekers</strong>
              <br />
              <Link to="/register-user" className="btn btn-hero h3">
                Login/Register
              </Link>
            </div>
            <div>
              <p>
                One stop solution for finding the top talents for your company.{" "}
              </p>
              <strong>For Recruiters</strong>
              <br />
              <Link to="/register-recruiter" className="btn btn-hero">
                Login/Register
              </Link>
            </div>
          </div>
        </div>
        {/* image */}
        <img src={main} alt="Job Hunt" className="img main-img" />
      </div>
    </Wrapper>
  );
};

export default Landing;
