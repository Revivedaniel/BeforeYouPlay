import { useQuery, QueryResult } from "@apollo/client";
import {
  Autocomplete,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Skeleton
} from "@mui/material";
import { useEffect, useRef, useState } from "react";
import {
  QUERY_ALL_PLATFORMS,
  QUERY_GAME_BY_PLATFORM,
} from "../../../utils/queries";
import ScrollLoadGames from "../../shared/ScrollLoadGames";
import css from "./GamesByPlatform.module.css";

export default function GamesByPlatform(): JSX.Element {
  const [platform, setPlatform] = useState<string>("");
  const [debounce, setDebounce] = useState<boolean>(false);

  const { loading, data }: QueryResult = useQuery(QUERY_ALL_PLATFORMS);

  const handleInputChange = (event: SelectChangeEvent): void => {
    setPlatform("");
    if (platform) {
      setDebounce(false);
      setTimeout(() => {
        setPlatform(event.target.value as string);
      }, 500);
    } else {
      setPlatform(event.target.value as string);
    }
    setDebounce(true);
  };

  return (
    <div className={css.div}>
      {loading && <>
      <InputLabel id="platformSelectLabel">Please Wait...</InputLabel>
        <Skeleton style={{ width: "100%", height: "12.2vh", backgroundColor: "#fff" }} />
      </>}
      {data && (
        <>
          <InputLabel id="platformSelectLabel">Select A Platform</InputLabel>
          <Select
            labelId="platformSelectLabel"
            sx={{ width: "100%", backgroundColor: "white", fontSize: "2rem", color: "var(--primary-dark)" }}
            label="Select A Platform"
            value={platform || "Select A Platform"}
            onChange={handleInputChange}
          >
            {data.allPlatforms.map((platform: string) => (
              <MenuItem key={platform} value={platform}>
                {platform}
              </MenuItem>
            ))}
          </Select>
        </>
      )}
      {debounce && platform && platform !== "Select A Platform" && (
        <ScrollLoadGames
          query={QUERY_GAME_BY_PLATFORM}
          variables={{ platform: platform }}
        />
      )}
    </div>
  );
}
