import { useMutation } from "@apollo/client";
import { useState } from "react";
import Auth from "../utils/auth";
import { ADD_USER } from "../utils/mutations";

export default function Signup({ setSignUp }) {
  let handleClose = (e) => {
    if (e.target.classList.contains("openform")) {
      e.preventDefault();
      setSignUp(false);
    }
  };

  // creating signupForm state
  const [inputs, setinputs] = useState({
    email: "",
    password: "",
    username: "",
  });
  // Creating addUser mutation
  const [addUser, {error, loading}] = useMutation(ADD_USER);

  const handleSignupSubmit = async (event) => {
    event.preventDefault();
    console.log("///////////////////////Submitted/////////////////////////////");
    try {
      const mutationResponse = await addUser({
        variables: {
          email: inputs.email,
          password: inputs.password,
          username: inputs.username,
        },
      });
      const token = mutationResponse.data.addUser.token;
      Auth.login(token);
    } catch (err) {
      console.log(err);
    }
  };


  const handleSignupChange = (event) => {
    const { name, value } = event.target;
    setinputs({
      ...inputs,
      [name]: value,
    });
  };

  return (
    <div className="overlay openform" onClick={handleClose}>
      <div className="login-wrapper" id="signup-content">
        <div className="login-content">
          <a href="#" className="close">
            x
          </a>
          <h3>sign up</h3>
          <form onSubmit={handleSignupSubmit}>
            <div className="row">
              <label for="username-2">
                Username:
                <input
                  type="text"
                  name="username"
                  id="username-2"
                  pattern="^[a-zA-Z][a-zA-Z0-9-_\.]{4,20}$"
                  required="required"
                  value={inputs.username}
                  onChange={handleSignupChange}
                />
              </label>
            </div>

            <div className="row">
              <label for="email-2">
                your email:
                <input
                  type="text"
                  name="email"
                  id="email-2"
                  placeholder=""
                  pattern='^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$'
                  required="required"
                  value={inputs.email}
                  onChange={handleSignupChange}
                />
              </label>
            </div>
            <div className="row">
              <label for="password-2">
                Password:
                <input
                  type="password"
                  name="password"
                  id="password-2"
                  placeholder=""
                  pattern="(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$"
                  required="required"
                  value={inputs.password}
                  onChange={handleSignupChange}
                />
              </label>
            </div>
            <div className="row">
              <label for="repassword-2">
                re-type Password:
                <input
                  type="password"
                  name="password"
                  id="repassword-2"
                  placeholder=""
                  pattern="(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$"
                  required="required"
                />
              </label>
            </div>
            <div className="row">
              <button type="submit" aria-disabled={loading}>sign up</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
