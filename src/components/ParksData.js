import React from "react";

import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";

// import "./App.css";
import { useEffect, useState } from "react";
import initNetworkRequest from "../services/networkService";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import Box from "@mui/material/Box";

function ParksData(props) {
      // console.log(props.activityId);
  const [selectedItemParkData, setSelectedItemParkData] = useState("__loading");
  const [parkData, setParkData] = useState([
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
  let urls = [];
  useEffect(() => {
    initNetworkRequest({
      url: "https://developer.nps.gov/api/v1/parks",
      queryParams: {
        parkCode: props.parkCode,
      },
      //   activityID: activityID,
    })
      .then((response) => {
        console.log(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const bull = (
    <Box
      component="span"
      sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
    >
      •
    </Box>
  );
  return (
    <div>
      <Card sx={{ minWidth: 275 }}>
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            Word of the Day
          </Typography>
          <Typography variant="h5" component="div">
            be{bull}nev{bull}o{bull}lent
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            adjective
          </Typography>
          <Typography variant="body2">
            well meaning and kindly.
            <br />
            {'"a benevolent smile"'}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
}

export default ParksData;
