import React from "react";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import "./App.css";

//Components
import { Header } from "./components/Header";

// pages
import { Homepage } from "./pages/Homepage";
import { Gamepage } from "./pages/Gamepage";

const client = new ApolloClient({
  uri: "/graphql",
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
            <Route index path="/games/:slug" element={<Gamepage />} />
          </Routes>
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
