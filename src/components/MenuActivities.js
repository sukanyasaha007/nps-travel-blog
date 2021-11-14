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

function ActivitiesMenu() {
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
    <div>
      <Box sx={{ position: "relative" }}>
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
