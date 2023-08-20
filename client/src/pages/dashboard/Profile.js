import { useState } from "react";
import Wrapper from "../../assets/wrappers/DashboardFormPage";
import { FormRow, FormRowSelect, Alert } from "../../Components";
import { useAppContext } from "../../Context/appContext";

const Profile = () => {
  const {
    user,
    showAlert,
    displayAlert,
    isLoading,
    updateUser,
    positionOptions,
  } = useAppContext();
  const [name, setName] = useState(user?.name);
  const [email, setEmail] = useState(user?.email);
  const [location, setLocation] = useState(user?.location);
  const [aspiringPosition, setAspiringPosition] = useState(
    user?.aspiringPosition
  );
  const [gender, setGender] = useState(user?.gender);
  const [yoe, setYoe] = useState(user?.yoe);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !location) {
      displayAlert();
      return;
    }
    updateUser({ name, email, location, aspiringPosition, gender, yoe });
  };
  return (
    <Wrapper>
      <form className="form" onSubmit={handleSubmit}>
        <h3>profile </h3>
        {showAlert && <Alert />}

        {/* name */}
        <div className="form-center">
          <FormRow
            type="text"
            name="name"
            value={name}
            handleChange={(e) => setName(e.target.value)}
          />
          <FormRow
            type="email"
            name="email"
            value={email}
            handleChange={(e) => setEmail(e.target.value)}
          />

          <FormRow
            type="text"
            name="location"
            value={location}
            handleChange={(e) => setLocation(e.target.value)}
          />

          <FormRowSelect
            labelText="Position Type"
            name="aspiringPosition"
            value={aspiringPosition}
            handleChange={(e) => setAspiringPosition(e.target.value)}
            list={positionOptions}
          >
            Position Type
          </FormRowSelect>
          <FormRowSelect
            labelText="Gender"
            name="gender"
            value={gender}
            handleChange={(e) => setGender(e.target.value)}
            list={["Male", "Female", "Others"]}
          >
            Gender
          </FormRowSelect>
          <FormRowSelect
            labelText="Years of Experience"
            name="yoe"
            value={yoe}
            handleChange={(e) => setYoe(e.target.value)}
            list={[
              "0 - 2 years",
              "2 - 4 years",
              "4 - 6 years",
              "6 - 10 years",
              "10+ years",
            ]}
          >
            Years of Experience
          </FormRowSelect>

          <button
            id="btn-profile"
            className="btn btn-block"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? "Please Wait..." : "save changes"}
          </button>
        </div>
      </form>
    </Wrapper>
  );
};

export default Profile;
