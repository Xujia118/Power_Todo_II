import { Link } from "react-router-dom";

import "./Header.css";

function Header({ user, onLogout }) {

  return (
    <header>
      <Link to={"/"}>
        <button className="button-home">Home icon</button>
      </Link>

      <div className="logo">Power Todo</div>
      <div className="control">
        <span className="greeting">Hello, {user}</span>
        <button className="button-logout" type="button" onClick={onLogout}>
          Logout
        </button>
      </div>
    </header>
  );
}

export default Header;
