import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import Box from "@mui/material/Box";
import SearchIcon from "@mui/icons-material/Search";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import { useQuery } from "@apollo/client";
import { QUERY_SEARCH_GAME } from "../../utils/queries";
import { useEffect } from "react";
import { useRouter } from 'next/router'

interface SearchDebounceProps {
  search: string;
  setDebounce: React.Dispatch<React.SetStateAction<boolean>>;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
}

interface Game {
  title: string;
  gameGenerated: boolean;
}

interface SearchGameData {
  searchGame: {
    games: Game[];
  };
}

export default function SearchDebounce(props: SearchDebounceProps) {
  const router = useRouter()

  const { loading, data, error, refetch } = useQuery<SearchGameData>(QUERY_SEARCH_GAME, {
    variables: { search: props.search, page: 1 },
  });

  useEffect(() => {
    if (props.search) {
      refetch();
    }
  }, [data, refetch, props.search]);

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error</div>;
  }
  if (data?.searchGame?.games.length === 0) {
    return null;
  }
  return (
    <Box sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
      <List>
        {data ? (data.searchGame.games.slice(0, 5).map((result: Game, i: number) => {
          return (
            <ListItem key={i} disablePadding>
              <ListItemButton
                component="a"
                onClick={() => {
                  if (result.gameGenerated) {
                    router.push(`/games/${result.title}`);
                  } else {
                    router.push(`/search/${encodeURI(result.title)}`)
                    props.setSearch(result.title)
                  }
                  props.setDebounce(false);
                }}
              >
                <ListItemIcon>
                  {result.gameGenerated ? (
                    <SportsEsportsIcon />
                  ) : (
                    <SearchIcon />
                  )}
                </ListItemIcon>
                <ListItemText primary={result.title} />
              </ListItemButton>
            </ListItem>
          );
        })) : null}
      </List>
    </Box>
  );
}
