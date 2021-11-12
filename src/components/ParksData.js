import React from "react";

import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";

// import "./App.css";
import { useEffect, useState } from "react";
import initNetworkRequest from "../services/networkService";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
// import Box from "@mui/material/Box";

function ParksData(props) {
  const [parkData, setParkData] = useState([]);

  useEffect(() => {
    initNetworkRequest({
      url: "https://developer.nps.gov/api/v1/parks",
      queryParams: {
        parkCode: props.parkCode,
      },
    })
      .then((response) => {
        console.log(response.data[0].description);
        setParkData(
          response.data.reduce((newData, data) => {
            console.log(data.activities.map((a) => a.name));
            console.log(data.designation);
            console.log(data.directionsInfo);
            console.log(data.weatherInfo);
            console.log(data.operatingHours.map((a) => a.standardHours)[0]);
            console.log(data.topics.map((a) => a.name));

            newData.push(
              (data.activities.map((a) => a.name),
              data.designation,
              data.directionsInfo,
              data.weatherInfo,
              data.operatingHours.map((a) => a.standardHours)[0],
              data.topics.map((a) => a.name))
            );
            return newData;
          }, [])
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }, [props.parkCode]);

  return (
    <div>
      <Card sx={{ minWidth: 275 }}>
        <CardContent>
          {parkData.map((data, idx) => (
            <Typography
              key={idx}
              sx={{ fontSize: 14 }}
              color="text.secondary"
              gutterBottom
            >
              {data}
            </Typography>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}

export default ParksData;
