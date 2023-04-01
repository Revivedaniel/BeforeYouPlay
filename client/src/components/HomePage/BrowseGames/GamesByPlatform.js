import { useQuery } from "@apollo/client";
import { Autocomplete, TextField } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { QUERY_ALL_PLATFORMS, QUERY_GAME_BY_PLATFORM } from "../../../utils/queries";
import ScrollLoadGames from "../../shared/ScrollLoadGames";
import css from "./GamesByPlatform.module.css";

export default function GamesByPlatform() {
  const [platform, setPlatform] = useState(null);
  const [debounce, setDebounce] = useState(false);

  const { loading, data, error } = useQuery(QUERY_ALL_PLATFORMS);

  const handleInputChange = (newValue) => {
    setPlatform(null)
    if (platform) {
      setDebounce(false);
      setTimeout(() => {
        setPlatform(newValue);
      }, 500);
    } else {
      setPlatform(newValue);
    }
    setDebounce(true);
  };

  return (
    <div className={css.div}>
      {loading && <p>Loading...</p>}
      {data && (
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={[...data.allPlatforms, "Select A Platform"]}
          sx={{ width: "100%" }}
          renderInput={(params) => <TextField {...params} label="Platform" />}
          value={platform || "Select A Platform"}
          onChange={(event, newValue) => {
            if (newValue) {
              handleInputChange(newValue);
            }
          }}
          inputValue={platform || "Select A Platform"}
          onInputChange={(event, newInputValue) => {
            handleInputChange(newInputValue);
          }}
        />
      )}
      {debounce && platform && platform !== "Select A Platform" && (
        <ScrollLoadGames query={QUERY_GAME_BY_PLATFORM} variables={{platform: platform}} />
      )}
    </div>
  );
}
