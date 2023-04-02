import { useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import AllGames from "./AllGames";
import GamesByPlatform from "./GamesByPlatform";
import GamesWithVideos from "./GamesWithVideos";
import PropTypes from "prop-types";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps): JSX.Element {
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
          <Typography component={'div'}>{children}</Typography>
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

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function BrowseGames(): JSX.Element {
  // for MUI tabs
  const [value, setValue] = useState<number>(0);

  const handleChange = (_: React.SyntheticEvent, newValue: number): void => {
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
