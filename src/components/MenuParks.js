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
      id: "__loading",
      name: "Loading activities...",
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
    })
      .then((response) => {
        setParks(response.data[0].parks);
        setSelectedItemParks(response.data[0].parks[0].fullName);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

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
          <MenuItem value={park.id} key={park.id}>
            {park.name}
          </MenuItem>
        ))}
      </Select>
      {selectedItemParks !== "__loading" && (
        <Webcams parkCode={selectedItemParks} />
      )}
      
    </div>
  );
}

export default ParksMenu;
