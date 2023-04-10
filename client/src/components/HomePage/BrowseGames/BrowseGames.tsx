import { useEffect, useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import AllGames from "./AllGames";
import GamesByPlatform from "./GamesByPlatform";
import GamesWithVideos from "./GamesWithVideos";
import PropTypes from "prop-types";
import css from "./BrowseGames.module.css";

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
  const [fontSize, setFontSize] = useState("3.04vw");

  const handleChange = (_: React.SyntheticEvent, newValue: number): void => {
    setValue(newValue);
  };

  useEffect(() => {
    const updateFontSize = () => {
      if (window.innerWidth >= 769) {
        setFontSize("2.04vw");
      } else {
        setFontSize("3.04vw");
      }
    };

    window.addEventListener("resize", updateFontSize);
    updateFontSize(); // Set initial font size

    return () => {
      window.removeEventListener("resize", updateFontSize);
    };
  }, []);

  return (
    <div className={css.container}>
      <h2>Browse</h2>
      <Box sx={{ width: "100%"}} className={css.box}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
            sx={{"& .MuiTabs-flexContainer": {justifyContent: "space-evenly"}, "& .Mui-selected": {color: "var(--cta-light) !important /*Important for now until I make a theme*/"}, "& .MuiTabs-indicator": {backgroundColor: "var(--cta-light)"}, "& .MuiTab-root": {textTransform: "none", fontSize, fontWeight: "bold", color: "#fff", maxWidth: "33.33vw"}}}
            className={css.tab}
          >
            <Tab label="Games With Videos" {...a11yProps(0)} sx={{color: "#fff"}} />
            <Tab label="Games By Platform" {...a11yProps(1)} sx={{color: "#fff"}} />
            <Tab label="All Games" {...a11yProps(2)} sx={{color: "#fff"}} />
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
