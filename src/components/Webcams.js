import React from "react";

import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";

// import "./App.css";
import { useEffect, useState } from "react";
import initNetworkRequest from "../services/networkService";
// import ParksData from "./ParksData";

function Webcams(props) {
  const [images, setImages] = useState([]);

  useEffect(() => {
    initNetworkRequest({
      url: "https://developer.nps.gov/api/v1/webcams",
      queryParams: {
        parkCode: props.parkCode,
      },
    })
      .then((response) => {
        setImages(
          response.data.reduce((acc, webcamData) => {
            // console.log(webcamData);
            if (!webcamData.isStreaming) {
              webcamData.images.forEach((image) => {
                acc.push(image.url);
              });
            }
            return acc;
          }, [])
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }, [props.parkCode]);

  return (
    <div>
      {images.map((url, idx) => (
        <Card sx={{ maxWidth: 345 }} key={idx}>
          <CardMedia
            component="img"
            height="140"
            // image="https://www.nps.gov/common/uploads/cropped_image/4694C878-9683-31A4-D7A86059852B7750.jpg"
            image={url}
            alt="webcam"
          />
        </Card>
      ))}
    </div>
  );
}

export default Webcams;
