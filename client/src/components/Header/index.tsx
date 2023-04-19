import { useState, useEffect } from "react";
import Nav from "./Nav";
import Search from "./Search";
import css from "./index.module.css";

interface HeaderProps {
  setLogin: React.Dispatch<React.SetStateAction<boolean>>;
  setSignUp: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Header() {
  const [searchVisible, setSearchVisible] = useState(false);

  useEffect(() => {
    if (window.innerWidth > 768) {
      setSearchVisible(true);
    }
  }, []);

  const handleSearchVisible = (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
    e.preventDefault();
    setSearchVisible(!searchVisible);
  };

  return (
    <header className={css.header}>
      <Nav handleSearchVisible={handleSearchVisible} />
      {searchVisible && <Search />}
    </header>
  );
}
