import { NavLink } from "react-router-dom";
import links from "../utils/links";
import { useAppContext } from "../Context/appContext.js";

const NavLinks = (props) => {
  const { user, recruiter } = useAppContext();
  return (
    <div className="nav-links">
      {links.map((link) => {
        const { text, path, id, icon } = link;
        if (recruiter && (id === 1 || id === 2 || id === 5 || id === 6))
          return "";
        if (user && id === 3) return "";
        return (
          <NavLink
            to={path}
            key={id}
            onClick={props.toggleSidebar}
            className={({ isActive }) => {
              return isActive ? "nav-link active" : "nav-link";
            }}
            end
          >
            <span className="icon">{icon}</span>
            {text}
          </NavLink>
        );
      })}
    </div>
  );
};

export default NavLinks;
