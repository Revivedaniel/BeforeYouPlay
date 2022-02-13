import React from "react";
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from "@apollo/client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { setContext } from '@apollo/client/link/context';

import "./App.css";

//Components
import Header from "./components/Header";
import Footer from "./components/Footer";

// pages
import Index from './pages/Index'
import { Gamepage } from "./pages/Gamepage";
import { Searchpage } from "./pages/Searchpage";
import { SignIn } from "./pages/SignIn";
import Login from "./components/Login";
import { useState } from "react";
import Signup from "./components/SignUp";

const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
      headers: {
          ...headers,
          authorization: token ? `Bearer ${token}` : '',
      },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  const [login, setLogin] = useState(false);
  const [signUp, setSignUp] = useState(false);
  return (
    <ApolloProvider client={client}>
      <Router>
        <Header setLogin={setLogin} setSignUp={setSignUp}/>
        {login && (
          <Login setLogin={setLogin}/>
        )}
        {signUp && (
          <Signup setSignUp={setSignUp}/>
        )}
        <div id="mainContainer">
          <Routes>
            <Route index path="/" element={<Index />} />
            <Route path="/games/:slug" element={<Gamepage />} />
            <Route path="/search/:search" element={<Searchpage />} />
            <Route path="/search/:search/:page" element={<Searchpage />} />
            <Route path="/SignIn" element={<SignIn />} />
            <Route path="/:page" element={<Index />} />
          </Routes>
        </div>
        <Footer />
      </Router>
    </ApolloProvider>
  );
}

export default App;
