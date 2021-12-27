import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN, ADD_USER } from '../utils/mutations';
import Auth from '../utils/auth';

export function Login(props) {
    // creating loginForm state
    const [loginFormState, setLoginFormState] = useState({ email: '', password: '' });
    // creating signupForm state
    const [signupFormState, setSignupFormState] = useState({ email: '', password: '' });
    // Creating login mutation
    const [login, { error }] = useMutation(LOGIN);
    // Creating addUser mutation
    const [addUser] = useMutation(ADD_USER);

    const handleLoginSubmit = async (event) => {
        event.preventDefault();
        try {
            const mutationResponse = await login({
                variables: { email: loginFormState.email, password: loginFormState.password },
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
            console.log(err)
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
        <div className="enrollcontainer">
            <form onSubmit={handleLoginSubmit} className='loginContainer'>
                <h2>Login</h2>
                <label htmlFor="login-email">Email address:</label>
                <input
                    placeholder="youremail@test.com"
                    name="email"
                    type="email"
                    id="login-email"
                    onChange={handleLoginChange}
                />
                <label htmlFor="login-pwd">Password:</label>
                <input
                    placeholder="******"
                    name="password"
                    type="password"
                    id="login-pwd"
                    onChange={handleLoginChange}
                />
                {error ? (
                    <p className="error-text">The provided credentials are incorrect</p>
                ) : null}
                <button className='submitBtn' type="submit">Submit</button>
            </form>

            <form onSubmit={handleSignupSubmit} className='loginContainer' >
                <h2>Signup</h2>
                <label htmlFor="username">Username:</label>
                <input
                    placeholder="Username"
                    name="username"
                    type="username"
                    id="username"
                    onChange={handleSignupChange}
                />
                <label htmlFor="signup-email">Email:</label>
                <input
                    placeholder="youremail@email.com"
                    name="email"
                    type="email"
                    id="signup-email"
                    onChange={handleSignupChange}
                />
                <label htmlFor="login-pwd">Password:</label>
                <input
                    placeholder="*********"
                    name="password"
                    type="password"
                    id="signup-pwd"
                    onChange={handleSignupChange}
                />
                <button className='submitBtn' type="submit">Submit</button>
            </form>
        </div>
    );
}