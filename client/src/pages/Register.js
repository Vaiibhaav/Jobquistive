import { useState, useEffect } from "react";
import { Logo, FormRow, FormRowSelect, Alert } from "../Components";
import Wrapper from "../assets/wrappers/RegisterPage";
import { useAppContext } from "../Context/appContext";
import { useNavigate } from "react-router-dom";

const initialState = {
  name: "",
  email: "",
  password: "",
  aspiringPosition: "Software Engineer",
  isMember: true,
  gender: "Male",
  yoe: "0 - 2 years",
};

const Register = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState(initialState);
  const {
    user,
    isLoading,
    showAlert,
    displayAlert,
    registerUser,
    loginUser,
    positionOptions,
  } = useAppContext();

  const toggleMember = () => {
    setValues({ ...values, isMember: !values.isMember });
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const { name, email, password, isMember, aspiringPosition, gender, yoe } =
      values;
    if (!email || !password || (!isMember && !name)) {
      displayAlert();
      return;
    }
    const currentUser = {
      name,
      email,
      password,
      aspiringPosition,
      gender,
      yoe,
    };
    if (isMember) {
      loginUser(currentUser);
    } else {
      registerUser(currentUser);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      if (user) {
        navigate("/");
      }
    }, 3000);
  }, [user, navigate]);

  return (
    <Wrapper className="full-page">
      {/* <h1 className="title">User Register</h1> */}
      <form className="form" onSubmit={onSubmit}>
        <Logo />
        <h3>{values.isMember ? "User Login" : "User Register"}</h3>
        {showAlert && <Alert />}
        {/* name input */}
        {!values.isMember && (
          <>
            <FormRow
              type="text"
              name="name"
              value={values.name}
              handleChange={handleChange}
            />
            <FormRowSelect
              labelText="Position Type"
              name="position"
              value={values.aspiringPosition}
              handleChange={handleChange}
              list={positionOptions}
            >
              Position Type
            </FormRowSelect>
            <FormRowSelect
              labelText="Gender"
              name="gender"
              value={values.gender}
              handleChange={handleChange}
              list={["Male", "Female", "Others"]}
            >
              Gender
            </FormRowSelect>
            <FormRowSelect
              labelText="Years Of Experience"
              name="yoe"
              value={values.yoe}
              handleChange={handleChange}
              list={[
                "0 - 2 years",
                "2 - 4 years",
                "4 - 6 years",
                "6 - 10 years",
                "10+ years",
              ]}
            >
              Years Of Experience
            </FormRowSelect>
          </>
        )}
        {/* email input */}
        <FormRow
          type="email"
          name="email"
          value={values.email}
          handleChange={handleChange}
        />
        {/* password input */}
        <FormRow
          type="password"
          name="password"
          value={values.password}
          handleChange={handleChange}
        />

        <button type="submit" className="btn btn-block" disabled={isLoading}>
          submit
        </button>

        <p>
          {values.isMember ? "Not a member yet? " : "Already a member? "}
          <button type="button" className="member-btn" onClick={toggleMember}>
            {values.isMember ? "Register" : "Login"}
          </button>
        </p>
      </form>
    </Wrapper>
  );
};

export default Register;
