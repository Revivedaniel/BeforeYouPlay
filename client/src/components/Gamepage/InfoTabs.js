import { Box, Tab, Tabs, Typography } from "@mui/material";
import PropTypes from "prop-types";
import { useState } from "react";
import Overview from "./Overview";
import Credits from "./Credits";
import RelatedGames from "./RelatedGames";
import Extras from "./Extras";

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

export default function InfoTabs(props) {

  // for MUI tabs
  const [value, setValue] = useState(0);

  const handleChange = (_, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
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
