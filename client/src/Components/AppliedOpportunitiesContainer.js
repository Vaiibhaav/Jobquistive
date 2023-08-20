import { useAppContext } from "../Context/appContext";
import { useEffect } from "react";
import Loading from "./Loading";
import OpportunityApplied from "./OpportunityApplied";
import Wrapper from "../assets/wrappers/OpportunityContainer";

const AppliedOpportunitiesContainer = () => {
  const { getAppliedOpportunitiesUser, opportunities, isLoading } =
    useAppContext();
  useEffect(() => {
    getAppliedOpportunitiesUser();
    // eslint-disable-next-line
  }, []);

  if (isLoading) {
    return <Loading center="center" />;
  }
  if (opportunities.length === 0) {
    return (
      <Wrapper>
        <h2>No applied jobs...</h2>
      </Wrapper>
    );
  }
  return (
    <Wrapper>
      <h5>
        {opportunities.length} job{opportunities.length > 1 && "s"}
      </h5>
      <div className="opp">
        {opportunities.map((job) => {
          return <OpportunityApplied key={job._id} {...job} />;
        })}
      </div>
    </Wrapper>
  );
};

export default AppliedOpportunitiesContainer;
