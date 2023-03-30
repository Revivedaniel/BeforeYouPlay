import { useState } from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import AllGames from "./AllGames";
import GamesByPlatform from "./GamesByPlatform";
import GamesWithVideos from "./GamesWithVideos";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function BrowseGames() {
  // for MUI tabs
  const [value, setValue] = useState(0);

  const handleChange = (_, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      <h2>Browse Games</h2>
      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab label="Games With Videos" {...a11yProps(0)} />
            <Tab label="Games By Platform" {...a11yProps(1)} />
            <Tab label="All Games" {...a11yProps(2)} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <GamesWithVideos />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <GamesByPlatform />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <AllGames />
        </TabPanel>
      </Box>
    </div>
  );
}
