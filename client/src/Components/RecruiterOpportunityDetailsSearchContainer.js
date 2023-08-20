import { FormRow, FormRowSelect } from ".";
import { useAppContext } from "../Context/appContext";
import Wrapper from "../assets/wrappers/SearchContainer";
const RecruiterOpportunityDetailsSearchContainer = () => {
  const {
    isLoading,
    search,
    searchYoe,
    searchGender,
    handleChange,
    clearFiltersRecruiter,
  } = useAppContext();

  const handleSearch = (e) => {
    if (isLoading) return;
    handleChange({ name: e.target.name, value: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    clearFiltersRecruiter(); // Make clear filters function for recruiter side
  };

  return (
    <Wrapper>
      <form className="form">
        <div className="form-center">
          {/* search for applicants with less than or equal to salary expectation */}
          <FormRow
            type="number"
            labelText="Max Salary Expectation (Lakhs/Year)"
            name="search"
            value={search}
            handleChange={handleSearch}
          ></FormRow>
          <FormRowSelect
            labelText="Years of Experience"
            name="searchYoe"
            value={searchYoe}
            handleChange={handleSearch}
            list={[
              "All",
              "0 - 2 years",
              "2 - 4 years",
              "4 - 6 years",
              "6 - 10 years",
              "10+ years",
            ]}
          ></FormRowSelect>
          <FormRowSelect
            labelText="Gender"
            name="searchGender"
            value={searchGender}
            handleChange={handleSearch}
            list={["All", "Male", "Female", "Others"]}
          ></FormRowSelect>
          <button
            className="btn btn-block btn-danger"
            disabled={isLoading}
            onClick={handleSubmit}
          >
            clear filters
          </button>
        </div>
      </form>
    </Wrapper>
  );
};

export default RecruiterOpportunityDetailsSearchContainer;
