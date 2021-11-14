import React from "react";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import ClickAwayListener from "@mui/material/ClickAwayListener";

// import "./App.css";
import { useEffect, useState } from "react";
import initNetworkRequest from "../services/networkService";
import Webcams from "./Webcams";
import ParksData from "./ParksData";

function ParksMenu(props) {
  // for the toggle
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen((prev) => !prev);
  };

  const handleClickAway = () => {
    setOpen(false);
  };

  const styles = {
    position: "absolute",
    top: 28,
    right: 0,
    left: 0,
    zIndex: 1,
    color: "#fff",
    border: "1px solid",
    p: 1,
    bgcolor: "background.paper",
  };
  // console.log(props.activityId);
  const [selectedItemParks, setSelectedItemParks] = useState("__loading");
  const [parks, setParks] = useState([
    {
      parkCode: "__loading",
      fullName: "Loading parks...",
    },
  ]);

  const onChangeHandler = (e) => {
    setSelectedItemParks(e.target.value);
  };

  useEffect(() => {
    initNetworkRequest({
      url: "https://developer.nps.gov/api/v1/activities/parks",
      queryParams: {
        activityId: props.activityId,
      },
    })
      .then((response) => {
        setParks(response.data[0].parks);
        setSelectedItemParks(response.data[0].parks[0].parkCode);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [props.activityId]);

  return (
    <div>
      <ClickAwayListener
        mouseEvent="onMouseDown"
        touchEvent="onTouchStart"
        onClickAway={handleClickAway}
      >
        <Box sx={{ position: "relative" }}>
          <button type="button" onClick={handleClick}>
            Click to see parks
          </button>
          {open ? (
            <Box sx={styles}>
              <Select
                labelId="select-label"
                id="simple-select"
                value={selectedItemParks}
                label="Parks"
                position="center"
                onChange={onChangeHandler}
              >
                {parks.map((park) => (
                  <MenuItem value={park.parkCode} key={park.parkCode}>
                    {park.fullName}
                  </MenuItem>
                ))}
              </Select>
              {selectedItemParks !== "__loading" && (
                <>
                  <ParksData parkCode={selectedItemParks} />
                  <Webcams parkCode={selectedItemParks} />
                </>
              )}
            </Box>
          ) : null}
        </Box>
      </ClickAwayListener>
    </div>
  );
}

export default ParksMenu;
