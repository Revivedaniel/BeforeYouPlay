import { Box, Tab, Tabs, Typography } from "@mui/material";
import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import Overview from "./Overview";
import Credits from "./Credits";
import RelatedGames from "./RelatedGames";
import Extras from "./Extras";
import { Game } from "./Game.model";
import css from "./InfoTabs.module.css";

interface InfoTabsProps {
  game: Game;
}

function TabPanel(props: any) {
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

export default function InfoTabs(props: InfoTabsProps) {

  // for MUI tabs
  const [value, setValue] = useState<number>(0);
  const [fontSize, setFontSize] = useState("3.04vw");
  const [width, setWidth] = useState("100vw");
  const [marginTop, setMarginTop] = useState("0px");

  const handleChange = (_: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  useEffect(() => {
    const updateFontSize = () => {
      if (window.innerWidth >= 769) {
        setFontSize("1.42vw");
        setWidth("38.4vw");
        setMarginTop("-6.3vh");
      } else {
        setFontSize("3.04vw");
        setWidth("100vw");
        setMarginTop("0px");
      }
    };

    window.addEventListener("resize", updateFontSize);
    updateFontSize(); // Set initial font size

    return () => {
      window.removeEventListener("resize", updateFontSize);
    };
  }, []);

  return (
    <>
      <Box sx={{ width: "100%", minHeight: "1000px", "& .MuiBox-root": {width} }} className={css.container}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
            sx={{marginTop, "& .MuiTabs-flexContainer": {justifyContent: "space-evenly"}, "& .Mui-selected": {color: "var(--cta-light) !important /*Important for now until I make a theme*/"}, "& .MuiTabs-indicator": {backgroundColor: "var(--cta-light)"}, "& .MuiTab-root": {textTransform: "none", fontSize, fontWeight: "bold", color: "#fff", maxWidth: "33.33vw"}}}
          >
            <Tab label="Overview" {...a11yProps(0)} />
            <Tab label="Credits" {...a11yProps(1)} />
            <Tab label="Related Games" {...a11yProps(2)} />
            <Tab label="Extras" {...a11yProps(3)} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <Overview game={props.game} />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Credits credits={props.game.credits} />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <RelatedGames relatedGames={props.game.relatedGames} />
        </TabPanel>
        <TabPanel value={value} index={3}>
          <Extras />
        </TabPanel>
      </Box>
    </>
  );
}
