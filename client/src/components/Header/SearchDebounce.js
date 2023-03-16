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

export default function SearchDebounce(props) {
  const { loading, data, error } = useQuery(QUERY_SEARCH_GAME, {
    variables: { search: props.search, page: 1 },
  });
  if (data) {
    console.log(data);
  }
  console.log(props.search);
  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error</div>;
  }
  return (
    <Box sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
      <List>
        {data.searchGame.games.slice(0, 5).map((result, i) => {
          return (
            <ListItem key={i} disablePadding>
              <ListItemButton
                component="a"
                href={
                  result.gameGenerated
                    ? `/games/${result.title}`
                    : `/search/${encodeURI(result.title)}/1`
                }
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
        })}
      </List>
    </Box>
  );
}
