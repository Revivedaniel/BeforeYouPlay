import { useMutation } from "@apollo/client";
import { useState, ChangeEvent, FormEvent, MouseEvent } from "react";
import auth from "../utils/auth";
import { LOGIN } from "../utils/mutations";
import Link from "next/link";

export default function Login() {
  let handleClose = (e: MouseEvent<HTMLDivElement>) => {
    if (e.currentTarget.classList.contains("openform")) {
      e.preventDefault();
      // setLogin(false);
    }
  };

  // creating loginForm state
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });
  // Creating login mutation
  const [login, { loading }] = useMutation(LOGIN);
  const handleLoginSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const mutationResponse = await login({
        variables: {
          email: inputs.email,
          password: inputs.password,
        },
      });
      const token = mutationResponse.data.login.token;
      auth.login(token);
    } catch (e) {
      console.log(e);
    }
  };
  const handleLoginChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };
  return (
    <div className="overlay openform" onClick={handleClose}>
      <div className="login-wrapper" id="login-content">
        <div className="login-content">
          <Link href="/" onClick={function(e) { e.preventDefault();}} className="close">
            x
          </Link>
          <h3>Login</h3>
          <form onSubmit={handleLoginSubmit}>
            <div className="row">
              <label htmlFor="username">
                Email:
                <input
                  type="text"
                  name="email"
                  id="username"
                  pattern='^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$'
                  required
                  value={inputs.email}
                  onChange={handleLoginChange}
                />
              </label>
            </div>

            <div className="row">
              <label htmlFor="password">
                Password:
                <input
                  type="password"
                  name="password"
                  id="password"
                  pattern="(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$"
                  required
                 value={inputs.password}
                  onChange={handleLoginChange}
                />
              </label>
            </div>
            {/* <div className="row">
              <div className="remember">
                <div>
                  <input type="checkbox" name="remember" value="Remember me" />
                  <span>Remember me</span>
                </div>
                <a href="#">Forget password ?</a>
              </div>
            </div> */}
            <div className="row">
              <button type="submit" aria-disabled={loading}>Login</button>
            </div>
          </form>
          {/* <div className="row">
            <p>Or via social</p>
            <div className="social-btn-2">
              <a className="fb" href="#">
                <i className="ion-social-facebook"></i>Facebook
              </a>
              <a className="tw" href="#">
                <i className="ion-social-twitter"></i>twitter
              </a>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
}
