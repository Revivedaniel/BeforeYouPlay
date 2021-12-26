import styled from "styled-components";
import { Link } from "react-router-dom";

// UserPortal style
const UserPortal = styled.div`
  width: 33.33%;
  display: flex;
  justify-content: flex-end;
  div {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background-color: rgba(196, 196, 196, 1);
    margin-right: 2%;
  }
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
  return (
    <HeaderContainer>
      <Jumbotron>
        <Link to="/">Before You Play</Link>
      </Jumbotron>
      <SearchBar id="search">
        <input type="search" />
        <button>Search</button>
        <button>Feeling Lucky</button>
      </SearchBar>
      <UserPortal style={{ width: "33.33%" }}>
        <div />
      </UserPortal>
    </HeaderContainer>
  );
}
