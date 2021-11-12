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
          <h1>Activities </h1>
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
        <CardContent>
          <h1>Designation </h1>
          <Typography
            key="des"
            sx={{ fontSize: 14 }}
            color="text.secondary"
            gutterBottom
          >
            {" "}
            {parkData?.designation}
          </Typography>
        </CardContent>
        <CardContent>
          <h1>Weather Info </h1>
          <Typography
            key="weath"
            sx={{ fontSize: 14 }}
            color="text.secondary"
            gutterBottom
          >
            {" "}
            {parkData?.weatherInfo}
          </Typography>
        </CardContent>
        <CardContent>
          <h1>Topics </h1>
          {parkData?.topics.map((val) => (
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
        {/* //{friday: "All Day"
monday: "All Day"
saturday: "All Day"
sunday: "All Day"
thursday: "All Day"
tuesday: "All Day"
wednesday: "All Day"} */}

        <CardContent>
          <Typography
            key={"wed"}
            sx={{ fontSize: 14 }}
            color="text.secondary"
            gutterBottom
          >
            Sunday: {parkData?.operatingHours.sunday}
            <br></br>
            Monday: {parkData?.operatingHours.monday}
            <br></br>
            Tuesday: {parkData?.operatingHours.tuesday}
            <br></br>
            Wednesday: {parkData?.operatingHours.wednesday}
            <br></br>
            Thursday: {parkData?.operatingHours.thursday}
            <br></br>
            Friday: {parkData?.operatingHours.friday}
            <br></br>
            Saturday: {parkData?.operatingHours.saturday}
            <br></br>
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
}

export default ParksData;
