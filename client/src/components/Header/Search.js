import { useState } from "react";

export default function Search() {
  const [search, setSearch] = useState("");

  // handlers
  const handleInputChange = (e) => {
    console.log(e.target.value);
    setSearch(e.target.value);
  };

  const handleKeypress = e => {
    //it triggers by pressing the enter key
    if (e.charCode === 13) {
      window.location.replace(`/search/${encodeURI(search)}`);
  }
};

  return (
    <div className="top-search">
      <select>
        <option value="united">Video Games</option>
      </select>
      <input
        type="search"
        value={search}
        onChange={handleInputChange}
        placeholder="Search for a game..."
        onKeyPress={handleKeypress}
      />
    </div>
  );
}