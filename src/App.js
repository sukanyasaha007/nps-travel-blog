// import Select from "@mui/material/Select";
// import MenuItem from "@mui/material/MenuItem";

// import { Component } from "react";
import "./App.css";
// import { useEffect, useState } from "react";
// import initNetworkRequest from "./services/networkService";
import Intro from "./components/Intro";

import ActivitiesMenu from "./components/MenuActivities";
// import ParksMenu from "./components/MenuParks";

function App() {
  return (
    <div>
      <Intro />
      <ActivitiesMenu />
    </div>
  );
}

export default App;
