import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { LOGIN, ADD_USER } from "../utils/mutations";
import Auth from "../utils/auth";
import Error from "../components/ErrorMessage";

export function Login(props) {
  // creating loginForm state
  const [loginFormState, setLoginFormState] = useState({
    email: "",
    password: "",
  });
  // creating signupForm state
  const [signupFormState, setSignupFormState] = useState({
    email: "",
    password: "",
  });
  // Creating login mutation
  const [login, { error, loading }] = useMutation(LOGIN);
  // Creating addUser mutation
  const [addUser, {error:newUserError, loading:newUserLoading}] = useMutation(ADD_USER);

  const handleLoginSubmit = async (event) => {
    event.preventDefault();
    try {
      const mutationResponse = await login({
        variables: {
          email: loginFormState.email,
          password: loginFormState.password,
        },
      });
      const token = mutationResponse.data.login.token;
      Auth.login(token);
    } catch (e) {
      console.log(e);
    }
  };

  const handleSignupSubmit = async (event) => {
    event.preventDefault();

    try {
      const mutationResponse = await addUser({
        variables: {
          email: signupFormState.email,
          password: signupFormState.password,
          username: signupFormState.username,
        },
      });
      const token = mutationResponse.data.addUser.token;
      Auth.login(token);
    } catch (err) {
      console.log(err);
    }
  };

  const handleLoginChange = (event) => {
    const { name, value } = event.target;
    setLoginFormState({
      ...loginFormState,
      [name]: value,
    });
  };

  const handleSignupChange = (event) => {
    const { name, value } = event.target;
    setSignupFormState({
      ...signupFormState,
      [name]: value,
    });
  };

  return (
    <>
      <div class="row" id="loginPage">
        <div class="login-card" id="login-card">
          <h2 id="logInHeader">Login</h2>
          <Error error={error} />
          <form
            class="form login-form"
            id="login-form"
            onSubmit={handleLoginSubmit}
          >
            <div class="form-group">
              <label for="email-login">Email:</label>
              <input
                class="form-input"
                type="text"
                id="email-login"
                name="email"
                onChange={handleLoginChange}
                />
              <p class="signupHints" id="loginHintEmail">
                example@email.com
              </p>
            </div>
            <div class="form-group">
              <label for="password-login">Password:</label>
              <input
                class="form-input"
                type="password"
                id="password-login"
                name="password"
                onChange={handleLoginChange}
                />
                {error ? (
                  <p className="error-text">
                    The provided credentials are incorrect
                  </p>
                ) : null}
            </div>
            <div class="form-group">
              <button class="btn btn-primary" type="submit" id="login">
                Login
              </button>
            </div>
          </form>
        </div>
        <div class="login-card">
          <h2 id="signUp">Sign Up</h2>
          <Error error={newUserError} />
          <form
            class="form signup-form"
            id="signup-form"
            onSubmit={handleSignupSubmit}
          >
            <div class="form-group">
              <label for="name-signup">Name:</label>
              <input
                class="form-input"
                type="text"
                id="name-signup"
                name="username"
                onChange={handleSignupChange}
              />
              <p class="signupHints" id="signupHintName">
                Name must be Alphanumeric (a-zA-Z0-9) Min 4 characters
              </p>
            </div>
            <div class="form-group">
              <label for="email-signup">Email:</label>
              <input
                class="form-input"
                type="text"
                id="email-signup"
                name="email"
                onChange={handleSignupChange}
              />
              <p class="signupHints" id="signupHintEmail">
                example@email.com
              </p>
            </div>
            <div class="form-group">
              <label for="password-signup">Password:</label>
              <input
                class="form-input"
                type="password"
                id="password-signup"
                name="password"
                onChange={handleSignupChange}
              />
              <ul class="signupHints" id="signupHintPassword">
                <li>1 lowercase character</li>
                <li>1 uppercase character</li>
                <li>1 special character</li>
                <li>1 number</li>
                <li>8 characters minimum</li>
              </ul>
            </div>
            <div class="form-group">
              <button
                class="btn btn-primary"
                type="submit"
                id="sign_up"
                aria-disabled={newUserLoading}
              >
                Signup
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
