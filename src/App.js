// import Select from "@mui/material/Select";
// import MenuItem from "@mui/material/MenuItem";

// import { Component } from "react";
import "./App.css";
// import { useEffect, useState } from "react";
// import initNetworkRequest from "./services/networkService";

import ActivitiesMenu from "./components/MenuActivities";
// import ParksMenu from "./components/MenuParks";

function App() {
  let act = ActivitiesMenu();
  console.log(act);
  return (
    <div>
      <ActivitiesMenu />
    </div>
  );
}

export default App;
