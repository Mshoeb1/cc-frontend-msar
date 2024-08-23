import { Link, withRouter } from "react-router-dom";
import Cookies from "js-cookie";

import "./index.css";

const Header = (props) => {
  const onClickLogout = () => {
    const { history } = props;

    Cookies.remove("jwt_token");
    localStorage.removeItem("details");
    history.replace("/login");
  };

  return (
    <nav className="nav-header">
      <div className="nav-bar-large-container">
        <Link to="/">
          <h1 className="Nav-heading">Career Crave</h1>
        </Link>
        <ul className="nav-menu">
          <li className="nav-menu-item">
            <Link to="/bookings" className="nav-link">
              Bookings
            </Link>
          </li>
          <button
            type="button"
            className="logout-desktop-btn"
            onClick={onClickLogout}
          >
            Logout
          </button>
        </ul>
      </div>
    </nav>
  );
};

export default withRouter(Header);
