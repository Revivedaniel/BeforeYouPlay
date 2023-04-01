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

export default function Nav(props) {
  const [state, setState] = useState(false);

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
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
        <MenuRight setLogin={props.setLogin} setSignUp={props.setSignUp}/>
      </List>
    </Box>
  );

  return (
    <nav className={css.nav}>
      <Jumbotron />
      {/* <div
        className="collapse navbar-collapse flex-parent"
        id="bs-example-navbar-collapse-1"
      >
        <MenuLeft />
        <MenuRight setLogin={setLogin} setSignUp={setSignUp}/>
      </div> */}
      <div>
        <SearchIcon fontSize="large" onClick={props.handleSearchVisable} />
        <MenuIcon fontSize="large" onClick={toggleDrawer(true)} />
      </div>
      <Drawer open={state} onClose={toggleDrawer(false)} anchor={"right"}>
        {list("sidebar")}
      </Drawer>
    </nav>
  );
}
