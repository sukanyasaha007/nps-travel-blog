import React from "react";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

// import "./App.css";
import { useEffect, useState } from "react";
import initNetworkRequest from "../services/networkService";

// let activityId = function GetactivityId(a) {
//   return a;
// };

function ParksMenu(props) {
  console.log(props.activityId);
  const [selectedItemParks, setSelectedItemParks] = useState("__loading");
  const [parks, setParks] = useState([
    {
      parkCode: "__loading",
      fullName: "Loading parks...",
    },
  ]);

  const onChangeHandler = (e) => {
    // console.log(response.data[0].parks[0].fullName);
    setSelectedItemParks(e.target.value);
    // console.log("activityID", props.activityId, props);
  };

  useEffect(() => {
    initNetworkRequest({
      url: "https://developer.nps.gov/api/v1/activities/parks",
      queryParams: {
        activityId: props.activityId,
      },
      //   activityID: activityID,
    })
      .then((response) => {
        setParks(response.data[0].parks);
        setSelectedItemParks(response.data[0].parks[0].parkCode);

        // console.log(parks);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [props.activityId]);

  return (
    <div>
      <Select
        labelId="select-label"
        id="simple-select"
        value={selectedItemParks}
        label="Parks"
        onChange={onChangeHandler}
      >
        {parks.map((park) => (
          <MenuItem value={park.parkCode} key={park.parkCode}>
            {park.fullName}
          </MenuItem>
        ))}
      </Select>
    </div>
  );
}

export default ParksMenu;
