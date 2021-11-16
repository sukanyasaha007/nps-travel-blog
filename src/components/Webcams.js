import React from "react";

import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";

import Box from "@mui/material/Box";
// import "./App.css";
import { useEffect, useState } from "react";
import initNetworkRequest from "../services/networkService";
// import ParksData from "./ParksData";

import ClickAwayListener from "@mui/material/ClickAwayListener";

import { makeStyles } from "@material-ui/core/styles";
import { CardContent } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  webcamsStyles: {
    position: "absolute",
    top: 28,
    right: 0,
    left: 0,
    zIndex: 1,
    border: "1px solid",
    p: 1,
    bgcolor: "background.paper",
  },
  blogTitle: {
    fontWeight: 80,
    paddingBottom: theme.spacing(3),
    color: "#000",
    // position: "center",
    fontSize: "50px",
  },
}));
function Webcams(props) {
  const [images, setImages] = useState([]);

  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleClickAwaywebcams = () => {
    setOpen(false);
  };
  const handleClickwebcams = () => {
    setOpen((prev) => !prev);
  };

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
            console.log(webcamData.images);
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
      <Card>
        <CardContent>
          <h1 className={classes.blogTitle}>Webcam Data</h1>
          <p>
            Looking for photos, videos, or audio recordings of national parks?
            The multimedia search lets you search by keyword, location, or file
            type (including photos, videos, audio, webcams, and podcasts) and
            filter for high-quality images. You can also visit these other sites
            to find additional multimedia content. For each park we have
            collected some images caputured for visitors in webcams. It involves
            view from the different NPS Visitor Centers. On most days a small
            sliver of the visitor center roof is in the foreground, beyond that
            are the red rock cliffs of Wedding and Monument canyons. On a clear
            day, in the distance, one can see the Grand Mesa (one of the largest
            flat-topped mountains in the United States).
          </p>
          <h3>Click to see some webcam images</h3>
          <ClickAwayListener
            mouseEvent="onMouseDownWebcams"
            touchEvent="onTouchStartWebcams"
            onClickAway={handleClickAwaywebcams}
          >
            <Box sx={{ position: "relative" }}>
              <button type="button" onClick={handleClickwebcams}>
                Click to see webcam images
              </button>
              {open ? (
                <Box sx={classes.webcamsStyles}>
                  <Card sx={{ minWidth: 275 }}>
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
                  </Card>
                </Box>
              ) : null}
            </Box>
          </ClickAwayListener>
        </CardContent>
      </Card>
    </div>
  );
}

export default Webcams;
