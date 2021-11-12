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
        console.log(response.data);
        setParkData(
          response.data.reduce((newData, data) => {
            newData["activities"] = data.activities.map((a) => a.name);
            newData["designation"] = data.designation;
            newData["designation"] = data.designation;
            newData["weatherInfo"] = data.weatherInfo;
            newData["operatingHours"] = data.operatingHours.map(
              (a) => a.standardHours
            )[0];
            newData["topics"] = data.topics.map((a) => a.name);

            console.log(data.designation);
            console.log(data.directionsInfo);
            console.log(data.weatherInfo);
            console.log(data.operatingHours.map((a) => a.standardHours)[0]);
            console.log(data.topics.map((a) => a.name));

            console.log(newData);
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
          {parkData.map((idx, val) => (
            <Typography
              key={idx}
              sx={{ fontSize: 14 }}
              color="text.secondary"
              gutterBottom
            >
              {parkData}
            </Typography>
          ))}
          {/* { } */}
        </CardContent>
      </Card>
    </div>
  );
}

export default ParksData;
