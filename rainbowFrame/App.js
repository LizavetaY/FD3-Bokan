import React from "react";
import ReactDOM from "react-dom";

import { RainbowFrame } from "./components/RainbowFrame/RainbowFrame";

const colorsData = [
  "red",
  "orange",
  "yellow",
  "green",
  "#00BFFF",
  "blue",
  "purple",
];

ReactDOM.render(
  <RainbowFrame colors={colorsData}>Hello!</RainbowFrame>,
  document.getElementById("root")
);
