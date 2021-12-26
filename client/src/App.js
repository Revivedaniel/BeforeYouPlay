import React from "react";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import "./App.css";

//Components
import { Header } from "./components/Header";

// pages
import { Homepage } from "./pages/Homepage";
import { Gamepage } from "./pages/Gamepage";
import { Searchpage } from "./pages/Searchpage";

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
            <Route path="/games/:slug" element={<Gamepage />} />
            <Route path="/search/:slug" element={<Searchpage />} />
          </Routes>
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
