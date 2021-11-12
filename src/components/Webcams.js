import React from "react";

import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";

// import "./App.css";
import { useEffect, useState } from "react";
import initNetworkRequest from "../services/networkService";

function Webcams(props) {
    // console.log(props.activityId);
    const [selectedItemUrls, setSelectedItemUrls] = useState("__loading");
    const [urls, setUrls] = useState([
      {
        parkCode: "__loading",
        fullName: "Loading parks...",
      },
    ]);
  
    const onChangeHandler = (e) => {
      // console.log(response.data[0].parks[0].fullName);
      setSelectedItemUrls(e.target.value);
      // console.log("activityID", props.activityId, props);
    };
  
  useEffect(() => {
    initNetworkRequest({
      url: "https://developer.nps.gov/api/v1/webcams",
      queryParams: {
        parkCode: props.parkCode,
      },
      //   activityID: activityID,
    })
      .then((response) => {
        let data = response.data;
        if (data.length > 0) {
          for (let i = 0; i < data.length; i++) {
            if (data[i].images.length > 0 && data[i].isStreaming === false) {
              urls.push(data[i].images.map((a) => a.url));
            }
          }
        }
        console.log(urls[0][0]);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <h1>{urls[0]}</h1>
      {/* {urls.map((url) => ( */}
      <div>
        <h1>{urls[0]}</h1>
        <Card sx={{ maxWidth: 345 }}>
          <h1>{urls[0]}</h1>
          <CardMedia
            component="img"
            height="140"
            image="https://www.nps.gov/common/uploads/cropped_image/4694C878-9683-31A4-D7A86059852B7750.jpg"
            // image={urls[0]}
            alt="webcam"
          />
        </Card>
      </div>
      {/* ))} */}
    </div>
  );
}

export default Webcams;
