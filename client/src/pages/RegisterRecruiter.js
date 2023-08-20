import { useState, useEffect } from "react";
import { Logo, FormRow, Alert } from "../Components";
import Wrapper from "../assets/wrappers/RegisterPage";
import { useAppContext } from "../Context/appContext";
import { useNavigate } from "react-router-dom";

const initialState = {
  name: "",
  companyName:"",
  email: "",
  password: "",
  isMember: true,
};

const RegisterRecruiter = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState(initialState);
  const { recruiter, isLoading, showAlert, displayAlert, registerRecruiter, loginRecruiter } =
    useAppContext();

  const toggleMember = () => {
    setValues({ ...values, isMember: !values.isMember });
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const { name, companyName, email, password, isMember } = values;
    if (!email || !password || (!isMember && !name) || (!isMember && !companyName)) {
      displayAlert();
      return;
    }
    const currentUser = { name, companyName, email, password };
    if (isMember) {
      loginRecruiter(currentUser);
    } else {
      registerRecruiter(currentUser);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      if (recruiter) {
        navigate("/");
      }
    }, 3000);
  }, [recruiter, navigate]);

  return (
    <Wrapper className="full-page">
      <form className="form" onSubmit={onSubmit}>
        <Logo />
        <h3>{values.isMember ? "Recruiter Login" : "Recruiter Register"}</h3>
        {showAlert && <Alert />}
        {/* name input */}
        {!values.isMember && (
          <FormRow
            type="text"
            name="name"
            value={values.name}
            handleChange={handleChange}
          />
        )}
        {/* Company Name */}
        {!values.isMember && (
          <FormRow
            type="text"
            name="companyName"
            labelText="Company Name"
            value={values.companyName}
            handleChange={handleChange}
          />
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
          Submit
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

export default RegisterRecruiter;
