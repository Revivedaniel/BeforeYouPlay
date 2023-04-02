import { useState } from "react";
import Nav from "./Nav";
import Search from "./Search";

interface HeaderProps {
  setLogin: React.Dispatch<React.SetStateAction<boolean>>;
  setSignUp: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Header({ setLogin, setSignUp }: HeaderProps) {
  const [searchVisible, setSearchVisible] = useState(false);

  const handleSearchVisible = (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
    e.preventDefault();
    setSearchVisible(!searchVisible);
  };

  return (
    <header>
      <Nav handleSearchVisible={handleSearchVisible} setLogin={setLogin} setSignUp={setSignUp} />
      {searchVisible && <Search />}
    </header>
  );
}
