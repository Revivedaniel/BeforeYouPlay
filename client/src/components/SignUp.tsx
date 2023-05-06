import { useMutation, gql } from "@apollo/client";
import { useState, ChangeEvent, FormEvent } from "react";
import Auth from "../utils/auth";
import Link from "next/link";

const ADD_USER = gql`
  mutation AddUser($email: String!, $password: String!, $username: String!) {
    addUser(email: $email, password: $password, username: $username) {
      token
    }
  }
`;

interface Props {
  setSignUp: (value: boolean) => void;
}

export default function Signup({ setSignUp }: Props) {
  const handleClose = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (e.currentTarget.classList.contains("openform")) {
      e.preventDefault();
      setSignUp(false);
    }
  };

  // creating signupForm state
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
    username: "",
  });

  // Creating addUser mutation
  const [addUser, { loading }] = useMutation(ADD_USER);

  const handleSignupSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
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

  const handleSignupChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  return (
    <div className="overlay openform" onClick={handleClose}>
      <div className="login-wrapper" id="signup-content">
        <div className="login-content">
          <Link href="/" onClick={(e) => { e.preventDefault();}} className="close">
            x
          </Link>
          <h3>sign up</h3>
          <form onSubmit={handleSignupSubmit}>
            <div className="row">
              <label htmlFor="username-2">
                Username:
                <input
                  type="text"
                  name="username"
                  id="username-2"
                  pattern="^[a-zA-Z][a-zA-Z0-9-_\.]{4,20}$"
                  required
                  value={inputs.username}
                  onChange={handleSignupChange}
                />
              </label>
            </div>

            <div className="row">
              <label htmlFor="email-2">
                your email:
                <input
                  type="text"
                  name="email"
                  id="email-2"
                  placeholder=""
                  pattern='^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$'
                  required
                  value={inputs.email}
                  onChange={handleSignupChange}
                />
              </label>
            </div>

            <div className="row">
              <label htmlFor="password-2">
                Password:
                <input
                  type="password"
                  name="password"
                  id="password-2"
                  placeholder=""
                  pattern="(?=^.{8,}$)((?=.*\d)|(?=.*\<W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$"
                  required
                  value={inputs.password}
                  onChange={handleSignupChange}
                />
              </label>
            </div>

            <div className="row">
              <label htmlFor="repassword-2">
                re-type Password:
                <input
                  type="password"
                  name="password"
                  id="repassword-2"
                  placeholder=""
                  pattern="(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$"
                  required
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

