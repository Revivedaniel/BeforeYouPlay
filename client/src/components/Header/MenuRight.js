import { Link } from "react-router-dom";
import Auth from "../../utils/auth";

export default function MenuRight({ setLogin, setSignUp }) {
  const handleLogin = (e) => {
    e.preventDefault();
    setLogin(true);
  };
  const handleSignUp = (e) => {
    e.preventDefault();
    setSignUp(true);
  };
  return (
    <ul className="nav navbar-nav flex-child-menu menu-right">
      {/* <li className="dropdown first">
        <a
          className="btn btn-default dropdown-toggle lv1"
          data-toggle="dropdown"
          data-hover="dropdown"
        >
          pages <i className="fa fa-angle-down" aria-hidden="true"></i>
        </a>
        <ul className="dropdown-menu level1">
          <li>
            <a href="landing.html">Landing</a>
          </li>
          <li>
            <a href="404.html">404 Page</a>
          </li>
          <li className="it-last">
            <a href="comingsoon.html">Coming soon</a>
          </li>
        </ul>
      </li>
      <li>
        <a href="#">Help</a>
      </li> */}
      {!Auth.loggedIn() ? (
        <>
          <li className="btn" >
            <a href="/" className="loginLink" onClick={handleLogin} style={{
                position: "relative",
                display: "block",
                padding: "10px 15px",
                color: "var(--cta-dark)",
                backgroundColor: "var(--primary-dark)"
              }}>
              Login
            </a>
          </li>
          <li className="btn signupLink">
            <a href="/" onClick={handleSignUp} style={{
                position: "relative",
                display: "block",
                padding: "10px 15px",
                color: "var(--primary-dark)"
              }}>sign up</a>
          </li>
        </>
      ) : (
        <div>
          <li className="btn signupLink">
            <Link
              style={{
                position: "relative",
                display: "block",
                padding: "10px 15px",
                color: "var(--primary-dark)"
              }}
              id="logout"
              to="/"
              onClick={() => Auth.logout()}
            >
              Logout
            </Link>
          </li>
        </div>
      )}
    </ul>
  );
}
