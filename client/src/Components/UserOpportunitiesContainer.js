import { useAppContext } from "../Context/appContext";
import { useEffect } from "react";
import Loading from "./Loading";
import OpportunityApply from "./OpportunityApply";
import Wrapper from "../assets/wrappers/OpportunityContainer";

const UserOpportunitiesContainer = () => {
  const {
    page,
    search,
    searchPosition,
    searchType,
    sort,
    getAllOpportunitiesUser,
    opportunities,
    isLoading,
  } = useAppContext();

  useEffect(() => {
    getAllOpportunitiesUser();
    // eslint-disable-next-line
  }, [page, search, searchPosition, searchType, sort]);

  if (isLoading) {
    return <Loading center="center" />;
  }
  if (opportunities.length === 0) {
    return (
      <Wrapper>
        <h2>No jobs to display...</h2>
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
          return <OpportunityApply key={job._id} {...job} />;
        })}
      </div>
    </Wrapper>
  );
};

export default UserOpportunitiesContainer;
