import { FormRow, FormRowSelect } from ".";
import { useAppContext } from "../Context/appContext";
import Wrapper from "../assets/wrappers/SearchContainer";
const UserOpportunitiesSearchContainer = () => {
  const {
    isLoading,
    search,
    searchStatus,
    searchType,
    searchPosition,
    positionOptions,
    sort,
    sortOptions,
    statusOptions,
    jobTypeOptions,
    handleChange,
    clearFilters,
  } = useAppContext();

  const handleSearch = (e) => {
    if (isLoading) return;
    handleChange({ name: e.target.name, value: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    clearFilters();
  };

  return (
    <Wrapper>
      <form className="form">
        <h4>search form</h4>
        <div className="form-center">
          {/* search by company */}
          <FormRow
            type="text"
            labelText="Company Search"
            name="search"
            value={search}
            handleChange={handleSearch}
          ></FormRow>
          {/* search by job type */}
          <FormRowSelect
            labelText="job type"
            name="searchType"
            value={searchType}
            handleChange={handleSearch}
            list={["All", ...jobTypeOptions]}
          ></FormRowSelect>
          <FormRowSelect
            labelText="position"
            name="searchPosition"
            value={searchPosition}
            handleChange={handleSearch}
            list={["All", ...positionOptions]}
          ></FormRowSelect>
          {/* sort */}

          {/* <FormRowSelect
            name="sort"
            value={sort}
            handleChange={handleSearch}
            list={sortOptions}
          ></FormRowSelect> */}
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

export default UserOpportunitiesSearchContainer;
