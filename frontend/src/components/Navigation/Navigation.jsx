import { NavLink, useNavigate } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";


function Navigation() {
  const navigate = useNavigate();
  const handleLogoClick = () => {
    navigate("/");
  };
  return (
    <nav className="navigation">
      <NavLink to="/" className="logo" onClick={handleLogoClick}>Home</NavLink>
      <ul>
      </ul>
      {/* Profile */}
      <ProfileButton />
    </nav>
  );
}

export default Navigation;
