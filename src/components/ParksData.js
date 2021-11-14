import React from "react";

import Card from "@mui/material/Card";

// import "./App.css";
import { useEffect, useState } from "react";
import initNetworkRequest from "../services/networkService";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
// import Box from "@mui/material/Box";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Box from "@mui/material/Box";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import CardMedia from "@mui/material/CardMedia";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";

const useStyles = makeStyles((theme) => ({
  appBar: {
    backgroundColor: "#fff",
  },
  blogsContainer: {
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0)), url('https://cdn.pixabay.com/photo/2019/08/06/10/40/fuchs-4388014_1280.jpg')`,
    height: "400px",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    paddingTop: theme.spacing(3),
    position: "relative",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "#fff",
    fontSize: "4rem",
    [theme.breakpoints.down("sm")]: {
      height: 300,
      fontSize: "3em",
    },
  },
  blogTitle: {
    fontWeight: 80,
    paddingBottom: theme.spacing(3),
    color: "#000",
    // position: "center",
    fontSize: "50px",
  },

  parkStyles: {
    position: "absolute",
    top: 28,
    right: 0,
    left: 0,
    zIndex: 1,
    border: "1px solid",
    p: 1,
    bgcolor: "background.paper",
  },
}));

function ParksData(props) {
  const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen((prev) => !prev);
  };

  const handleClickAway = () => {
    setOpen(false);
  };

  const classes = useStyles();
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
      <ClickAwayListener
        mouseEvent="onMouseDown"
        touchEvent="onTouchStart"
        onClickAway={handleClickAway}
      >
        <Box sx={{ position: "relative" }}>
          <button type="button" onClick={handleClick}>
            Click to see park detils
          </button>
          {open ? (
            <Box sx={classes.parkStyles}>
              <Card sx={{ minWidth: 275 }}>
                <CardContent>
                  <CardMedia className={classes.blogsContainer}></CardMedia>
                  <Container maxWidth="lg">
                    <h1 className={classes.blogTitle}>Activities </h1>
                    <Container maxWidth="lg">
                      <Stack
                        direction={{ xs: "column", sm: "row" }}
                        spacing={{ xs: 1, sm: 2, md: 4 }}
                      >
                        {parkData?.activities.map((val) => (
                          <Item key={val}>{val}</Item>
                        ))}
                      </Stack>
                    </Container>
                  </Container>
                </CardContent>
                <CardContent>
                  <Container maxWidth="lg">
                    <h1>Designation</h1>
                    <Typography
                      className="text-center text-lg text-gray-700 font-normal px-4 lg:px-20 mb-8"
                      key="des"
                      sx={{ fontSize: 14 }}
                      color="text.secondary"
                      gutterBottom
                    >
                      {parkData?.designation}
                    </Typography>
                  </Container>
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
                  <Container maxWidth="lg">
                    <Stack
                      direction={{ xs: "column", sm: "row" }}
                      spacing={{ xs: 1, sm: 2, md: 4 }}
                    >
                      {parkData?.topics.map((val) => (
                        <Item key={val}>{val}</Item>
                      ))}
                    </Stack>
                  </Container>
                </CardContent>
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
            </Box>
          ) : null}
        </Box>
      </ClickAwayListener>
    </div>
  );
}

export default ParksData;
