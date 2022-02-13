import { Link } from "react-router-dom";
import Auth from "../../utils/auth";

export default function MenuRight({setLogin, setSignUp}) {
  
  const handleLogin = (e) => {
    e.preventDefault();
    setLogin(true);
  }
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
      <li>
        <a className="loginLink" onClick={handleLogin}>Login</a>
      </li>
      <li className="btn signupLink">
        <a onClick={setSignUp}>sign up</a>
      </li>
    </ul>
  );
}
