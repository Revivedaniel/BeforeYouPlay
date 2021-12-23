import React from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

import logo from "./logo.svg";
import "./App.css";

//Components
import { Header } from "./components/Header";

// pages
import { Homepage } from "./pages/Homepage";
import Gamepage from "./pages/Gamepage";

const client = new ApolloClient({
  uri: '/graphql',
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Header />
      <Homepage />
    </ApolloProvider>
  );
}

export default App;
