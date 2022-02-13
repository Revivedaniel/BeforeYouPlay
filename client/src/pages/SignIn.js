import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { LOGIN, ADD_USER } from "../utils/mutations";
import Auth from "../utils/auth";
import Error from "../components/ErrorMessage";
import Login from "../components/Login";
import Signup from "../components/SignUp";

export function SignIn(props) {
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
      <Login />
      <Signup />
    </>
  );
}
