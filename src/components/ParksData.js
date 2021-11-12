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
        setParkData(response.data[0].description);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [props.parkCode]);

  return (
    <div>
      <Card sx={{ minWidth: 275 }}>
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            {parkData}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
}

export default ParksData;
