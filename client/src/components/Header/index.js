import { useState } from "react";
import Nav from "./Nav";
import Search from "./Search";
export default function Header({ setLogin, setSignUp }) {
  
  const [searchVisable, setSearchVisable] = useState(false);

  const handleSearchVisable = (e) => {
    e.preventDefault();
    setSearchVisable(!searchVisable);
  };

  return (
    <header>
      <Nav handleSearchVisable={handleSearchVisable} setLogin={setLogin} setSignUp={setSignUp} />
      {searchVisable && <Search />}
    </header>
  );
}
