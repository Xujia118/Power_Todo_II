import { Link } from "react-router-dom";

import Home from "../public/home_24dp_FILL0_wght400_GRAD0_opsz24.svg";
import Logout from "../public/logout_24dp_FILL0_wght400_GRAD0_opsz24.svg";

import "./Header.css";

function Header({ user, onLogout }) {

  return (
    <header>
      <Link to={"/"}>
        <button className="button-home">
          <img className="icon-home" src={Home} alt="home" />
        </button>
      </Link>

      <div className="logo">Power Todo</div>
      <div className="control">
        <span className="greeting">Hello, {user}</span>
        <button className="button-logout" type="button" onClick={onLogout}>
          <img src={Logout} alt="logout" />
        </button>
      </div>
    </header>
  );
}

export default Header;
