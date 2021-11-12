import React from "react";

import Card from "@mui/material/Card";

// import "./App.css";
import { useEffect, useState } from "react";
import initNetworkRequest from "../services/networkService";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
// import Box from "@mui/material/Box";

function ParksData(props) {
  const [parkData, setParkData] = useState();

  useEffect(() => {
    initNetworkRequest({
      url: "https://developer.nps.gov/api/v1/parks",
      queryParams: {
        parkCode: props.parkCode,
      },
    })
      .then((response) => {
        const [data] = response.data;
        setParkData({
          activities: data.activities.map((a) => a.name),
          designation: data.designation,
          weatherInfo: data.weatherInfo,
          operatingHours: data.operatingHours.map((a) => a.standardHours)[0],
          topics: data.topics.map((a) => a.name),
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, [props.parkCode]);

  return (
    <div>
      <Card sx={{ minWidth: 275 }}>
        <CardContent>
          {parkData?.activities.map((val) => (
            <Typography
              key={val}
              sx={{ fontSize: 14 }}
              color="text.secondary"
              gutterBottom
            >
              {val}
            </Typography>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}

export default ParksData;
