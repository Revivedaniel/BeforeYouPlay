import React from "react";
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from "@apollo/client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { setContext } from '@apollo/client/link/context';

import "./App.css";

//Components
import { Header } from "./components/Header";

// pages
import { Homepage } from "./pages/Homepage";
import { Gamepage } from "./pages/Gamepage";
import { Searchpage } from "./pages/Searchpage";
import { Login } from "./pages/Login";

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
  return (
    <ApolloProvider client={client}>
      <Router>
        <Header />
        <div id="mainContainer">
          <Routes>
            <Route index path="/" element={<Homepage />} />
            <Route path="/games/:slug" element={<Gamepage />} />
            <Route path="/search/:search" element={<Searchpage />} />
            <Route path="/search/:search/:page" element={<Searchpage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/:page" element={<Homepage />} />
          </Routes>
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
