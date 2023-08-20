import Wrapper from "../../assets/wrappers/Opportunity";
import { FaGenderless } from "react-icons/fa";
import { GiAchievement } from "react-icons/gi";
import { BiRupee } from "react-icons/bi";
import { useAppContext } from "../../Context/appContext";
import { useEffect } from "react";
import {
  Loading,
  RecruiterOpportunityDetailsSearchContainer,
  JobInfo,
} from "../../Components";

const OpportunityDetails = () => {
  const {
    getCurrentOpportunityDetails,
    currentOpportunity,
    isLoading,
    search,
    searchGender,
    searchYoe,
  } = useAppContext();

  useEffect(() => {
    getCurrentOpportunityDetails();
    // eslint-disable-next-line
  }, [search, searchGender, searchYoe]);
  if (isLoading) {
    return <Loading center="center" />;
  }
  if (currentOpportunity.usersApplied.length === 0) {
    return <h3>No one applied to this job...</h3>;
  }

  return (
    <div>
      <RecruiterOpportunityDetailsSearchContainer />
      <br />
      <h3>
        {currentOpportunity.company} | {currentOpportunity.position}
      </h3>
      {currentOpportunity.usersApplied.map((el, idx) => {
        if (el.salaryExpectation > search && search !== "") return <></>;
        if (el.gender !== searchGender && searchGender !== "All") return <></>;
        if (el.yoe !== searchYoe && searchYoe !== "All") return <></>;
        return (
          <div>
            <Wrapper>
              <div>
                <header>
                  <div className="main-icon">{idx + 1}</div>
                  <div className="info">
                    <h5>{`${el.name}`}</h5>
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      href={`${el.fileId}`}
                    >
                      Resume Link
                    </a>
                  </div>
                </header>
                <div className="content">
                  <div className="content-center">
                    <JobInfo
                      icon={<BiRupee />}
                      text_bold={"Salary Expectation - "}
                      text_opp_details={el.salaryExpectation + " LPA"}
                    />
                    <JobInfo
                      icon={<GiAchievement />}
                      text_bold={"Years of Experience - "}
                      text_opp_details={el.yoe}
                    />
                    <JobInfo
                      icon={<FaGenderless />}
                      text_bold={"Gender - "}
                      text_opp_details={el.gender}
                    />
                  </div>
                </div>
              </div>
            </Wrapper>
            <br />
          </div>
        );
      })}
    </div>
  );
};

export default OpportunityDetails;
