import React from "react";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

import Box from "@material-ui/core/Box";
// import "./App.css";
import { useEffect, useState } from "react";
import initNetworkRequest from "../services/networkService";
// import ParksMenu from "./MenuParks";
// import GetactivityId from "./MenuParks";
import ParksMenu from "./MenuParks";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  activityStyle: {
    position: "absolute",
    top: 28,
    right: 0,
    left: 0,
    zIndex: 1,
    color: "#fff",
    border: "1px solid",
    p: 1,
    bgcolor: "background.paper",
  },
  blogTitle: {
    fontWeight: 80,
    paddingBottom: theme.spacing(3),
    color: "#000",
    // position: "center",
    fontSize: "40px",
  },
  blogLines: {
    fontWeight: 50,
    paddingBottom: theme.spacing(3),
    color: "#000",
    // position: "center",
    fontSize: "20px",
  },
}));

function ActivitiesMenu() {
  const classes = useStyles();

  const [selectedItem, setSelectedItem] = useState("__loading");
  const [activities, setActivities] = useState([
    {
      id: "__loading",
      name: "Loading activities...",
    },
  ]);

  const onChangeHandler = (e) => {
    setSelectedItem(e.target.value);
    // console.log("selectedItem", selectedItem);
    // GetactivityId(selectedItem);
  };

  useEffect(() => {
    initNetworkRequest({
      url: "https://developer.nps.gov/api/v1/activities",
    })
      .then((response) => {
        setActivities(response.data);
        setSelectedItem(response.data[0].id);

        // console.log(response.data[0].id);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // const MenuActivities = (selectedItem) =>{
  return (
    <div style={{ padding: 10 }}>
      <Box sx={classes.activityStyle}>
        <p className={classes.blogLines}>
          Learn and Explore Since 1916, the National Park Service has been
          entrusted with the care of our national parks. With the help of
          volunteers and partners, we safeguard these special places and share
          their stories with more than 318 million visitors every year. But our
          work doesn't stop there. We are proud that tribes, local governments,
          nonprofit organizations, businesses, and individual citizens ask for
          our help in revitalizing their communities, preserving local history,
          celebrating local heritage, and creating close-to-home opportunities
          for kids and families to get outside, be active, and have fun. Taking
          care of the national parks and helping Americans take care of their
          communities is a job we love, and we need—and welcome—your help and
          support.
        </p>
        <h1 className={classes.blogTitle}>Our Mission</h1>
        <p className={classes.blogLines}>
          The National Park Service preserves unimpaired the natural and
          cultural resources and values of the National Park System for the
          enjoyment, education, and inspiration of this and future generations.
          The Park Service cooperates with partners to extend the benefits of
          natural and cultural resource conservation and outdoor recreation
          throughout this country and the world.
        </p>
        <p className={classes.blogLines}>
          In this virtual park you can select any of the activities listed
          below-
        </p>
        <h3 className={classes.blogTitle}>Choose an activity</h3>
        <p className={classes.blogLines}>
          Welcome to PEPC Welcome to the National Park Service's Planning,
          Environment and Public Comment (PEPC) site! The National Park Service
          prepares a variety of planning and environmental documents to help
          guide management of parks. This site provides for public involvement
          in the NPS parks.
        </p>
        <Select
          labelId="select-label"
          id="simple-select"
          value={selectedItem}
          label="Activities"
          onChange={onChangeHandler}
        >
          {activities.map((activity) => (
            <MenuItem value={activity.id} key={activity.id}>
              {activity.name}
            </MenuItem>
          ))}
        </Select>
        {selectedItem !== "__loading" && (
          <ParksMenu activityId={selectedItem} />
        )}
      </Box>
    </div>
  );
}

export default ActivitiesMenu;
