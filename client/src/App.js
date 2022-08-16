import React, { useEffect } from "react";
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from "@apollo/client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { setContext } from '@apollo/client/link/context';

import "./App.css";

//Components
import Header from "./components/Header";
import Footer from "./components/Footer";

// pages
import Index from './pages/Index'
import Gamepage from "./pages/Gamepage";
import { Searchpage } from "./pages/Searchpage";
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

  useEffect(() => {
    document.title = "Before You Play";
  })

  const [login, setLogin] = useState(false);
  const [signUp, setSignUp] = useState(false);
  const [gameTitle, setGameTitle] = useState('');
  const [gameImage, setGameImage] = useState('');
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
            <Route index path="/" element={<Index gameTitle={gameTitle} setGameTitle={setGameTitle}/>} />
            <Route path="/games/:slug" element={<Gamepage setLogin={setLogin} gameTitle={gameTitle} setGameTitle={setGameTitle} gameImage={gameImage}/>} />
            <Route path="/search/:search" element={<Searchpage gameTitle={gameTitle} setGameTitle={setGameTitle} setGameImage={setGameImage} />} />
            <Route path="/search/:search/:page" element={<Searchpage gameTitle={gameTitle} setGameTitle={setGameTitle} setGameImage={setGameImage} />} />
            <Route path="/:page" element={<Index gameTitle={gameTitle} setGameTitle={setGameTitle}/>} />
          </Routes>
        </div>
        <Footer />
      </Router>
    </ApolloProvider>
  );
}

export default App;
