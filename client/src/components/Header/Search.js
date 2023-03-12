import { useEffect, useRef, useState } from "react";
import { List, ListItem, ListItemButton, ListItemText } from "@mui/material";
import Box from "@mui/material/Box";

export default function Search() {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState(null);

  let debounceTimeout = useRef(null);

  // handlers
  const handleInputChange = (e) => {
    setSearch(e.target.value);
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }
    debounceTimeout.current = setTimeout(async () => {
      console.log("searching for: ", e.target.value);
      if (e.target.value !== "") {
        const results = await fetch(
          `https://vgi-api-test.azurewebsites.net/game-titles/search?q=${e.target.value}`
        );
        if (results.status === 204) {
          setResults(null);
        } else {
          const data = await results.json();
          setResults(data.slice(0, 5));
        }
      } else {
        setResults(null);
      }
    }, 500);
  };

  const handleKeypress = (e) => {
    //it triggers by pressing the enter key
    if (e.charCode === 13) {
      window.location.replace(`/search/${encodeURI(search)}/1`);
    }
  };

  useEffect(() => {});

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
      { results && (
        <Box sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
        <List>
          {results.map((result) => {
            return (
              <ListItem key={result.id} disablePadding>
                <ListItemButton component="a" href={`/search/${encodeURI(result.title)}/1`}>
                  <ListItemText primary={result.title} />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </Box>
      )}
    </>
  );
}
