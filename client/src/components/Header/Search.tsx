import { useRef, useState } from "react";
import SearchDebounce from "./SearchDebounce";
import { useRouter } from 'next/router'

export default function Search() {
  const [search, setSearch] = useState<string>("");
  const [debounce, setDebounce] = useState<boolean>(false);

  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);
  const router = useRouter()

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
      router.push(`/search/${encodeURI(search)}`);
      setDebounce(false);
    }
  };

  return (
    <>
      <div className="top-search">
        <input
          type="search"
          value={search}
          onChange={handleInputChange}
          placeholder="Search for a game..."
          onKeyPress={handleKeypress}
        />
      </div>
      {debounce && search !== "" && <SearchDebounce search={search} setDebounce={setDebounce} setSearch={setSearch} />}
    </>
  );
}
