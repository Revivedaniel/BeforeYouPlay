import styled from "styled-components";
import { Link } from "react-router-dom";
import { useState } from "react";
import Auth from "../utils/auth";

// UserPortal style
const UserPortal = styled.div`
  width: 33.33%;
  display: flex;
  justify-content: flex-end;
  /* div {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background-color: rgba(196, 196, 196, 1);
    margin-right: 2%;
  } */
`;

// Jumbotron
const Jumbotron = styled.h1`
  width: 33.33%;
  a {
    text-decoration: none;
    font-family: Roboto;
    font-style: normal;
    font-weight: normal;
    font-size: 46px;
    line-height: 54px;
    display: flex;
    align-items: center;
    text-align: center;
    color: white;
  }
`;

// SearchBar style
const SearchBar = styled.span`
  width: 33.33%;
  height: 50px;
  display: flex;
  input {
    width: 75%;
  }
`;

// HeaderContainer
const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  height: 100px;
  align-items: center;
  background-color: rgba(232, 45, 45, 1);
`;

export function Header() {
  const [search, setSearch] = useState("");

  // handlers
  const handleInputChange = (e) => {
    setSearch(e.target.value);
  };
  const handleDropDown = (e) => {
    
  }

  return (
    <HeaderContainer>
      <Jumbotron>
        <Link to="/">Before You Play</Link>
      </Jumbotron>
      <SearchBar id="search">
        <input type="search" value={search} onChange={handleInputChange} />
        <Link to={`/search/${encodeURI(search)}`}>Search</Link>
        <Link to={`/games/${search.replace(/\s+/g, "-").toLowerCase()}`}>
          Feeling Lucky
        </Link>
      </SearchBar>
      <UserPortal>
        {!Auth.loggedIn() ? (
          <Link
            id="login"
            to="/login"
            style={{ textDecoration: "none", fontSize: "2rem" }}
          >
            Login
          </Link>
        ) : (
          <div>
            <Link
              id="logout"
              to="/"
              onClick={() => Auth.logout()}
              style={{ textDecoration: "none", fontSize: "2rem" }}
            >Logout</Link>
          </div>
        )}
      </UserPortal>
    </HeaderContainer>
  );
}
