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
  align-items: center;
  a {
    border-color: var(--ytd-searchbox-legacy-button-hover-border-color);
    background-color: white;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 0px;
    outline: none;
    border: 1px solid var(--ytd-searchbox-legacy-button-border-color);
    border-radius: 0px 2px 2px 0px;
    cursor: pointer;
    height: 40px;
    width: 64px;
    margin: 0px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  input {
    font-size: 14px;
    line-height: 1;
    width: 100%;
    border: none;
    color: black;
    transition: margin 300ms cubic-bezier(0.645, 0.045, 0.355, 1);
    padding: 0 1rem;
    height: 40px;
    &:focus,
    &:active {
      outline: 1px solid cyan;
    }
    &::placeholder {
      color: black;
    }
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

  return (
    <HeaderContainer>
      <Jumbotron>
        <Link to="/">Before You Play</Link>
      </Jumbotron>
      <SearchBar id="search">
        <input
          type="search"
          value={search}
          onChange={handleInputChange}
          placeholder="Search for a game..."
        />
        <Link to={`/search/${encodeURI(search)}`} style={{borderTopRightRadius: "0", borderBottomRightRadius: "0"}}>
          <svg
            viewBox="0 0 24 24"
            preserveAspectRatio="xMidYMid meet"
            focusable="false"
            style={{pointerEvents: "none", display: "block", width: "50%", height: "50%"}}
          >
            <path d="M20.87,20.17l-5.59-5.59C16.35,13.35,17,11.75,17,10c0-3.87-3.13-7-7-7s-7,3.13-7,7s3.13,7,7,7c1.75,0,3.35-0.65,4.58-1.71 l5.59,5.59L20.87,20.17z M10,16c-3.31,0-6-2.69-6-6s2.69-6,6-6s6,2.69,6,6S13.31,16,10,16z"></path>
          </svg>
        </Link>
        <Link to={`/games/${search.replace(/\s+/g, "-").toLowerCase()}`}>
          777
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
            >
              Logout
            </Link>
          </div>
        )}
      </UserPortal>
    </HeaderContainer>
  );
}
