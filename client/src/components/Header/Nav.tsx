import Jumbotron from "./Jumbotron";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import css from "./Nav.module.css";
import {
  Box,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { useState } from "react";
import MenuRight from "./MenuRight";

interface NavProps {
  handleSearchVisible: (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => void;
  setLogin: React.Dispatch<React.SetStateAction<boolean>>;
  setSignUp: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Nav(props: NavProps) {
  const [state, setState] = useState(false);

  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }

      setState(open);
    };

  const list = () => (
    <Box
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        {["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        <MenuRight setLogin={props.setLogin} setSignUp={props.setSignUp} />
      </List>
    </Box>
  );

  return (
    <nav className={css.nav}>
      <Jumbotron />
      <div>
        <SearchIcon fontSize="large" onClick={props.handleSearchVisible} />
        <MenuIcon fontSize="large" onClick={toggleDrawer(true)} />
      </div>
      <Drawer open={state} onClose={toggleDrawer(false)} anchor={"right"}>
        {list()}
      </Drawer>
    </nav>
  );
}
