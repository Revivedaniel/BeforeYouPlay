import { useRef, useState } from "react";
import SearchDebounce from "./SearchDebounce";

export default function Search() {
  const [search, setSearch] = useState("");
  const [debounce, setDebounce] = useState(false);

  let debounceTimeout = useRef(null);

  const handleInputChange = (e) => {
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

  const handleKeypress = (e) => {
    //it triggers by pressing the enter key
    if (e.charCode === 13) {
      window.location.replace(`/search/${encodeURI(search)}/1`);
    }
  };

  return (
    <>
      <div className="top-search">
        {/* <select>
        <option value="united">Video Games</option>
      </select> */}
        <input
          type="search"
          value={search}
          onChange={handleInputChange}
          placeholder="Search for a game..."
          onKeyPress={handleKeypress}
        />
      </div>
      {debounce && (
        <SearchDebounce search={search} />
      )}
    </>
  );
}
