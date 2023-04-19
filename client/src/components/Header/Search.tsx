import { useRef, useState, useEffect } from "react";
import SearchDebounce from "./SearchDebounce";
import { useRouter } from 'next/router'
import css from "./Search.module.css";

export default function Search() {
  const [search, setSearch] = useState<string>("");
  const [debounce, setDebounce] = useState<boolean>(false);
  
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);
  const router = useRouter()
  const searchRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDebounce(false);
    setSearch(e.target.value);
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }
    debounceTimeout.current = setTimeout(async () => {
      if (e.target.value !== "") {
        setDebounce(false);
        setDebounce(true);
      } else {
        setDebounce(false);
      }
    }, 500);
  };

  const handleKeypress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    //it triggers by pressing the enter key
    if (e.charCode === 13) {
      setDebounce(false);
      setSearch("")
      router.push(`/search/${encodeURI(search)}`);
    }
  };

  useEffect(() => {
    searchRef.current?.focus();
  }, []);

  return (
    <>
      <div className={css.topSearch}>
        <input
          type="search"
          value={search}
          onChange={handleInputChange}
          placeholder="Search for a game..."
          onKeyPress={handleKeypress}
          ref={searchRef}
        />
      </div>
      {debounce && search !== "" && <SearchDebounce search={search} setDebounce={setDebounce} setSearch={setSearch} />}
    </>
  );
}
