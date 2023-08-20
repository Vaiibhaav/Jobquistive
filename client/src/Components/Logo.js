import logo from "../assets/images/logo.svg";
import { useNavigate } from "react-router-dom";

const Logo = () => {
  const navigate = useNavigate();
  return (
    <img
      onClick={() => navigate("/")}
      src={logo}
      alt="Job Tracker"
      className="logo"
      style={{ cursor: "pointer" }}
    />
  );
};

export default Logo;
