import { FormRow, Alert, FormRowSelect } from "../../Components";
import { useAppContext } from "../../Context/appContext";
import Wrapper from "../../assets/wrappers/DashboardFormPage";

const PostJob = () => {
  const {
    isLoading,
    isEditing,
    showAlert,
    displayAlert,
    position,
    positionOptions,
    company,
    jobLocation,
    jobType,
    jobTypeOptions,
    jobDescription,
    handleChange,
    clearValues,
    postJob,
    editOpportunity,
  } = useAppContext();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!position || !company || !jobLocation || !jobDescription || !jobType) {
      displayAlert();
      return;
    }
    if (isEditing) {
      editOpportunity();
      return;
    }
    postJob();
  };

  const handleJobInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    handleChange({ name, value });
  };

  return (
    <Wrapper>
      <form className="form">
        <h3>{isEditing ? "edit job" : "add job"} </h3>
        {showAlert && <Alert />}
        <div className="form-center">
          {/* company */}
          <FormRow
            type="text"
            name="company"
            value={company}
            handleChange={handleJobInput}
          />
          {/* position */}
          {/* <FormRow
            type="text"
            name="position"
            value={position}
            handleChange={handleJobInput}
          /> */}
          <FormRowSelect
            labelText="Position Type"
            name="position"
            value={position}
            handleChange={handleJobInput}
            list={positionOptions}
          >
            Position Type
          </FormRowSelect>
          {/* job type */}
          <FormRowSelect
            labelText="Job Type"
            name="jobType"
            value={jobType}
            handleChange={handleJobInput}
            list={jobTypeOptions}
          >
            Job Type
          </FormRowSelect>
          {/* location */}
          <FormRow
            type="text"
            labelText="location"
            name="jobLocation"
            value={jobLocation}
            handleChange={handleJobInput}
          />
          {/* job Description */}
          <FormRow
            labelText="Description"
            name="jobDescription"
            value={jobDescription}
            handleChange={handleJobInput}
          >
            Job Description
          </FormRow>

          <div className="btn-container">
            <button
              className="btn btn-block submit-btn"
              type="submit"
              onClick={handleSubmit}
              disabled={isLoading}
            >
              submit
            </button>
            <button
              className="btn btn-block clear-btn"
              onClick={(e) => {
                e.preventDefault();
                clearValues();
              }}
            >
              clear
            </button>
          </div>
        </div>
      </form>
    </Wrapper>
  );
};

export default PostJob;
