import React from "react";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

// import "./App.css";
import { useEffect, useState } from "react";
import initNetworkRequest from "../services/networkService";
import Webcams from "./Webcams";
import ParksData from "./ParksData";

function ParksMenu(props) {
  // console.log(props.activityId);
  const [selectedItemParks, setSelectedItemParks] = useState("__loading");
  const [parks, setParks] = useState([
    {
      parkCode: "__loading",
      fullName: "Loading parks...",
    },
  ]);

  const onChangeHandler = (e) => {
    setSelectedItemParks(e.target.value);
  };

  useEffect(() => {
    initNetworkRequest({
      url: "https://developer.nps.gov/api/v1/activities/parks",
      queryParams: {
        activityId: props.activityId,
      },
    })
      .then((response) => {
        setParks(response.data[0].parks);
        setSelectedItemParks(response.data[0].parks[0].parkCode);
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
      {selectedItemParks !== "__loading" && (
          <ParksData parkCode={selectedItemParks} />
        ) && <Webcams parkCode={selectedItemParks} />}
    </div>
  );
}

export default ParksMenu;
